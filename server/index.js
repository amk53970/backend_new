// Imports
var utils = require('./Utils/test.js');


// Required libraries and assets
const express = require("express");
// const fs = require('fs');
// const jsonwebtoken = require('jsonwebtoken'); // $ npm install jsonwebtoken
const request = require('request');
const cors = require('cors');


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
  
    // //to get token
    // var headers = {
    //     'Authorization': 'Bearer ' + refresh_jwt,              
    //     'X-Client-ID': client_id,               
    //     'Accept': 'application/json'    
    // };
    
    // var options = {
    //     url: 'https://zube.io/api/users/tokens',
    //     method: 'POST',
    //     headers: headers
    // };
    
    // var token;
    // var data; var info;
    // function callback(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         // console.log("token");
    //         // console.log(body);
    //         data = JSON.parse(body);
    //         token = data.access_token;

    //         headers = {
    //             'Authorization': 'Bearer ' + token,
    //             'X-Client-ID': client_id,
    //             'Accept': 'application/json'
    //         };
            
    //         options = {
    //             url: 'https://zube.io/api/projects',
    //             headers: headers
    //         };
            
    //         function callZube(error, response, body) {
    //             if (!error && response.statusCode == 200) {
    //                 info = JSON.parse(body);

    //                 res.json({ 'name': info.data[0].name });
    //             }
    //         }
            
    //         request(options, callZube);

    //     }
    // }

    // request(options, callback);






    // console.log("Token outside callback function: " + token + data);

//   // to invoke Zube API
  
//   zubeheaders = {
//     'Authorization': 'Bearer ' + token,
//     'X-Client-ID': "e931c1d4-434e-11ed-980d-df355d201f91",
//     'Accept': 'application/json'
//   };

//   zubeoptions = {
//     url: 'https://zube.io/api/projects',
//     headers: zubeheaders
//   };

//   function zubecallback(error, response, body) {
//      console.log("zubecallback");
//      console.log(error);
//      console.log(response.statusCode);

//      if (!error && response.statusCode == 200) {
//          console.log(body);
//      }
//   }

});
