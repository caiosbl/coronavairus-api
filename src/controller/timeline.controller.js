const Timeline = require('../model/Timeline');
const Brazil = require('../model/Brazil');

exports.getTimeline = (req, res) => {


    const queryDb = Timeline.find().sort({ date: 1 });

    queryDb.exec((error, timeline) => {

        if (!error && timeline !== null) {

            res.json({ content: timeline.map(element => element.getInfo()) });


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

    let i = 0;

    data.forEach(element => {

        if (element.totalCases >= keys[i]) {
            let newTimelineItem = new Timeline();
            const data = { date: element.date, numberOfCases: keys[i] };

            newTimelineItem.create(data);
            newTimelineItem.save(async (error) => {
        
                if (error) {
                    console.log(error, 'Fail to Save Timeline Item')
                }
        
                else {
                    console.log(`Timeline item saved with sucess ${new Date()}`);
                }

            });   
            
            i++;
        };
    });


}