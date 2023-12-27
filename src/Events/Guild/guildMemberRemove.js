const { Events } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    name: Events.GuildMemberRemove,

    execute(member) {
        const { user, guild } = member;
        const leaveChannel = member.guild.channels.cache.get('982216861817110538');
        const leaveMessage = `【 ${member.displayName} 】 Leave!`;

        const leaveEmbed = new EmbedBuilder()
            .setTitle('Leave!')
            .setColor(0xF8B500)
            .addFields({ name: 'Bye!', value: leaveMessage })
            .setTimestamp();

        leaveChannel.send({ embeds: [leaveEmbed] });
    }
}
