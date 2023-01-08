const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig.js');

// const {sendBasicEmail} = require('./services/email-service');
const NotificationController = require('./controllers/email-controller');

const cronJobs = require('./utils/jobs');


const setupAndrunServer = async function (){
    const app = express();

    app.listen(PORT, function (){
        console.log("Server started at", PORT);

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        cronJobs.setupJobs();

        app.post('/v1/api/createTicket', NotificationController.createTicket);
    });
};

setupAndrunServer();