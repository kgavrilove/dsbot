const { Client, GatewayIntentBits, Events } = require('discord.js');

class Logger {
    constructor(client) {
        this.client = client;
        this.messageEvents = [
            Events.MessageCreate,
            Events.MessageDelete
        ];
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.messageEvents.forEach((event) => {
            this.client.on(event, (message) => {
                this.logMessage(message, event);
            });
        });
    }

    logMessage(message, eventName) {
        const messageData = {
            event: eventName,
            content: message.content,
            author: {
                id: message.author.id,
                bot: message.author.bot,
                system: message.author.system,
                username: message.author.username,
                globalname:  message.author.globalName,
                discriminator: message.author.discriminator,
            },
            channel: {
                name: message.channel.name,
                id: message.channel.id,
            },
            guild: {
                name: message.guild ? message.guild.name : 'Direct Message',
                id: message.guild ? message.guild.id : null,
            },
            timestamp: message.createdTimestamp,
        };

        console.log(JSON.stringify(messageData, null, 2));
    }
}
module.exports = Logger;
