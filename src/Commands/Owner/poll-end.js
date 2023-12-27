const { SlashCommandBuilder } = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');


const Poll = require("../../Models/polls");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll-end')
        .setDescription('結束投票')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName('poll-message-id')
                .setDescription('Message ID for the vote')
                .setRequired(true)),


    async execute(interaction, client) {

        const messageId = interaction.options.getString('poll-message-id');
        const targetVote = await Poll.findOne({ GuildId: interaction.guild.id });
        const targetMessage = await interaction.channel.messages.fetch(targetVote.MessageId);
        const newMessageEmbed = targetMessage.embeds[0]



        targetMessage.delete()

        if (messageId === targetVote.MessageId) {
            Poll.collection.drop()
        }


        await interaction.reply({ content: `📌 投票結束`, embeds: [newMessageEmbed] })

    }

}

