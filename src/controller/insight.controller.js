const Insight = require('../model/Insight');
const Brazil = require('../model/Brazil');
const State = require('../model/State');
const HandlerTwitter = require('../utils/twitter').postMessage;
const ufMap = require('../utils/states.name.map');
const Utils = require('../utils/utils');
const sortByDate = Utils.sortByDate;




function dynamicSort(property) {
    return function (a, b) {
        return (a[property] < b[property]) ? 1 : (a[property] > b[property]) ? -1 : 0;
    }
}

const processMessages = (data) => {

    const {
        brazilDoubleCasesDays,
        greatestCasesOcurrenceIncreaseUf,
        greatestCasesOcurrenceIncreaseRate,
        greatestDeathOcurrenceIncreaseUf,
        greatestDeathOcurrenceIncreaseRate,
        greatestMortalityIncreaseUf,
        greatestMortalityIncreaseRate,
        lowestMortalityIncreaseUf,
        lowestMortalityIncreaseRate,
    } = data;

    const baseMsg = (state, rate, metric, increase) => `${state} teve ${increase ? 'um aumento' : 'uma queda'} de ${rate.toFixed(2)}% na ${metric} de Covid-19 nos últimos 7 dias, ${increase ? 'o' : 'a'} maior do Brasil no período.`

    const doubleCasesMsg = (days) => `O número de casos confirmados no Brasil está dobrando em ${days} dias.`

    HandlerTwitter(doubleCasesMsg(brazilDoubleCasesDays));
    HandlerTwitter(baseMsg(ufMap[greatestCasesOcurrenceIncreaseUf], greatestCasesOcurrenceIncreaseRate, 'ocorrência de casos', true));
    HandlerTwitter(baseMsg(ufMap[greatestDeathOcurrenceIncreaseUf], greatestDeathOcurrenceIncreaseRate, 'ocorrência de mortes', true));
    HandlerTwitter(baseMsg(ufMap[greatestMortalityIncreaseUf], greatestMortalityIncreaseRate, 'taxa de mortalidade', true));
    HandlerTwitter(baseMsg(ufMap[lowestMortalityIncreaseUf], Math.abs(lowestMortalityIncreaseRate), 'taxa de mortalidade', false));
}


exports.getAll = (req, res) => {
    const queryDb = Insight.find().sort({ date: -1 });
    queryDb.exec((error, insight) => {
        if (!error && insight !== null) {
            res.json(insight.map(element => element.getInfo()) );
        } 
        else {
            res.status(400).json({ message: "Insight not found" });;
        }
    });
}

exports.getLast = (req, res) => {
    const queryDb = Insight.findOne().sort({ date: -1 }).limit(1);
    queryDb.exec((error, insight) => {
        if (!error && insight !== null) {
            res.json(insight.getInfo());
        } 
        else {
            res.status(400).json({ message: "Insight not found" });;
        }
    });
}

getStatesInsights = async () => {
    const data = await State.find().exec();
    const actualWeek = data.map(state => { return { uf: state.uf, name: state.name, data: Object.values(state.data).sort(sortByDate('date',true)).slice(0, 7) } });
    const lastWeek = data.map(state => { return { uf: state.uf, name: state.name, data: Object.values(state.data).sort(sortByDate('date',true)).slice(7, 14) } });

    const actualWeekSum = actualWeek.map(element => {
        const casesSum = element.data[0].cases - element.data[6].cases;
        const deathsSum = element.data[0].deaths - element.data[6].deaths;
        const mortalityRate = (deathsSum / casesSum) * 100;

        return { name: element.name, uf: element.uf, cases: casesSum, deaths: deathsSum, mortalityRate: mortalityRate }
    });

    const lastWeekSum = lastWeek.map(element => {
        const casesSum = element.data[0].cases - element.data[6].cases;
        const deathsSum = element.data[0].deaths - element.data[6].deaths;
        const mortalityRate = (deathsSum / casesSum) * 100;

        return { name: element.name, uf: element.uf, cases: casesSum, deaths: deathsSum, mortalityRate: mortalityRate }
    });



    const weeksComparate = actualWeekSum.map((element, i) => {
        const casesIncrease = ((element.cases - lastWeekSum[i].cases) / lastWeekSum[i].cases) * 100;
        const deathsIncrease = ((element.deaths - lastWeekSum[i].deaths) / (lastWeekSum[i].deaths > 0 ? lastWeekSum[i].deaths : 1)) * 100;
        const mortalityVariation = element.mortalityRate - lastWeekSum[i].mortalityRate;



        return { name: element.name, uf: element.uf, casesIncrease: casesIncrease, deathsIncrease: deathsIncrease, mortalityVariation: mortalityVariation };
    });



    const greatestCasesIncreaseValue = Math.max(...weeksComparate.map(state => state.casesIncrease));
    const greatestCasesIncrease = weeksComparate.filter(state => state.casesIncrease === greatestCasesIncreaseValue)[0];
    const greatestDeathsIncreaseValue = Math.max(...weeksComparate.map(state => state.deathsIncrease));
    const greatestDeathsIncrease = weeksComparate.filter(state => state.deathsIncrease === greatestDeathsIncreaseValue)[0];
    const weekComparatedByMortaly = weeksComparate.sort(dynamicSort('mortalityVariation'));



    return {
        greatestCasesIncrease: greatestCasesIncrease,
        greatestDeathsIncrease: greatestDeathsIncrease,
        greatestMortalityVariation: weekComparatedByMortaly[0],
        lowestMortalityVariation: weekComparatedByMortaly[weekComparatedByMortaly.length - 1]
    };


}

getBrazilDoubleCaseDays = async () => {
    const data = await Brazil.find().sort({ date: -1 }).exec();
    const totalCases = data[0].totalCases;
    let doubleCasesDays = 0;
    const doubleFactor = totalCases / 2;

    data.slice(0, data.length).forEach(element => { if (element.totalCases > doubleFactor) doubleCasesDays++; });
    return { doubleCasesDays, lastFetch: data[0].date };
}

exports.update = async () => {
    const { doubleCasesDays, lastFetch } = await getBrazilDoubleCaseDays();
    const { greatestCasesIncrease, greatestDeathsIncrease, greatestMortalityVariation, lowestMortalityVariation } = await getStatesInsights();

    let newInsight = new Insight();

    const data = {
        brazilDoubleCasesDays: doubleCasesDays,
        greatestCasesOcurrenceIncreaseUf: greatestCasesIncrease.uf,
        greatestCasesOcurrenceIncreaseRate: greatestCasesIncrease.casesIncrease,
        greatestDeathOcurrenceIncreaseUf: greatestDeathsIncrease.uf,
        greatestDeathOcurrenceIncreaseRate: greatestDeathsIncrease.deathsIncrease,
        greatestMortalityIncreaseUf: greatestMortalityVariation.uf,
        greatestMortalityIncreaseRate: greatestMortalityVariation.mortalityVariation,
        lowestMortalityIncreaseUf: lowestMortalityVariation.uf,
        lowestMortalityIncreaseRate: lowestMortalityVariation.mortalityVariation,
        date: `${new Date(lastFetch).getDate()}/${new Date().getMonth(lastFetch) + 1}/${new Date().getFullYear(lastFetch)}`
    };


    newInsight.createInsight(data);

    newInsight.save(async (error) => {

        if (error) {
            console.log(error, 'Fail to Save Insight');
        }

        else {
            console.log(`Insight saved with sucess ${new Date()}`);
            processMessages(data);
        }

    });

}




