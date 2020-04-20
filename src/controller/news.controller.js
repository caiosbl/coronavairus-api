const News = require('../model/News');
const queryString = require('query-string');
const Api = require('../utils/apis');
const ApiNews = Api.ApiNews;


const newsSort = (a, b) => {
    if (b > a) return 1;
    return -1;
}



exports.getLastNews = (req, res) => {

    const query = queryString.parse(req._parsedUrl.query);

    // Number of News to return
    let size = query.size;
    if (isNaN(size)) return res.status(400).json({ message: "Size must be a valid number" });
    size = Math.abs(size);

    const queryDb = News.find().sort({date: -1}).limit(size);

    queryDb.exec(function (error, news) {

        if (!error && news !== null) {

            res.json({ content: news.map(element => element.getInfo()) });


        } else {

            res.status(400).json({ message: "News not founded" });;

        }
    });

}

exports.getAllNews = (req, res) => {


   const queryDb = News.find().sort({date: -1});

   queryDb.exec((error, news) => {

        if (!error && news !== null) {

            res.json({ content: news.map(element => element.getInfo()) });


        } else {

            res.status(400).json({ message: "News not founded" });;

        }
    });

}


exports.updateNews = () => {

    const params = {
        apiKey: process.env.NEWS_API_KEY,
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




