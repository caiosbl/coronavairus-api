const Brazil = require('../model/Brazil');
const Apis = require('../utils/apis');
const ApiBrazilByDay = Apis.ApiBrazilByDay;

const queryString = require('query-string');



exports.update = async () => {

    const req = await ApiBrazilByDay.get("");

    let casesYesterday = req.data.slice(-2)[0].Confirmed;
    let deathsYesterday = req.data.slice(-2)[0].Deaths;

    const element = req.data.slice(-1)[0];

    const active = element.Confirmed - (element.Recovered + element.Deaths);
    const newCases = element.Confirmed - casesYesterday;
    const newDeaths = element.Deaths - deathsYesterday;


    const data = {
        totalCases: element.Confirmed,
        newCases: newCases,
        activeCases: active,
        totalDeaths: element.Deaths,
        newDeaths: newDeaths,
        totalRecovered: element.Recovered,
        date: element.Date
    };

    let newBrazilData = new Brazil();
    newBrazilData.createBrazilData(data);

    newBrazilData.save(async (error) => {

        if (error) {

            const actualData = Brazil.findOne().sort({ date: -1 }).limit(1);

            actualData.exec(async(error, dataFounded) => {


                if (!dataFounded) console.log("Date not Found - ", data.date);
                else {

                    try {

                        dataFounded.updateBrazilData(data);

                        await dataFounded.save(function (err, status) {
                            if (err) return console.error(err, 'erro');
                        });

                        return console.log("Brazil Data updated with sucess");
                    }
                    catch (e) {
                        console.log("Fail to update Brazil Data", e);
                    }
                }


            })

        }

        else {
            console.log("Brazil data saved")
        }
    })





}

exports.getTimeSeries = (req, res) => {

    const queryBd = Brazil.find().sort({ date: 1 });

    queryBd.exec((error, brazil) => {

        if (!error && brazil !== null) {

            res.json({
                content: brazil.map(element => element.getInfo())
            });


        } else {

            res.status(400).json({ message: "Fail to get Brazil Timeseries" });;

        }
    });

}



exports.getLastData = (req, res) => {

    const queryDb = Brazil.find().limit(1);

    queryDb.exec(function (error, brazil) {

        if (!error && brazil !== null) {

            res.json({ content: brazil.map(element => element.getInfo()) });


        } else {

            res.status(400).json({ message: "Fail to get Brazil data" });;

        }
    });

}



