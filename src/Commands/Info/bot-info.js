const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();


module.exports = {
    data: new SlashCommandBuilder()
        .setName("bot-info")
        .setDescription("機器人資訊")
        .setDMPermission(false),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`Bot Information`)
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setColor(0xF8B500)
            .setImage(process.env.UNDERLINE)
            .setFooter({ text: `Made by AranCygnus` })
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setFields([{
                name: "Developers",
                value: "\`Aran Cygnus\` (<@773741735305019442>)",
                inline: false
            },
            {
                name: "Version",
                value: `\`4.0.0\``,
                inline: true
            },
            {
                name: "Powered by",
                value: `discord.js \`14.11.0\``,
                inline: true
            },
            ]);


        await interaction.reply({ embeds: [embed] });
    }
}



