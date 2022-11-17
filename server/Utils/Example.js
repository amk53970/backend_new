// Required libraries and assets
// const express = require("express");
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken'); // $ npm install jsonwebtoken
const axios = require('axios');
const keyUtils = require('./keyUtils.js');
const request = require('request');
// const cors = require('cors');


var methods = {

    // function name: async function(args)
    
    example: function(data) {

        var numOfCards = data.pagination.total

        for (i = 0; i < numOfCards; i++) {

            console.log(data.data[i].creator.name);

        }

    }

};

exports.functions = methods;
