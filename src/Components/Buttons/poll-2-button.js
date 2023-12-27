const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

const Poll = require("../../Models/polls");

let emojiNumber = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];


module.exports = {
    data: {
        name: `poll-2-button`,
    },

    async execute(interaction, client) {

        const data = await Poll.findOne({ GuildId: interaction.guild.id });

        const message = await interaction.channel.messages.fetch(data.MessageId);

        const replyMessage = `❌ 妳已經投過2️⃣了。`;


        if (data.Option === 2) {

            if (data.poll2Members.includes(interaction.user.id)) return interaction.reply({ content: replyMessage, ephemeral: true });

            if (data.poll1Members.includes(interaction.user.id)) {
                data.poll1Vote = data.poll1Vote - 1
            };

            const newEmbed = EmbedBuilder.from(message.embeds[0]).setFields(
                { name: `${emojiNumber[0]} ${data.poll1Value}`, value: `> ** ${data.poll1Vote} **` },
                { name: `${emojiNumber[1]} ${data.poll2Value}`, value: `> ** ${data.poll2Vote + 1} **` },
            );

            message.edit({ content: `📊投票`, embeds: [newEmbed]});
            await interaction.reply({ content: `✔️ 投票成功`, ephemeral: true });

            data.poll2Vote++;

            data.poll1Members.pull(interaction.user.id);
            data.poll2Members.push(interaction.user.id);
            data.save();


        } else if (data.Option === 3) {

            if (data.poll2Members.includes(interaction.user.id)) return interaction.reply({ content: replyMessage, ephemeral: true });

            if (data.poll1Members.includes(interaction.user.id)) {
                data.poll1Vote = data.poll1Vote - 1
            } else if (data.poll3Members.includes(interaction.user.id)) {
                data.poll3Vote = data.poll3Vote - 1
            };

            const newEmbed = EmbedBuilder.from(message.embeds[0]).setFields(
                { name: `${emojiNumber[0]} ${data.poll1Value}`, value: `> ** ${data.poll1Vote} **` },
                { name: `${emojiNumber[1]} ${data.poll2Value}`, value: `> ** ${data.poll2Vote + 1} **` },
                { name: `${emojiNumber[2]} ${data.poll3Value}`, value: `> ** ${data.poll3Vote} **` },
            );

            message.edit({ content: `📊投票`, embeds: [newEmbed]});
            await interaction.reply({ content: `✔️ 投票成功`, ephemeral: true });

            data.poll2Vote++;

            data.poll1Members.pull(interaction.user.id);
            data.poll2Members.push(interaction.user.id);
            data.poll3Members.pull(interaction.user.id);
            data.save();


        } else if (data.Option === 4) {

            if (data.poll2Members.includes(interaction.user.id)) return interaction.reply({ content: replyMessage, ephemeral: true });

            if (data.poll1Members.includes(interaction.user.id)) {
                data.poll1Vote = data.poll1Vote - 1
            } else if (data.poll3Members.includes(interaction.user.id)) {
                data.poll3Vote = data.poll3Vote - 1
            } else if (data.poll4Members.includes(interaction.user.id)) {
                data.poll4Vote = data.poll4Vote - 1
            };

            const newEmbed = EmbedBuilder.from(message.embeds[0]).setFields(
                { name: `${emojiNumber[0]} ${data.poll1Value}`, value: `> ** ${data.poll1Vote} **` },
                { name: `${emojiNumber[1]} ${data.poll2Value}`, value: `> ** ${data.poll2Vote + 1} **` },
                { name: `${emojiNumber[2]} ${data.poll3Value}`, value: `> ** ${data.poll3Vote} **` },
                { name: `${emojiNumber[3]} ${data.poll4Value}`, value: `> ** ${data.poll4Vote} **` },
            );

            message.edit({ content: `📊投票`, embeds: [newEmbed]});
            await interaction.reply({ content: `✔️ 投票成功`, ephemeral: true });

            data.poll2Vote++;

            data.poll1Members.pull(interaction.user.id);
            data.poll2Members.push(interaction.user.id);
            data.poll3Members.pull(interaction.user.id);
            data.poll4Members.pull(interaction.user.id);
            data.save();


        } else if (data.Option === 5) {

            if (data.poll2Members.includes(interaction.user.id)) return interaction.reply({ content: replyMessage, ephemeral: true });

            if (data.poll1Members.includes(interaction.user.id)) {
                data.poll1Vote = data.poll1Vote - 1
            } else if (data.poll3Members.includes(interaction.user.id)) {
                data.poll3Vote = data.poll3Vote - 1
            } else if (data.poll4Members.includes(interaction.user.id)) {
                data.poll4Vote = data.poll4Vote - 1
            } else if (data.poll5Members.includes(interaction.user.id)) {
                data.poll5Vote = data.poll5Vote - 1
            };

            const newEmbed = EmbedBuilder.from(message.embeds[0]).setFields(
                { name: `${emojiNumber[0]} ${data.poll1Value}`, value: `> ** ${data.poll1Vote} **` },
                { name: `${emojiNumber[1]} ${data.poll2Value}`, value: `> ** ${data.poll2Vote + 1} **` },
                { name: `${emojiNumber[2]} ${data.poll3Value}`, value: `> ** ${data.poll3Vote} **` },
                { name: `${emojiNumber[3]} ${data.poll4Value}`, value: `> ** ${data.poll4Vote} **` },
                { name: `${emojiNumber[4]} ${data.poll5Value}`, value: `> ** ${data.poll5Vote} **` },
            );

            message.edit({ content: `📊投票`, embeds: [newEmbed]});
            await interaction.reply({ content: `✔️ 投票成功`, ephemeral: true });

            data.poll2Vote++;

            data.poll1Members.pull(interaction.user.id);
            data.poll2Members.push(interaction.user.id);
            data.poll3Members.pull(interaction.user.id);
            data.poll4Members.pull(interaction.user.id);
            data.poll5Members.pull(interaction.user.id);
            data.save();


        };
    }
}