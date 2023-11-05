const { Client, GatewayIntentBits, Events } = require('discord.js');
const Logger = require('./Logger.js')
const path  = require('node:path');


class EventHandler {
    constructor(client) {
        this.client = client;
        this.events = Object.values(Events);
        this.EventsLogger = new Logger('events.log'); 
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.events.forEach((event) => {
            this.client.on(event, (response) => {
                this.logEvent(response, event);
            });
        });
    }

    logEvent(response, eventName) {
        try {
            this.EventsLogger.log(response, eventName,false);
        } catch (error) {
            console.log('Could not log the response.',error);
        }
    }

}

module.exports = EventHandler;
