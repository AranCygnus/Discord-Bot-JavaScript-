const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Bot 延遲")
        .setDMPermission(false),

    async execute(interaction, client) {
        embed = new EmbedBuilder().setDescription(`Bot Latency: ${client.ws.ping}`).setColor(0xF8B500);
        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}