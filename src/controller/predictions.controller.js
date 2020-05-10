const Prediction = require('../model/Prediction');
const Apis = require('../utils/apis');
const ApiPredictions = Apis.ApiPredictions;



exports.update = async () => {

    const req = await ApiPredictions.get("");



    try {
        const reqInfo = req.data.data;

        reqInfo.forEach(reqData=> {
            const data = {
       
                date: reqData.date,
                casesLowPrediction: reqData.cases.lower_prediction,
                casesMeanPrediction: reqData.cases.mean_prediction,
                casesHighPrediction: reqData.cases.high_prediction,
                deathsLowPrediction: reqData.deaths.lower_prediction,
                deathsMeanPrediction: reqData.deaths.mean_prediction,
                deathsHighPrediction: reqData.deaths.high_prediction,
    
            };
    
            let newPrediction = new Prediction();
    
           
           newPrediction.createPrediction(data);
    
            newPrediction.save(async (error) => {
    
                if (error) {
    
                    const actualData = Prediction.findOne({"date": data.date});
    
                    actualData.exec(async (error, dataFounded) => {
    
    
                        if (!dataFounded) console.log("Date not Found - ", data.date);
                        else {
    
                            try {
    
                                dataFounded.updatePrediction(data);
    
                                await dataFounded.save(function (err, status) {
                                    if (err) return console.error(err, 'erro');
                                });
    
                                return console.log("Prediction Data updated with sucess");
                            }
                            catch (e) {
                                console.log("Fail to update Prediction", e);
                            }
                        }
    
                    })
    
                }
    
                else {
                    console.log("Prediction data saved")
                }
            })
    
            
        });
    
        


    }
    catch (e) {
        console.log(e);
    }

}


exports.getAll = (req, res) => {

    const queryDb = Prediction.find();

    queryDb.exec(function (error, predictions) {

        if (!error && predictions !== null) {

            res.json(predictions.map(prediction => prediction.getInfo()));


        } else {

            res.status(400).json({ message: "Fail to get Prediction data" });;

        }
    });

}


exports.getLastData = (req, res) => {

    const queryDb = Prediction.find().sort({ date: -1 }).limit(7);

    queryDb.exec(function (error, predictions) {

        if (!error && predictions !== null) {

            res.json(predictions.reverse().map(prediction => prediction.getInfo()));


        } else {

            res.status(400).json({ message: "Fail to get Prediction data" });;

        }
    });

}



