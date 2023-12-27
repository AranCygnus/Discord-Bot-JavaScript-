const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const client = require("../../index");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("now-playing")
        .setDescription("正在播放的音樂"),
    async execute(interaction) {
        const { member, guild } = interaction;
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

            const song = queue.songs[0];

            embed.setTitle(`${song.name}`)
                .setURL(`${song.url}`)
                .setThumbnail(`${song.thumbnail}`)
                .setColor(0xF8B500)
                .setImage(process.env.UNDERLINE)
                .setFooter({ text: `Made by AranCygnus` })
                .setTimestamp()
                .addFields({ name: `Duration`, value: `${song.formattedDuration}`, inline: false });

            return interaction.reply({ content: `🎶 正在播放`, embeds: [embed], ephemeral: true });

        } catch (error) {
            console.log(error);

            embed.setColor(0xe60000).setDescription(`⛔ | 發生了錯誤...`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}