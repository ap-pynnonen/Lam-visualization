//const proxy = require("express-http-proxy");
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const apicache = require('apicache');
//const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 80;

const API_BASE_URL = "https://tie.digitraffic.fi/api/tms/v1/history/raw/lamraw_";

app.use(cors());

const cache = apicache.middleware;

//1440 minutes = 24 hours = 1 day
app.use('/api_call', cache('1440 minutes'), function(req, res) {
    const lam_id = req.query.lamid;
    const year_short = req.query.yearshort;
    const day_number = req.query.daynumber;
    const URL = API_BASE_URL + lam_id + '_' + year_short + '_' + day_number + '.csv';
    const data = axios.get(URL).then((response) => {
        res.send(response.data);
        //console.log("Get data first time: " + URL);
    });
});

app.use(express.static(path.join(__dirname, '/build')));

app.get('/lam-visualization', function(req, res) {
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
    console.log("/build files served to client")
});

app.get("*", (req, res) => { 
  
  // Here user can also design an 
  // error page and render it  
  res.send("PAGE NOT FOUND"); 
}); 

app.listen(PORT, () => {
    console.log(`Starting Proxy server at ${PORT}`);
    console.log('/lam-visualization prefix');
});
