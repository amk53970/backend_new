// Imports
var utils = require('./Utils/test.js');


// Required libraries and assets
const express = require("express");
// const fs = require('fs');
// const jsonwebtoken = require('jsonwebtoken'); // $ npm install jsonwebtoken
const request = require('request');
const cors = require('cors');
const axios = require('axios');


// Other global variables
const PORT = process.env.PORT || 3001;
const app = express();
const client_id = "e931c1d4-434e-11ed-980d-df355d201f91";


// App modification statements
app.use(cors({
    origin:'*'
}));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


// API endpoints
app.get("/access_jwt", (req, res) => { // localhost:3001/access_jwt

    var refresh_jwt = utils.data.getRefresh_JWT;

    var headers = {
        'Authorization': 'Bearer ' + refresh_jwt,              
        'X-Client-ID': client_id,               
        'Accept': 'application/json'    
    };
    
    var options = {
        url: 'https://zube.io/api/users/tokens',
        method: 'POST',
        headers: headers
    };
    
    var token;
    var data;

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log("token");
            // console.log(body);
            data = JSON.parse(body);
            token = data.access_token;
            console.log(token);
            res.json({'access_jwt': token});
        }
    }

    request(options, callback);

});

app.get("/zubeProjects/request", async (req, res) => { // localhost:3001/zubeProjects/request

    var access_jwt = await utils.data.getAccess_JWT();

    var headers = {
        'Authorization': 'Bearer ' + access_jwt,
        'X-Client-ID': client_id,
        'Accept': 'application/json'
    };
    
    var options = {
        url: 'https://zube.io/api/cards?where%5Bproject_id%5D=29609',
        headers: headers
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body));
        }
    }
    
    request(options, callback);

});
