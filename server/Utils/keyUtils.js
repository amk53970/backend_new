// Required libraries and assets
// const express = require("express");
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken'); // $ npm install jsonwebtoken
const axios = require('axios');
// const request = require('request');
// const cors = require('cors');


// Variables
const client_id = "ed4cfc1a-48d1-11ed-9721-8fed3ea79b2a";


var methods = {
    get_refresh_JWT: function() {
        var private_key = fs.readFileSync("C:/Users/Alex/Documents/GitHub/Backend/server/zube_api_key.pemC:/Users/Alex/Documents/GitHub/backend_new/server/zube_api_key.pem");

        var now = Math.floor(Date.now() / 1000);
        var refresh_jwt = jsonwebtoken.sign({
            iat: now,      // Issued at time
            exp: now + 60, // JWT expiration time (10 minute maximum)
            iss: client_id // Your Zube client id
        }, private_key, { algorithm: 'RS256' });

        return refresh_jwt;
    },

    get_access_JWT: async function() {
        var refresh_jwt = this.get_refresh_JWT();
        
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