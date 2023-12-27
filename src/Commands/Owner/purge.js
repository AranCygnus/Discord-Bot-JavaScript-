const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('清除訊息')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addIntegerOption(option =>
            option.setName('數量')
                .setDescription('清除數量')
                .setRequired(true)),

    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger('數量');

        const messages = await channel.messages.fetch({ limit: amount + 1 });

        const res = new EmbedBuilder()
            .setTitle('清除留言')
            .setDescription(`已經清除 ${amount} 則訊息。`)
            .setColor(0xF8B500)

        await channel.bulkDelete(amount, true);
        await interaction.reply({ embeds: [res], ephemeral: true });
    }
}