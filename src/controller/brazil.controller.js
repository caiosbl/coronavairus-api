const Brazil = require('../model/Brazil');
const Apis = require('../utils/apis');
const ApiBrazil = Apis.ApiBrazil;
const ApiBrazilByDay = Apis.ApiBrazilByDay;
const ApiCoronaLive = Apis.ApiCoronaLive;
const Utils = require('../utils/utils');
const ToNumber = Utils.toNumber;
const { parse } = require('json2csv');

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

            actualData.exec(async (error, dataFounded) => {


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



exports.updateLive = async () => {

    const req = await ApiCoronaLive.get("/cases_by_country.php");

    const reqBrazil = await ApiBrazil.get("PortalAcumulo");


    try {
        const reqData = req.data.countries_stat.filter(country => country.country_name === 'Brazil')[0];
        const reqTime = req.data.statistic_taken_at;
        const reqDataMinSaude = reqBrazil.data.results;




        const data = {
            totalCases: reqDataMinSaude.slice(-1)[0]['qtd_confirmado'],
            newCases: reqDataMinSaude.slice(-1)[0]['qtd_confirmado'] - reqDataMinSaude.slice(-2)[0]['qtd_confirmado'],
            activeCases: ToNumber(reqData.active_cases),
            totalDeaths: reqDataMinSaude.slice(-1)[0]['qtd_obito'],
            newDeaths:reqDataMinSaude.slice(-1)[0]['qtd_obito'] - reqDataMinSaude.slice(-2)[0]['qtd_obito'],
            totalRecovered: ToNumber(reqData.total_recovered),
            seriousCritical: ToNumber(reqData.serious_critical),
            date: `${reqTime.slice(0, 10)}T00:00:00.000+00:00`
        };

        let newBrazilData = new Brazil();

       
        newBrazilData.createBrazilData(data);

        newBrazilData.save(async (error) => {

            if (error) {

                const actualData = Brazil.findOne().sort({ date: -1 }).limit(1);

                actualData.exec(async (error, dataFounded) => {


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
    catch (e) {
        console.log(e);
    }







}

exports.getTimeSeries = (req, res) => {

    const queryBd = Brazil.find().sort({ date: 1 });

    queryBd.exec((error, brazil) => {

        if (!error && brazil !== null) {

            res.json({
                content: brazil.slice(0, brazil.length - 1).map(element => element.getInfo())
            });


        } else {

            res.status(400).json({ message: "Fail to get Brazil Timeseries" });;

        }
    });

}

exports.getTimeSeriesCSV = (req, res) => {

    const fields = ["totalCases", "newCases", "activeCases", "totalDeaths", "newDeaths", "totalRecovered", "seriousCritical", "date"];
    const opts = { fields };

    const queryBd = Brazil.find().sort({ date: 1 });

    queryBd.exec((error, brazil) => {

        if (!error && brazil !== null) {

            const data = brazil.slice(0,brazil.length).map(element => element.getInfo());

            const csv = parse(data, opts);
            res.attachment('brazil-covid-timeseries.csv');
            res.status(200).send(csv);
      

        } else {

            res.status(400).json({ message: "Fail to get Brazil Timeseries" });;

        }
    });

}



exports.getLastData = (req, res) => {

    const queryDb = Brazil.findOne().sort({ date: -1 });

    queryDb.exec(function (error, brazil) {

        if (!error && brazil !== null) {

            res.json({ content: brazil.getInfo() });


        } else {

            res.status(400).json({ message: "Fail to get Brazil data" });;

        }
    });

}



