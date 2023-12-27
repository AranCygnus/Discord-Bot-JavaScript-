const { EmbedBuilder } = require('discord.js');

const Poll = require("../../Models/polls");

const dotenv = require('dotenv');
dotenv.config();

let emojiNumber = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];


module.exports = {
    data: {
        name: `votes-button`,
    },

    async execute(interaction, client) {

        const data = await Poll.findOne({  GuildId: interaction.guild.id });

        if (data.Option === 2) {
            let poll1voters = [];
            data.poll1Members.forEach(async (member) => {
                poll1voters.push(`<@${member}>`);
            });
            let poll2voters = [];
            data.poll2Members.forEach(async (member) => {
                poll2voters.push(`<@${member}>`);
            });

            const endPollEmbed = new EmbedBuilder()
                .setTitle(`${data.Title}`)
                .setColor(0xF8B500)
                .setImage(process.env.UNDERLINE)
                .setFooter({ text: `Made by AranCygnus` })
                .setTimestamp()
                .addFields({ name: `${emojiNumber[0]} ${data.poll1Value} ( ${poll1voters.length} )`, value: `> ${poll1voters.join(' ').slice(0, 1020) || `沒有人投。`}` })
                .addFields({ name: `${emojiNumber[1]} ${data.poll2Value} ( ${poll2voters.length} )`, value: `> ${poll2voters.join(' ').slice(0, 1020) || `沒有人投。`}` })

            await interaction.reply({ content: `📊當前票數`, embeds: [endPollEmbed], ephemeral: true });

        } else if (data.Option === 3) {

            let poll1voters = [];
            data.poll1Members.forEach(async (member) => {
                poll1voters.push(`<@${member}>`);
            });
            let poll2voters = [];
            data.poll2Members.forEach(async (member) => {
                poll2voters.push(`<@${member}>`);
            });
            let poll3voters = [];
            data.poll3Members.forEach(async (member) => {
                poll3voters.push(`<@${member}>`);
            });

            const endPollEmbed = new EmbedBuilder()
                .setTitle(`${data.Title}`)
                .setColor(0xF8B500)
                .setImage(process.env.UNDERLINE)
                .setFooter({ text: `Made by AranCygnus` })
                .setTimestamp()
                .addFields({ name: `${emojiNumber[0]} ${data.poll1Value} ( ${poll1voters.length} )`, value: `> ${poll1voters.join(' ').slice(0, 1020) || `沒有人投。`}` })
                .addFields({ name: `${emojiNumber[1]} ${data.poll2Value} ( ${poll2voters.length} )`, value: `> ${poll2voters.join(' ').slice(0, 1020) || `沒有人投。`}` })
                .addFields({ name: `${emojiNumber[2]} ${data.poll3Value} ( ${poll3voters.length} )`, value: `> ${poll3voters.join(' ').slice(0, 1020) || `沒有人投。`}` })

            await interaction.reply({ content: `📊當前票數`, embeds: [endPollEmbed], ephemeral: true });


        } else if (data.Option === 4) {

            let poll1voters = [];
            data.poll1Members.forEach(async (member) => {
                poll1voters.push(`<@${member}>`);
            });
            let poll2voters = [];
            data.poll2Members.forEach(async (member) => {
                poll2voters.push(`<@${member}>`);
            });
            let poll3voters = [];
            data.poll3Members.forEach(async (member) => {
                poll3voters.push(`<@${member}>`);
            });
            let poll4voters = [];
            data.poll4Members.forEach(async (member) => {
                poll4voters.push(`<@${member}>`);
            });

            const endPollEmbed = new EmbedBuilder()
                .setTitle(`${data.Title}`)
                .setColor(0xF8B500)
                .setImage(process.env.UNDERLINE)
                .setFooter({ text: `Made by AranCygnus` })
                .setTimestamp()
                .addFields({ name: `${emojiNumber[0]} ${data.poll1Value} ( ${poll1voters.length} )`, value: `> ${poll1voters.join(' ').slice(0, 1020) || `沒有人投。`}` })
                .addFields({ name: `${emojiNumber[1]} ${data.poll2Value} ( ${poll2voters.length} )`, value: `> ${poll2voters.join(' ').slice(0, 1020) || `沒有人投。`}` })
                .addFields({ name: `${emojiNumber[2]} ${data.poll3Value} ( ${poll3voters.length} )`, value: `> ${poll3voters.join(' ').slice(0, 1020) || `沒有人投。`}` })
                .addFields({ name: `${emojiNumber[3]} ${data.poll4Value} ( ${poll4voters.length} )`, value: `> ${poll4voters.join(' ').slice(0, 1020) || `沒有人投。`}` })

            await interaction.reply({ content: `📊當前票數`, embeds: [endPollEmbed], ephemeral: true });


        } else if (data.Option === 5) {

            let poll1voters = [];
            data.poll1Members.forEach(async (member) => {
                poll1voters.push(`<@${member}>`);
            });
            let poll2voters = [];
            data.poll2Members.forEach(async (member) => {
                poll2voters.push(`<@${member}>`);
            });
            let poll3voters = [];
            data.poll3Members.forEach(async (member) => {
                poll3voters.push(`<@${member}>`);
            });
            let poll4voters = [];
            data.poll4Members.forEach(async (member) => {
                poll4voters.push(`<@${member}>`);
            });
            let poll5voters = [];
            data.poll5Members.forEach(async (member) => {
                poll5voters.push(`<@${member}>`);
            });

            const endPollEmbed = new EmbedBuilder()
                .setTitle(`${data.Title}`)
                .setColor(0xF8B500)
                .setImage(process.env.UNDERLINE)
                .setFooter({ text: `Made by AranCygnus` })
                .setTimestamp()
                .addFields({ name: `${emojiNumber[0]} ${data.poll1Value} ( ${poll1voters.length} )`, value: `> ${poll1voters.join(' ').slice(0, 1020) || `沒有人投。`}` })
                .addFields({ name: `${emojiNumber[1]} ${data.poll2Value} ( ${poll2voters.length} )`, value: `> ${poll2voters.join(' ').slice(0, 1020) || `沒有人投。`}` })
                .addFields({ name: `${emojiNumber[2]} ${data.poll3Value} ( ${poll3voters.length} )`, value: `> ${poll3voters.join(' ').slice(0, 1020) || `沒有人投。`}` })
                .addFields({ name: `${emojiNumber[3]} ${data.poll4Value} ( ${poll4voters.length} )`, value: `> ${poll4voters.join(' ').slice(0, 1020) || `沒有人投。`}` })
                .addFields({ name: `${emojiNumber[4]} ${data.poll5Value} ( ${poll5voters.length} )`, value: `> ${poll5voters.join(' ').slice(0, 1020) || `沒有人投。`}` })

            await interaction.reply({ content: `📊當前票數`, embeds: [endPollEmbed], ephemeral: true });


        }
    }
}
