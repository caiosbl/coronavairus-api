const State = require('../model/State');
const Apis = require('../utils/apis');
const ApiBrazil = Apis.ApiBrazil;
const ApiBrazilCSV = Apis.ApiBrazilCSV;
const ufMap = require('../utils/states.uf.map');
const HandlerTwitter = require('../utils/twitter').postMessage;
const BotRecord = require('../model/BotRecord');
const csv = require('csvtojson');
const ufMapName = require('../utils/states.name.map');

const processMessages = async (data) => {
    const lastBotRecord = await BotRecord.findOne();
    const canRegisterToday = new Date(lastBotRecord.statesRecord).getDate() !== new Date().getDate();
    const lastState = await State.findOne().sort({ "latest.date": -1 });
    const isStateUpdated = Number(lastState.latest.date.split("/")[0]) === new Date().getDate();
    const canTweet = canRegisterToday && isStateUpdated;


    if (canTweet) {
        data.forEach(async (element) => {

            const yesterdayData = await State.findOne({ name: element.nome });

            const today = element;

            const yesterday = Object.values(yesterdayData.data).slice(-2)[0];
            const cases = today.qtd_confirmado;
            const deaths = today.qtd_obito;
            const newCases = today.qtd_confirmado - yesterday.cases;
            const newDeaths = today.qtd_obito - yesterday.deaths;
            const baseMsg = `${element.nome} teve ${newCases} novos casos e ${newDeaths} mortes por Covid-19 confirmados hoje, no total o estado acumula ${cases} casos e ${deaths} mortes`

            HandlerTwitter(baseMsg);

        });

        const newBotRecord = new BotRecord();
        newBotRecord.createBotRecord({ statesRecord: new Date() });
        newBotRecord.save(async (error) => console.log(error));
    }

}



exports.updateStates = async () => {

    ApiBrazil.get("PortalMapa").then(res => {

        console.log(`Starting to Update States - ${new Date()}`);

        processMessages(res.data.results);

        res.data.results.forEach(async (element, index) => {

            const date = new Date(element.updatedAt);
            const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

            const data = { date: dateFormatted, cases: element.qtd_confirmado, deaths: element.qtd_obito, suspects: 0, refuses: 0 }

            const state = await State.findOne({ uf: ufMap[element.objectId] });

            if (!state) console.log("State not found - ", ufMap[element.objectId]);

            else {

                try {

                    state.updateData(data);
                    state.markModified("data");

                    await state.save(function (err, state) {
                        if (err) return console.error(err);
                        else console.log(`State ${state.uf} Updated with sucess`)
                    });

                }
                catch (e) {

                    console.log(`Fail to Update State \n`, e);
                }
            }

        });

    }).catch((e) => console.log(`Fail to Request to Brazil Api - Update States \n`, e));

}



exports.getTimeseries = (req, res) => {

    const queryDb = State.find().sort({ "data.date": -1 });

    queryDb.exec((error, state) => {

        if (!error && state !== null) {

            res.json(state.map(element => element.getTimeseries()));


        } else {

            res.status(400).json({ message: "Fail to get states" });;

        }
    });

}

exports.getTimeseriesByUf = (req, res) => {

    const uf = req.params.uf;

    const queryDb = State.findOne({uf: uf.toUpperCase()});

    queryDb.exec((error, state) => {

        if (!error && state !== null) {

            res.json(state.getTimeseries());


        } else {

            res.status(400).json({ message: "Fail to get states" });;

        }
    });

}



exports.getLastData = (req, res) => {

    const queryDb = State.find();

    queryDb.exec((error, state) => {

        if (!error && state !== null) {

            res.json(state.map(element => element.getLastData()));


        } else {

            res.status(400).json({ message: "Fail to get states" });;

        }
    });

}

exports.getLastDataByUf = (req, res) => {

    const uf = req.params.uf;

    const queryDb = State.findOne({ uf: uf.toUpperCase() });

    queryDb.exec((error, state) => {

        if (!error && state !== null) {
            res.json(state.getLastData());

        } else {

            res.status(400).json({ message: "Fail to get state" });;

        }
    });

}



exports.init = () => {

    ApiBrazil.get("PortalMapa").then(res => {

        console.log(`Starting to Saving States - ${new Date()}`)

        res.data.results.forEach((element, index) => {

            const date = new Date(element.updatedAt);
            const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

            const data = { date: dateFormatted, cases: element.qtd_confirmado, deaths: element.qtd_obito, suspects: 0, refuses: 0 }

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



exports.populateFromCsv = async () => {

    const brazilData = await ApiBrazilCSV.get("");
    let data = []
    await csv({ delimiter: ";" }).fromString(brazilData.data).subscribe((csvLine) => data.push(csvLine));
    const dataNormalized = data.map(element => {
        const date = new Date(element.data);
        const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

        return {
            date: dateFormatted,
            uf: element.estado,
            name: ufMapName[element.estado],
            newCases: Number(element.casosNovos),
            newDeaths: Number(element.obitosNovos),
            cases: Number(element.casosAcumulados),
            deaths: Number(element.obitosAcumulados),
            suspects: 0,
            refuses: 0
        }
    });

    let states = await State.find();

    dataNormalized.forEach(async (element) => {
        const stateData = {};
        stateData[element.date] = element;

        const stateFounded = states.filter(e => e.uf === element.uf)[0];

        if (!stateFounded) {
            console.log('error')
        }

        else {
            try {
                stateFounded.data[element.date] = {date: element.date, newCases: element.newCases, newDeaths: element.newDeaths, cases: element.cases, deaths: element.deaths};
            }
            catch (e) {
                console.log(e);
            }

        }
    });

    states.forEach(stateBd => {

        stateBd.markModified("data");

        stateBd.save(function (err, state) {
            if (err) return console.error(err);
            else console.log(`State ${stateBd.uf} Updated with sucess`)
        });
    });


}