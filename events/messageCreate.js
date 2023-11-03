const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    once:false,
   async execute(message) {
        const messageData = {
            event:'MessageCreate',
            content: message.content,
            author: {
                id: message.author.id,
                bot:message.author.bot,
                system:message.author.system,
                username: message.author.username,
                globalname: message.author.globalName,
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
        },
};
