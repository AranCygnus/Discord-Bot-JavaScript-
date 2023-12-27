const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const client = require("../../index");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("播放歌曲")
        .addStringOption(option =>
            option.setName("歌名")
                .setDescription("搜尋歌曲")
                .setRequired(true)
        ),
    async execute(interaction) {
        const { options, member, guild, channel } = interaction;

        const query = options.getString("歌名");
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

            client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
            embed.setColor(0xF8B500).setDescription(`搜尋成功`)
            return interaction.reply({ embeds: [embed], ephemeral: true });

        } catch (error) {
            console.log(error);

            embed.setColor(0xe60000).setDescription(`⛔ | 發生了錯誤...`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}