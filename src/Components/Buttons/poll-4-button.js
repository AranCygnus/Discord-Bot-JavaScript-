const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

const Poll = require("../../Models/polls");

let emojiNumber = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];


module.exports = {
    data: {
        name: `poll-4-button`,
    },

    async execute(interaction, client) {

        const data = await Poll.findOne({ GuildId: interaction.guild.id });

        const message = await interaction.channel.messages.fetch(data.MessageId);

        const replyMessage = `❌ 妳已經投過4️⃣了。`;


        if (data.Option === 4) {

            if (data.poll4Members.includes(interaction.user.id)) return interaction.reply({ content: replyMessage, ephemeral: true });

            if (data.poll1Members.includes(interaction.user.id)) {
                data.poll1Vote = data.poll1Vote - 1
            } else if (data.poll2Members.includes(interaction.user.id)) {
                data.poll2Vote = data.poll2Vote - 1
            } else if (data.poll3Members.includes(interaction.user.id)) {
                data.poll3Vote = data.poll3Vote - 1
            };

            const newEmbed = EmbedBuilder.from(message.embeds[0]).setFields(
                { name: `${emojiNumber[0]} ${data.poll1Value}`, value: `> ** ${data.poll1Vote} **` },
                { name: `${emojiNumber[1]} ${data.poll2Value}`, value: `> ** ${data.poll2Vote} **` },
                { name: `${emojiNumber[2]} ${data.poll3Value}`, value: `> ** ${data.poll3Vote} **` },
                { name: `${emojiNumber[3]} ${data.poll4Value}`, value: `> ** ${data.poll4Vote + 1} **` },
            )

            const pollButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`poll-1-button`)
                        .setLabel(`${emojiNumber[0]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-2-button`)
                        .setLabel(`${emojiNumber[1]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-3-button`)
                        .setLabel(`${emojiNumber[2]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-4-button`)
                        .setLabel(`${emojiNumber[3]}`)
                        .setStyle(ButtonStyle.Secondary)
                );

            const votesButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`votes-button`)
                        .setLabel(`當前票數`)
                        .setStyle(ButtonStyle.Primary)
                );

            await interaction.update({ content: `📊投票`, embeds: [newEmbed], components: [pollButton, votesButton] });

            data.poll4Vote++;

            if (data.poll1Members.includes(interaction.user.id)) {
                data.poll1Vote = data.poll1Vote - 1
            } else if (data.poll2Members.includes(interaction.user.id)) {
                data.poll2Vote = data.poll2Vote - 1
            } else if (data.poll3Members.includes(interaction.user.id)) {
                data.poll3Vote = data.poll3Vote - 1
            };

            data.poll1Members.pull(interaction.user.id);
            data.poll2Members.pull(interaction.user.id);
            data.poll3Members.pull(interaction.user.id);
            data.poll4Members.push(interaction.user.id);
            data.save();


        } else if (data.Option === 5) {

            if (data.poll4Members.includes(interaction.user.id)) return interaction.reply({ content: replyMessage, ephemeral: true });

            if (data.poll1Members.includes(interaction.user.id)) {
                data.poll1Vote = data.poll1Vote - 1
            } else if (data.poll2Members.includes(interaction.user.id)) {
                data.poll2Vote = data.poll2Vote - 1
            } else if (data.poll3Members.includes(interaction.user.id)) {
                data.poll3Vote = data.poll3Vote - 1
            } else if (data.poll5Members.includes(interaction.user.id)) {
                data.poll5Vote = data.poll5Vote - 1
            };

            const newEmbed = EmbedBuilder.from(message.embeds[0]).setFields(
                { name: `${emojiNumber[0]} ${data.poll1Value}`, value: `> ** ${data.poll1Vote} **` },
                { name: `${emojiNumber[1]} ${data.poll2Value}`, value: `> ** ${data.poll2Vote} **` },
                { name: `${emojiNumber[2]} ${data.poll3Value}`, value: `> ** ${data.poll3Vote} **` },
                { name: `${emojiNumber[3]} ${data.poll4Value}`, value: `> ** ${data.poll4Vote + 1} **` },
                { name: `${emojiNumber[4]} ${data.poll5Value}`, value: `> ** ${data.poll5Vote} **` },
            );

            message.edit({ content: `📊投票`, embeds: [newEmbed]});
            await interaction.reply({ content: `✔️ 投票成功`, ephemeral: true });

            data.poll4Vote++;

            data.poll1Members.pull(interaction.user.id);
            data.poll2Members.pull(interaction.user.id);
            data.poll3Members.pull(interaction.user.id);
            data.poll4Members.push(interaction.user.id);
            data.poll5Members.pull(interaction.user.id);
            data.save();


        };

    }
}