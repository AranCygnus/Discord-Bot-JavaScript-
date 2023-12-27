const { Events } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    name: Events.GuildMemberAdd,

    execute(member) {
        const { user, guild } = member;
        const joinChannel = member.guild.channels.cache.get('982210462580101140');
        const joinMessage = `【 ${member.displayName} 】 Join!`;

        const joinEmbed = new EmbedBuilder()
            .setTitle('Join!')
            .setColor(0xF8B500)
            .addFields({ name: 'Welcome!', value: joinMessage })
            .setTimestamp();

        joinChannel.send({ embeds: [joinEmbed] });
    }
}
