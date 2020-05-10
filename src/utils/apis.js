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
    baseURL: 'https://mobileapps.saude.gov.br/esus-vepi/files/unAFkcaNDeXajurGB7LChj8SgQYS2ptm/f91634e03ef44755fab79ccd5bb049d1_Download_COVID19_20200508.csv',
    //https://mobileapps.saude.gov.br/esus-vepi/files/unAFkcaNDeXajurGB7LChj8SgQYS2ptm/f91634e03ef44755fab79ccd5bb049d1_Download_COVID19_20200508.csv
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

exports.ApiWorldApify = Axios.create({
    baseURL: 'https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true'
})


exports.ApiBrazilByDay = Axios.create({
    baseURL: 'https://api.covid19api.com/live/country/brazil'
})

exports.ApiPredictions = Axios.create({
    baseURL: 'https://covid-brazil-predictions.herokuapp.com/'
})

exports.ApiTests = Axios.create({
    baseURL: 'https://covid-insumos.saude.gov.br/paineis/insumos/mapas/teste.php'
})

