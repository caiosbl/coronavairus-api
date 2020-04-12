const Axios = require('axios')

exports.ApiNews = Axios.create({
    baseURL: `http://newsapi.org/v2/top-headlines`
});

exports.ApiBrazil = Axios.create({
    baseURL: 'https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalMapa',
    headers: { 'x-parse-application-id': process.env.API_BRAZIL_KEY },
    timeout: 1000
});

exports.ApiBrazilCSV = Axios.create({
    baseURL: '"https://mobileapps.saude.gov.br/esus-vepi/files/unAFkcaNDeXajurGB7LChj8SgQYS2ptm/4101ebf78c503bf35ecba5545d236c76_Download_COVID19_20200410.csv"',
});

