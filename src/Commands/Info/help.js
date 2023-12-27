const { SlashCommandBuilder } = require('discord.js');
const { ComponentType, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Bot指令指南')
        .setDMPermission(false),

    async execute(interaction) {
        const emojis = {
            info: '📄',
            public: '📂',
            owner: '⚙️',
            music: '🎵',
        };

        const directories = [
            ...new Set(interaction.client.commands.map((cmd) => cmd.folder))
        ];

        const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommands = interaction.client.commands.filter((cmd) => cmd.folder === dir).map((cmd) => {
                return {
                    name: cmd.data.name,
                    description: cmd.data.description || "這指令沒有註解。"
                }
            })
            return {
                directory: formatString(dir),
                commands: getCommands
            }
        });

        const embed = new EmbedBuilder().setDescription('請從選單選擇一個類別。').setColor(0xF8B500);

        const components = (state) => [
            new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('help-menu')
                    .setPlaceholder('請選擇一個類別。')
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `在${cmd.directory}的指令清單。`,
                                emoji: emojis[cmd.directory.toLowerCase() || null]
                            }
                        })
                    )
            )
        ]

        const initialMessage = await interaction.reply({ embeds: [embed], components: components(false), ephemeral: true });

        const filter = (interaction) => interaction.user.id === interaction.member.id;

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: ComponentType.StringSelect
        });

        collector.on('collect', (interaction) => {
            const [directory] = interaction.values;
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory
            );

            const categoryEmbed = new EmbedBuilder()
                .setTitle(`${formatString(directory)} 指令`)
                .setDescription(`在${directory}的指令清單。`)
                .setColor(0xF8B500)
                .setImage(process.env.UNDERLINE)
                .setFooter({ text: `Made by AranCygnus` })
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true
                        }
                    })
                )

            interaction.update({ embeds: [categoryEmbed] });
        });

        collector.on('end', () => {
            initialMessage.edit({ components: components(true), ephemeral: true });
        });
    }
}