// Required libraries and assets
// const express = require("express");
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken'); // $ npm install jsonwebtoken
const axios = require('axios');
// const request = require('request');
// const cors = require('cors');


// Variables
const client_id = "e931c1d4-434e-11ed-980d-df355d201f91";


var methods = {
    getRefresh_JWT: function() {
        var private_key = fs.readFileSync("C:\\Users\\chess\\Documents\\Important\\Programming Skills\\ReactJS\\application1\\server\\zube_api_key.pem");

        var now = Math.floor(Date.now() / 1000);
        var refresh_jwt = jsonwebtoken.sign({
            iat: now,      // Issued at time
            exp: now + 60, // JWT expiration time (10 minute maximum)
            iss: client_id // Your Zube client id
        }, private_key, { algorithm: 'RS256' });

        return refresh_jwt;
    },

    getAccess_JWT: async function() {
        var refresh_jwt = this.getRefresh_JWT();

        const response = await axios.post(
            'https://zube.io/api/users/tokens',
            '',
            {
                headers: {
                    'Authorization': 'Bearer ' + refresh_jwt,
                    'X-Client-ID': client_id,
                    'Accept': 'application/json'
                }
            }
        );

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(response.data.access_token);
            });
        });
    }
};

exports.data = methods;