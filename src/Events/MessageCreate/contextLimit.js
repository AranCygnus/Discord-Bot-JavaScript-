const { Events } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,

    async execute(messages) {
        if (messages.author.bot) return;

        if (messages.content.length > 100) {
            messages.delete();
            messages.channel.send(`TMD超過100字了!\n<@${messages.author.id}>講這麼多話想死484。`)
        };
    }
};