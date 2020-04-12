const State = require('../model/State');
const Apis = require('../utils/apis');
const ApiBrazil = Apis.ApiBrazil;
const ApiBrazilCSV = Apis.ApiBrazilCSV;
const ufMap = require('../utils/states.uf.map');
const queryString = require('query-string');


exports.getAllStates = (req, res) => {

    State.find(function (error, state) {

        if (!error && state !== null) {

            res.json({
                content: state.sort((a, b) => {
                    if (b.data.date > a.data.date) return 1;
                    return -1;
                })
                    .map(element => element.getInfo())
            });


        } else {

            res.status(400).json({ message: "Fail to get states" });;

        }
    });

}


exports.initStates = () => {

    ApiBrazil.get("").then(res => {

        console.log(`Starting to Saving States - ${new Date()}`)

        res.data.data.forEach((element, index) => {


            const date = new Date(element.updatedAt);
            const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

            const data = { date: dateFormatted, cases: element.qtd_confirmado, deaths: element.qtd_obito, suspects: 0, refuses: 0 };


            const stateData = {}
            stateData[dateFormatted] = data
            const state = { name: element.nome, uf: ufMap[element.objectId], latest: data, data: stateData };

            let newState = new State();
            newState.createState(state);

            newState.save(function (error) {

                if (error) {
                    console.log(`Fail to create State - ${element.nome}`, error)

                }
            })

        });


    }).catch((e) => console.log(`Fail to request Brazil Api - Create States \n `, e));

}


exports.updateStates = async () => {

    ApiBrazil.get().then(res => {

        console.log(`Starting to Update States - ${new Date()}`)

        res.data.results.forEach(async (element, index) => {

            const date = new Date(element.updatedAt);
            const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

            const data = { date: dateFormatted, cases: element.qtd_confirmado, deaths: element.qtd_obito, suspects: 0, refuses: 0 }

            const state = await State.findOne({ uf: ufMap[element.objectId] });

            if (!state) console.log("State not found - ", ufMap[element.objectId]);

            else {

                try {

                    state.setData(data);
                    state.markModified("data");

                    await state.save(function (err, state) {
                        if (err) return console.error(err);
                        else console.log(`State Updated with sucess \n ${JSON.stringify(state.getInfo())}`)
                    });

                }
                catch (e) {

                    console.log(`Fail to Update State \n`, e);
                }
            }

        });

    }).catch((e) => console.log(`Fail to Request to Brazil Api - Update States \n`, e));

}



exports.updateStatesFromCSV = () => {


    ApiBrazilCSV.get("").then((res) => {

        console.log(`Starting to Update States - ${new Date()}`);

        const data = {}
        let processed = res.data.split("\r\n").map(data => data.split(";"));
        processed = processed.slice(1, processed.length).filter(d => d[1]);


        processed.forEach(v => {

            if (v) {
                data[v[1]] = { ...data[v[1]], cases: Number(v[4]) };
                data[v[1]] = { ...data[v[1]], deaths: Number(v[6]) };
                data[v[1]] = { ...data[v[1]], suspects: 0 };
                data[v[1]] = { ...data[v[1]], refuses: 0 };
                data[v[1]] = { ...data[v[1]], date: v[2] };
            }
        })


        Object.keys(data).map(k => { { return { ...data[k], name: estados[k], uf: k } } }).sort((a, b) => b.cases - a.cases).forEach(async (element, index) => {

            const stateData = {
                date: element.date, cases: element.cases, deaths: element.deaths,
                suspects: element.suspects, refuses: element.refuses
            }


            const state = await State.findOne({ uf: element.uf });

            if (!state) console.log("State not Found - ", element.uf);

            else {
                try {

                    state.setData(stateData);
                    state.markModified("data");
                    await state.save(function (err, state) {
                        if (err) return console.error(err);
                        else console.log(state)

                    });

                    return console.log("State updated with sucess", e);
                }
                catch (e) {
                    console.log("Fail to update sucess", e);
                }
            }

        });



    }).catch(e => console.log(e))

}







