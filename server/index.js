// Imports
var keyUtils = require('./Utils/keyUtils.js');
var dataUtils = require('./Utils/dataUtils.js');


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
app.get("/cards", async (req, res) => { 

    var access_jwt = await keyUtils.data.get_access_JWT();

    var headers = {
        'Authorization': 'Bearer ' + access_jwt,
        'X-Client-ID': client_id,
        'Accept': 'application/json'
    };
    
    var options = {
        url: 'https://zube.io/api/cards',
        headers: headers
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body);
            res.json(data);
        }
    }
    request(options, callback);

});

app.get("/user-velocity", async (req, res) => { 

    /* Outline 
    1. Get a list of cards
    2. Send the JSON object to a data manipulation function that will do the rest
    3. Return the result in the res.json
    */

    var access_jwt = await keyUtils.data.get_access_JWT();

    var headers = {
        'Authorization': 'Bearer ' + access_jwt,
        'X-Client-ID': client_id,
        'Accept': 'application/json'
    };
    
    var options = {
        url: 'https://zube.io/api/cards',
        // url: 'https://zube.io/api/cards?where%5Bproject_id%5D=29609',
        headers: headers
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body);
            // res.json(data);
            console.log('zube call complete');
            res.json(dataUtils.functions.get_user_velocity_api_res(data));
        }
    }
    
    console.log('zube call started');
    request(options, callback);
    
});

app.get("/testAPI", async (req, res) => { 

    // console.log(await projectFetchUtils.functions.get_project_id());
    // console.log(projectFetchUtils.variables);

    // var options = {
    //     url: 'http://localhost:3001/testEndpoint'
    // };
    
    // function callback(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         res.json(JSON.parse(body));
    //     }
    // }
    
    // request(options, callback);
    res.json(await axios.get('http://localhost:3001/testEndpoint').data);

});

app.get("/testEndpoint", async (req, res) => { 

    res.json({'message': 'Hello world'});

});
