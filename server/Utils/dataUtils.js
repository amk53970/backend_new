// Required libraries and assets
// const express = require("express");
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken'); // $ npm install jsonwebtoken
const axios = require('axios');
const keyUtils = require('./keyUtils.js');
const request = require('request');
// const cors = require('cors');


var methods = {

    get_projects: function(data) {

        var length = data.pagination.total;
        var id;
        var project_ids = [];
        for (i = 0; i < length; i++) {
            id = data.data[i].project_id;
            if (!project_ids.includes(id)) {
                project_ids.push(id);
            }
        }

        console.log(project_ids);
        return project_ids;

    },
   
    get_user_velocity_api_res: function(data) {

        /* 
        1. Loop through each card and get the project id
        */
        var result = {

        }

        result.cards = data.pagination.total;
        result.projects = this.get_projects(data).length;

        /* 
        
        */

        return result;

    }

};

exports.functions = methods;
