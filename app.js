const express = require("express")
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
  console.log("post request received");

  const query = req.body.cityName;
  const apiKey = req.body.key;
  const unit = req.body.units;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url , function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weaData = JSON.parse(data);
      const temp = weaData.main.temp;
      const weaDesp = weaData.weather[0].description;
      const icon = weaData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>the temp is "+temp+" degree celcius</h1>");
      res.write(weaDesp);
      res.write("<img src="+ imageURL+">");
      res.send()
    })
  })

})


//6788d21d8ed6e5eede785e8f5a7181e2

app.listen(3000,function(){
  console.log("at 3000");
})
