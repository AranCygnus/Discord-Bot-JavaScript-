const { Events } = require("discord.js");
const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const mongodbURL = process.env.MONGODB_URL

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {

        client.user.setPresence({ activities: [{ name: "難道妳良心不會痛嗎?", type: ActivityType.Streaming }], status: "online" });

        console.log(`Logged in as ${client.user.tag} ID: ${client.user.id}`);
        console.log(`Bot ready.`)

        if (!mongodbURL) return;
        await mongoose.connect(mongodbURL)

        if (mongoose.connect){
            console.log(`Connected to MongoDB.`)
        }
    }
};