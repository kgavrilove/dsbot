const { Events } = require('discord.js');
const config = require('../config/reaction.json'); 

const REACTION_CHANCE = 0.33;

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        if (message.author.bot) return;

        const randomReactions = config.random[message.author.username];
        if (randomReactions && Math.random() < REACTION_CHANCE) { 
            try {
                const reaction = randomReactions[Math.floor(Math.random() * randomReactions.length)];
                await message.react(reaction);
            } catch (error) {
                console.error('randomReactions:', error);
            }
        }

        const permanentReactions = config.permanent[message.author.username];
        if (permanentReactions) {
            try {
                for (const reaction of permanentReactions) {
                    await message.react(reaction);
                }
            } catch (error) {
                console.error('permanentReactions:', error);
            }
        }
    },
};


