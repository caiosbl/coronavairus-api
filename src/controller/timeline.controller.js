const Timeline = require('../model/Timeline');
const Brazil = require('../model/Brazil');
const HandlerTwitter = require('../utils/twitter').postMessage;


const processMessages = (total, record, type) => {

    const baseMsg = `O Brasil superou ${record.toLocaleString()} ${type} hoje, no total o país acumula ${type}.`
    HandlerTwitter(baseMsg);
}

exports.getTimeline = (req, res) => {

    const queryDb = Timeline.find().sort({ date: 1 });

    queryDb.exec((error, timeline) => {

        if (!error && timeline !== null) {

            res.json(timeline.map(element => element.getInfo()));


        } else {

            res.status(400).json({ message: "Timeline not founded" });;

        }
    });

}


exports.update = async () => {

    let keys = [1, 1000, 10000, 50000, 100000];
    const data = await Brazil.find().sort({ date: 1 }).exec();

    // init keys
    for (let i = 0; i < 28; i++) {
        keys.push(keys.slice(-1)[0] + 50000)
    };

    let iCases = 0;
    let iDeaths = 0;
    let iRecovered = 0;

    data.forEach(element => {

        if (element.totalCases >= keys[iCases] || element.totalDeaths >= keys[iDeaths] || element.totalRecovered >= keys[iRecovered]) {
            let newTimelineItem = new Timeline();
            const data = { date: element.date, };


            if (element.totalCases >= keys[iCases]) {
                data['numberOfCases'] = keys[iCases];
                iCases++;
                
            }
            if (element.totalDeaths >= keys[iDeaths]) {
                data['numberOfDeaths'] = keys[iDeaths];
                iDeaths++;
               
            }
            if (element.totalRecovered >= keys[iRecovered]) {
                data['numberOfRecovered'] = keys[iRecovered];
                iRecovered++;
               
            }


            newTimelineItem.create(data);
            newTimelineItem.save(async (error) => {

                if (error) {
                    console.log(error, 'Fail to Save Timeline Item')
                }

                else {
                    if (element.totalCases >= keys[iCases]) {
                      
                        processMessages(element.totalCases, keys[iCases], 'casos');
                    }
                    if (element.totalDeaths >= keys[iDeaths]) {
                       
                        processMessages(element.totalDeaths, keys[iDeaths], 'mortes');
                    }
                    if (element.totalRecovered >= keys[iRecovered]) {
                       
                        processMessages(element.totalRecovered, keys[iRecovered], 'curados')
                    }

                    console.log(`Timeline item saved with sucess ${new Date()}`);
                }

            });


        };
    });


}