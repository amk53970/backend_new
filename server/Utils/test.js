// Required libraries and assets
// const express = require("express");
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken'); // $ npm install jsonwebtoken
// const request = require('request');
// const cors = require('cors');

var methods = {
    getRefresh_JWT: function(id) {
        var private_key = fs.readFileSync("C:\\Users\\chess\\Documents\\Important\\Programming Skills\\ReactJS\\application1\\server\\zube_api_key.pem");

        var now = Math.floor(Date.now() / 1000);
        var refresh_jwt = jsonwebtoken.sign({
            iat: now,      // Issued at time
            exp: now + 60, // JWT expiration time (10 minute maximum)
            iss: id // Your Zube client id
        }, private_key, { algorithm: 'RS256' });

        return refresh_jwt;
    }
};

exports.data = methods;