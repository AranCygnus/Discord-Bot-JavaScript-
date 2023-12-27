const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const client = require("../../index");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("重啟音樂"),


    async execute(interaction) {
        const {  member, guild } = interaction;

        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if (!voiceChannel) {
            embed.setColor(0xe60000).setDescription(`妳必須在語音頻道裡`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!member.voice.channelId == guild.members.me.voice.channelId) {
            embed.setColor(0xe60000).setDescription(`妳不能使用機器人，它已經在<#${guild.members.me.voice.channelId}>`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        try {

            const queue = await client.distube.getQueue(voiceChannel);

            if (!queue) {
                embed.setColor(0xe60000).setDescription(`播放清單是空的`);
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            await queue.resume(voiceChannel);
            embed.setColor(0xF8B500).setDescription(`⏯️ 歌曲已重新播放`);
            return interaction.reply({ embeds: [embed], ephemeral: true });

        } catch (error) {
            console.log(error);

            embed.setColor(0xe60000).setDescription(`⛔ | 發生了錯誤...`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}