const { SlashCommandBuilder } = require('discord.js');
const { PermissionFlagsBits } = require('discord.js');


const Vote = require("../../Models/votes");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote-end')
        .setDescription('結束投票')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName('vote-message-id')
                .setDescription('Message ID for the vote')
                .setRequired(true)),


    async execute(interaction, client) {

        const messageId = interaction.options.getString('vote-message-id');
        const targetVote = await Vote.findOne({ GuildId: interaction.guild.id });
        const targetMessage = await interaction.channel.messages.fetch(targetVote.MessageId);
        const newMessageEmbed = targetMessage.embeds[0]



        targetMessage.delete()

        if (messageId === targetVote.MessageId) {
            Vote.collection.drop()
        }


        await interaction.reply({ content: `📌 投票結束`, embeds: [newMessageEmbed] })

    }

}

