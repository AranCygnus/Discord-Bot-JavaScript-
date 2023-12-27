const { EmbedBuilder } = require("discord.js");


const client = require("../../index");
const dotenv = require("dotenv");
dotenv.config();

const embed = new EmbedBuilder();


client.distube
    .on('playSong', (queue, song) => {
        embed.setTitle(`${song.name}`)
            .setURL(`${song.url}`)
            .setThumbnail(`${song.thumbnail}`)
            .setColor(0xF8B500)
            .setImage(process.env.UNDERLINE)
            .setFooter({ text: `Made by AranCygnus` })
            .setTimestamp()

        queue.textChannel.send({ content: `🎶 正在播放`, embeds: [embed] })
    })


    .on('addSong', (queue, song) => {
        embed.setTitle(`${song.name}`)
            .setURL(`${song.url}`)
            .setThumbnail(`${song.thumbnail}`)
            .setColor(0xF8B500)
            .setTimestamp();

        queue.textChannel.send({ content: `💿 | 加入播放清單`, embeds: [embed] })
    })


    .on('addList', (queue, playlist) => {
        embed.setTitle(`${playlist.name}`)
            .setThumbnail(`${playlist.thumbnail}`)
            .setColor(0xF8B500)
            .setTimestamp()
            .setDescription(`增加 **${playlist.songs.length}** 首歌`);

        queue.textChannel.send({ content: `📜 | 加入播放清單`, embeds: [embed] });
    })

    .on('error', (channel, error) => {
        embed.setColor(0xe60000).setDescription(`⛔ | 發生了錯誤...`);
        if (channel) channel.send({ embeds: [embed], ephemeral: true });
        else console.error(error);
    })


    .on('empty', channel =>{
        embed.setColor(0xF8B500).setDescription(`語音頻道沒人了，離開頻道。`);

        channel.send({ embeds: [embed] })
    })


    .on('searchNoResult', (message, query) =>{
        embed.setColor(0xe60000).setDescription(`⛔ | 沒有找到 \`${query}\`!`);

        message.channel.send({ embeds: [embed] })
    })


    .on('finish', queue =>{
        embed.setColor(0xF8B500).setDescription(`撥放完畢`);

        queue.textChannel.send({ embeds: [embed] })
    })