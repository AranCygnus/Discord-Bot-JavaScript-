const { Events } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { Client, Message } = require("discord.js");

const levelSchema = require("../../Models/levels");
const calculateLevelExp = require("../../Utils/calculateLevelExp")

const cooldowns = new Set()


function getRandomEXP(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


/**
 *
 * @param { Client } client
 * @param { Message } message
 */



module.exports = {
    name: Events.MessageCreate,

    async execute(message, client, interaction) {
        if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id)) return;


        const expToGive = getRandomEXP(5, 15);

        const query = {
            UserId: message.author.id,
            GuildId: message.guild.id,
        };


        const level = await levelSchema.findOne(query);

        if (level) {
            level.Exp += expToGive;

            if (level.Exp > calculateLevelExp(level.Level)) {
                level.Exp = 0;
                level.Level += 1;

                embed = new EmbedBuilder()
                    .setTitle(`Level Up!!`)
                    .setDescription(`${message.member} 妳升等了!!\n等級: **${level.Level}**`)
                    .setColor(0xF8B500)

                client.channels.cache.get('1131956988960579594').send({ embeds: [embed], ephemeral: true })
            };

            await level.save().catch((error) => {
                console.log(`Error saving updated level ${error}`);
                return;
            });
            cooldowns.add(message.author.id);
            setTimeout(() => {
                cooldowns.delete(message.author.id);
            }, 60000);

        } else {
            const newLevel = new levelSchema({
                UserId: message.author.id,
                GuildId: message.guild.id,
                Exp: expToGive,
            })

            await newLevel.save()

            cooldowns.add(message.author.id);
            setTimeout(() => {
                cooldowns.delete(message.author.id);
            }, 60000);
        };


    }
}
