const Country = require('../model/Country');
const Apis = require('../utils/apis');
const ApiWorld = Apis.ApiWorld;
const ApiCoronaLive = Apis.ApiCoronaLive;
const Utils = require('../utils/utils');



exports.update = async () => {

    const req = await ApiWorld.get("/summary");


    req.data.Countries.forEach(element => {

    const data = {
        name: element.Country,
        isoA2: element.CountryCode,
        totalCases: element.TotalConfirmed,
        newCases: element.NewConfirmed,
        activeCases: element.TotalConfirmed - (element.TotalDeaths + element.TotalRecovered),
        totalDeaths: element.TotalDeaths,
        newDeaths: element.NewDeaths,
        totalRecovered: element.TotalRecovered,
        lastFetch: req.data.Date
    };


    let newCountryData = new Country();
    newCountryData.createCountryData(data);

    newCountryData.save(async (error) => {

        if (error) {

            const actualData = Country.findOne({ name: data.name });

            actualData.exec(async (error, dataFounded) => {


                if (!dataFounded) console.log("Date not Found - ", data.date);
                else {

                    try {

                        dataFounded.updateCountryData(data);

                        await dataFounded.save(function (err, status) {
                            if (err) return console.error(err, 'erro');
                        });

                        return console.log(`${data.name} Data updated with sucess`);
                    }
                    catch (e) {
                        console.log(`Fail to update ${data.name} Data`, e);
                    }
                }

            })

        }

        else {
            console.log(`${data.name} data saved`)
        }
    })
    
}) 

}


exports.updateExisting = async () => {

    const req = await ApiCoronaLive.get("/cases_by_country.php");


    req.data.countries_stat.forEach(element => {

    const data = {
        name: element.country_name === 'USA' ? 'United States of America' : element.country_name,
        totalCases: element.cases,
        newCases: element.new_cases,
        totalDeaths: element.deaths,
        newDeaths: element.new_deaths,
        totalRecovered: element.total_recovered,
        seriousCritical: element.serious_critical,
        lastFetch: req.data.statistic_taken_at
    };


            const actualData = Country.findOne({ name: data.name });

            actualData.exec(async (error, dataFounded) => {


                if (!dataFounded) console.log("Date not Found - ", data.date);
                else {

                    try {

                        dataFounded.updateCountry(data);

                        await dataFounded.save(function (err, status) {
                            if (err) return console.error(err, 'erro');
                        });

                        return console.log(`${data.name} Data updated with sucess`);
                    }
                    catch (e) {
                        console.log(`Fail to update ${data.name} Data`, e);
                    }
                }

            })

        }

       
    )
    
 

}



exports.getAll = (req, res) => {

    const queryBd = Country.find().sort({ date: 1 });

    queryBd.exec((error, countries) => {

        if (!error && countries !== null) {

            res.json({
                content: countries.map(element => element.getInfo())
            });


        } else {

            res.status(400).json({ message: "Fail to get Countries data" });;

        }
    });

}





