const World = require('../model/World');
const Apis = require('../utils/apis');
const ApiCoronaLive = Apis.ApiCoronaLive;
const Utils = require('../utils/utils');
const ToNumber = Utils.toNumber;

const queryString = require('query-string');




exports.updateLive = async () => {

    const req = await ApiCoronaLive.get("/worldstat.php");


    try {
        const reqData = req.data;

        
        const data = {
            totalCases: ToNumber(reqData.total_cases),
            newCases: ToNumber(reqData.new_cases),
            activeCases: ToNumber(reqData.active_cases),
            totalDeaths: ToNumber(reqData.total_deaths),
            newDeaths: ToNumber(reqData.new_deaths),
            totalRecovered: ToNumber(reqData.total_recovered),
            seriousCritical: ToNumber(reqData.serious_critical),
            date: `${reqData.statistic_taken_at.slice(0, 10)}T00:00:00.000+00:00`
        };

   

        let newWorldData = new World();
        newWorldData.createWorldData(data);

        newWorldData.save(async (error) => {

            if (error) {

                const actualData = World.findOne().sort({ date: -1 }).limit(1);

                actualData.exec(async (error, dataFounded) => {


                    if (!dataFounded) console.log("Date not Found - ", data.date);
                    else {

                        try {

                            dataFounded.updateWorldData(data);

                            await dataFounded.save(function (err, status) {
                                if (err) return console.error(err, 'erro');
                            });

                            return console.log("World Data updated with sucess");
                        }
                        catch (e) {
                            console.log("Fail to update World Data", e);
                        }
                    }

                })

            }

            else {
                console.log("World data saved")
            }
        })



    }
    catch (e) {
        console.log(e);
    }







}

exports.getTimeSeries = (req, res) => {

    const queryBd = World.find().sort({ date: 1 });

    queryBd.exec((error, world) => {

        if (!error && world !== null) {

            res.json({
                content: world.map(element => element.getInfo())
            });


        } else {

            res.status(400).json({ message: "Fail to get World Timeseries" });;

        }
    });

}



exports.getLastData = (req, res) => {

    const queryDb = World.findOne().sort({ date: -1 });

    queryDb.exec(function (error, world) {

        if (!error && world !== null) {

            res.json({ content: world.getInfo() });


        } else {

            res.status(400).json({ message: "Fail to get World data" });;

        }
    });

}



