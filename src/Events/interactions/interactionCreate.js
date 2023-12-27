const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction, client) {
        const { customId, values, fields, member, user, guild, commandName, channel, guildId, message } = interaction;

        //----------------------------------------------------------------

        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(commandName);

            if (!command) return interaction.reply({ content: "outdated command.", ephemeral: true });

            command.execute(interaction, client);
        }
        //----------------------------------------------------------------

        if (interaction.isStringSelectMenu()) {
            const menu = client.stringSelectMenus.get(customId);
            if (!menu) return new Error("There is no code for this select menu.");
            try {
                await menu.execute(interaction, client);
            } catch (error) {
                console.error(error);
            };
        };

        //----------------------------------------------------------------

        if (interaction.isModalSubmit()) {
            const modal = client.modals.get(customId);
            if (!modal) return new Error("There is no code for this modal.");
            try {
                await modal.execute(interaction, client);
            } catch (error) {
                console.error(error);
            };
        };

        //----------------------------------------------------------------

        if (interaction.isButton()) {
            const button = client.buttons.get(customId);
            if (!button) return new Error("There is no code for this button.");
            try {
                await button.execute(interaction, client);
            } catch (error) {
                console.error(error);
            };
        };
    }
}