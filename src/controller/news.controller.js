const News = require('../model/News');
const queryString = require('query-string');
const Api = require('../utils/apis');
const ApiNews = Api.ApiNews;


const newsSort = (a, b) => {
    if (b > a) return 1;
    return -1;
}

exports.getAllNews = (req, res) => {


    News.find(function (error, news) {

        if (!error && news !== null) {

            res.json({ content: news.sort(newsSort).map(element => element.getInfo()) });


        } else {

            res.status(400).json({ message: "News not founded" });;

        }
    });

}


exports.updateNews = () => {

    const params = {
        apiKey: "00c62f41ddfa4fccba1ceb238dd04f64",
        country: "br",
        category: "health"
    };


    ApiNews.get("", { params: params }).then(res => {

        console.log(`Updating News - ${new Date()}`)

        res.data.articles.forEach((element, index) => {

            const news = {
                title: element.title, description: element.description, content: element.content, image: element.urlToImage,
                author: element.author, date: element.publishedAt, source: element.source.name, url: element.url
            }


            let newNews = new News();
            newNews.createNews(news);

            newNews.save(function (error) {

                if (error) {

                    console.log(`Fail to Add News - ${news.title} \n`, error)
                }
            })

        });

    }).catch(e => console.log(e));

}




