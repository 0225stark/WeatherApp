const express = require("express");
const bodyParser = require("body-parser");
const path=require("path");
const app = express();


app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended: true })); 
app.set("view engine", "ejs");
app.set("views","views");


app.get("/", function (req, res) {
    res.render("index", {
        city: null,
        description:null,
        icon: null,
        temp: null,
        pressure : null,
        humidity : null,
        visibility : null
    });
});


app.post('/',async (req, res) => {
    const city = req.body.city;
    const KEY = process.env.APIKEY;
    const url = `${process.env.APP_API}?q=${city}&units=metric&appid=${KEY}`;

    try{
        await fetch(url)
        .then(res => res.json())
        .then((data) => {
            if(data.message === 'city not found'){
                res.render('index', {
                    city: data.message,
                    description:null,
                    icon: null,
                    temp: null,
                    pressure : null,
                    humidity : null,
                    visibility : null,
                })
            }
            else{
                const city = data.name;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                const temp = data.main.temp;
                const pressure = data.main.pressure;
                const humidity = data.main.humidity;
                const visibility = data.visibility;

                res.render('index', {
                    city, description, icon, temp, pressure, humidity, visibility
                });
            }
        });
    }
    catch(error){
        res.render('index', {
            city: 'something went wrong',
            description:null,
            icon: null,
            temp: null,
            pressure : null,
            humidity : null,
            visibility : null
        });
    };
});

app.use((req,res,next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});
  
app.listen(8000, function () {
    console.log("Weather app listening on port 8000!");
});


