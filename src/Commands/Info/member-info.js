const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();


module.exports = {
    data: new SlashCommandBuilder()
        .setName("member-info")
        .setDescription("成員資訊")
        .setDMPermission(false)
        .addUserOption(option =>
            option.setName("成員")
                .setDescription("選擇一個成員")
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("成員");
        const member = await interaction.guild.members.fetch(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.username

        const embed = new EmbedBuilder()
            .setTitle("Member Information")
            .setColor(0xF8B500)
            .setImage(process.env.UNDERLINE)
            .setFooter({ text: `Made by AranCygnus` })
            .setAuthor({ name: tag, iconURL: icon })
            .setThumbnail(icon)
            .setTimestamp()
            .setFields([{
                name: "Name",
                value: `${user}`,
                inline: false
            },
            {
                name: "Roles",
                value: `${member.roles.icon} ${member.roles.highest}`,
                inline: false
            },
            {
                name: "Joined At",
                value: `<t:${parseInt(member.joinedAt/ 1000)}:R>`,
                inline: false
            },
            ]);

        await interaction.reply({ embeds: [embed] });
    }
}
