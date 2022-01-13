const express = require("express")

const bodyParser = require("body-parser")
const https = require("https")
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {

    res.sendFile(__dirname+"/index.html")
})

app.post("/", function (req, res) {

    
    const query = req.body.CityName
    
    const appKey="dad08067ae4b19e98a430009f294e660"

    const unit = "metric"
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+"&appid=" +appKey+"&units="+ unit
    
    https.get(url, function (response) {
        console.log("Status-Code", response.statusCode)
        
        response.on("data", function (data) {
            const weatherData=JSON.parse(data)
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const placeName = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(placeName)
            res.write("<h1>The weather of " + placeName + " with temp " + temp + "</h1>")
            res.write("<h1> The climate is "+weatherDesc+" now."+"</h1>")
            res.write("<img src="+imgURL+">")
            res.send()
        })
    })
})

app.listen(3000, function () {
   console.log("Port is running on 3000 local host")
})