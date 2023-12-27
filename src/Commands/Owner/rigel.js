const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rigel')
        .setDescription('安檢')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const rigelEmbed = new EmbedBuilder()
            .setTitle('安檢')
            .setDescription('點擊下方按鈕來領取身分組。')
            .setColor(0x7e1083);

        const rigelButton = new ButtonBuilder()
            .setCustomId('rigel-button')
            .setLabel('領取身分組')
            .setStyle(ButtonStyle.Success);

        let sendChannel = await interaction.channel.send({
            embeds: ([rigelEmbed]),
            components: [new ActionRowBuilder().setComponents(rigelButton)]
        });

        if (!sendChannel) {
            await interaction.reply({ content: '⚠️ Error', ephemeral: true });
        } else {
            await interaction.reply({ content: '✅ 設置成功', ephemeral: true });
        }
    }
}