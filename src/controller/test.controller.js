const Test = require('../model/Test');
const Apis = require('../utils/apis');
const ApiTests = Apis.ApiTests;
var html2json = require('html2json').html2json;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.getAllTests = (req, res) => {

    const queryDb = Test.find().sort({ "uf": 1 });

    queryDb.exec((error, test) => {

        if (!error && test !== null) {

            res.json({
                content: test.map(element => element.getInfo())
            });


        } else {

            res.status(400).json({ message: "Fail to get Tests" });;

        }
    });

}

exports.getTestByUf = (req, res) => {

    const uf = req.params.uf;

    const queryDb = Test.findOne({ uf: uf });

    queryDb.exec((error, test) => {

        if (!error && test !== null) {
            res.json(test.getInfo());

        } else {

            res.status(400).json({ message: "Fail to get Tests" });;

        }
    });

}

exports.updateTests = () => {

    ApiTests.get("").then(res => {

        const data = res.data.split(" ").join("").split("<script>")[1].split("</script>")[0].split("varstatesData=")[1].split(";")[0];
        const dataParsed = JSON.parse(data.slice(0, data.length - 5) + data.slice(- 4)).features;


        console.log(`Starting to Update Tests - ${new Date()}`);


        dataParsed.forEach(async(element, index) => {

            const date = new Date();
            const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            const uf = element.properties.name;
            const tests = element.properties.density;
            const latest = { date: dateFormatted, numberOfTests: tests };
            const testData = {};
            testData[dateFormatted] = latest;

            const testUpdated = { uf: uf, latest: latest, data: testData };
            const test = await Test.findOne({ uf: testUpdated.uf });

            if (!test) console.log("State Tests not found - ", testUpdated.uf);

            else {

                try {

                    test.setData(latest);
                    test.markModified("data");

                    await test.save(function (err, testFounded) {
                        if (err) return console.error(err);
                        else console.log(`Tests data from ${test.uf} Updated with sucess \n ${JSON.stringify(testFounded.getInfo())}`)
                    });

                }
                catch (e) {

                    console.log(`Fail to Update Tests State \n`, e);
                }
            }

        });



    }).catch((e) => console.log(`Fail to request Api - Create Tests \n `, e));

}


exports.initTests = () => {

    ApiTests.get("").then(res => {

        const data = res.data.split(" ").join("").split("<script>")[1].split("</script>")[0].split("varstatesData=")[1].split(";")[0];
        const dataParsed = JSON.parse(data.slice(0, data.length - 5) + data.slice(- 4)).features;


        console.log(`Starting to Saving Tests - ${new Date()}`);


        dataParsed.forEach((element, index) => {

            const date = new Date();
            const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            const uf = element.properties.name;
            const tests = element.properties.density;
            const latest = { date: dateFormatted, numberOfTests: tests };
            const testData = {};
            testData[dateFormatted] = latest;

            const test = { uf: uf, latest: latest, data: testData };

            let newTest = new Test();
            newTest.createTest(test);

            newTest.save(function (error) {

                if (error) {
                    console.log(`Fail to create Test`, error)
                }
                else {
                    console.log(`Tests data from ${test.uf} saved with sucess`)
                }
            })

        });


    }).catch((e) => console.log(`Fail to request Api - Create Tests \n `, e));

}














