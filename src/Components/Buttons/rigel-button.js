module.exports = {
    data: {
        name: `rigel-button`,
    },
    async execute(interaction, client) {
        const role = interaction.guild.roles.cache.get('965815548036411402');
        if (interaction.member.roles.cache.hasAny('965815548036411402')) {
            await interaction.reply({ content: `妳已經是 ${role.name} 了。`, ephemeral: true });
        } else {
            await interaction.member.roles.add(role)
                .then((member) =>
                    interaction.reply({ content: `妳領取 ${role.name} 身分組了。`, ephemeral: true }));

        }
    }
}