const Axios = require('axios')

exports.ApiNews = Axios.create({
    baseURL: `http://newsapi.org/v2/top-headlines`
});

exports.ApiBrazil = Axios.create({
    baseURL: 'https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/',
    headers: { 'x-parse-application-id': process.env.API_BRAZIL_KEY },
    timeout: 1000
});

exports.ApiBrazilCSV = Axios.create({
    baseURL: '"https://mobileapps.saude.gov.br/esus-vepi/files/unAFkcaNDeXajurGB7LChj8SgQYS2ptm/4101ebf78c503bf35ecba5545d236c76_Download_COVID19_20200410.csv"',
});

exports.ApiCoronaLive = Axios.create({
    baseURL: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/',
    headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_KEY
    }
})

exports.ApiWorld = Axios.create({
    baseURL: 'https://api.covid19api.com'
})


exports.ApiBrazilByDay = Axios.create({
    baseURL: 'https://api.covid19api.com/live/country/brazil'
})

exports.ApiPredictions = Axios.create({
    baseURL: 'https://covid-brazil-predictions.herokuapp.com/'
})
