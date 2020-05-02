const Insight = require('../model/Insight');
const Brazil = require('../model/Brazil');
const State = require('../model/State');


function dynamicSort(property) {
    return function (a, b) {
        return (a[property] < b[property]) ? 1 : (a[property] > b[property]) ? -1 : 0;
    }
}

exports.getAllInsights = (req, res) => {


    const queryDb = Insight.find().sort({ date: -1 });

    queryDb.exec((error, insight) => {

        if (!error && insight !== null) {

            res.json({ content: insight.map(element => element.getInfo()) });


        } else {

            res.status(400).json({ message: "Insight not founded" });;

        }
    });

}

exports.getLastInsights = (req, res) => {


    const queryDb = Insight.findOne().sort({ date: -1 }).limit(1);

    queryDb.exec((error, insight) => {

        if (!error && insight !== null) {
            res.json({ content: insight.getInfo() });

        } else {
            res.status(400).json({ message: "Insight not founded" });;
        }
    });

}

getStatesInsights = async () => {
    const data = await State.find().exec();
    const actualWeek = data.map(state => { return { uf: state.uf, name: state.name, data: Object.values(state.data).reverse().slice(0, 7) } });
    const lastWeek = data.map(state => { return { uf: state.uf, name: state.name, data: Object.values(state.data).reverse().slice(7, 14) } });

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
    let doubleCasesDays = 0;
    const doubleFactor = data[0].newCases / 2;

    data.slice(1, data.length).forEach(element => { if (element.newCases > doubleFactor) doubleCasesDays++; });
    return doubleCasesDays;
}


exports.updateInsights = async () => {

    const brazilDoubleCasesDays = await getBrazilDoubleCaseDays();
    const { greatestCasesIncrease, greatestDeathsIncrease, greatestMortalityVariation, lowestMortalityVariation } = await getStatesInsights();

    let newInsight = new Insight();

    const data = {
        brazilDoubleCasesDays: brazilDoubleCasesDays,
        greatestCasesOcurrenceIncreaseUf: greatestCasesIncrease.uf,
        greatestCasesOcurrenceIncreaseRate: greatestCasesIncrease.casesIncrease,
        greatestDeathOcurrenceIncreaseUf: greatestDeathsIncrease.uf,
        greatestDeathOcurrenceIncreaseRate: greatestDeathsIncrease.deathsIncrease,
        greatestMortalityIncreaseUf: greatestMortalityVariation.uf,
        greatestMortalityIncreaseRate: greatestMortalityVariation.mortalityVariation,
        lowestMortalityIncreaseUf: lowestMortalityVariation.uf,
        lowestMortalityIncreaseRate: lowestMortalityVariation.mortalityVariation,
        date: `${new Date().getDate()}/${new Date().getMonth() + 1}/ ${new Date().getFullYear()}`
    };


    newInsight.createInsight(data);

    newInsight.save(async (error) => {

        if (error) {
            console.log(error, 'Fail to Save Insight')
        }

        else console.log(`Insight saved with sucess ${new Date()}`)


    });

}




