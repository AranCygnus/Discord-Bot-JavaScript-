const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');


const Poll = require("../../Models/polls");

const dotenv = require('dotenv');
dotenv.config();

let emojiNumber = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('建立投票')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     *
     * @param {Object} param0
     * @param {ChatInputCommandInteraction} param0.interaction
     */

    async execute(interaction, client) {

        const pollModal = new ModalBuilder()
            .setCustomId(`poll-settings`)
            .setTitle("建立投票");

        const pollTitle = new TextInputBuilder()
            .setCustomId(`poll-title`)
            .setLabel("投票標題")
            .setPlaceholder("妳要建立什麼樣的投票?")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const options1 = new TextInputBuilder()
            .setCustomId(`option-1`)
            .setLabel("選項一")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const options2 = new TextInputBuilder()
            .setCustomId(`option-2`)
            .setLabel("選項二")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const extraOptions = new TextInputBuilder()
            .setCustomId(`extra-options`)
            .setLabel("其他選項")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder("最多增加三項")
            .setRequired(false);

        const ActionRow1 = new ActionRowBuilder().addComponents(pollTitle);
        const ActionRow2 = new ActionRowBuilder().addComponents(options1);
        const ActionRow3 = new ActionRowBuilder().addComponents(options2);
        const ActionRow4 = new ActionRowBuilder().addComponents(extraOptions);

        pollModal.addComponents(ActionRow1, ActionRow2, ActionRow3, ActionRow4);

        await interaction.showModal(pollModal);


        const filter = (interaction) => interaction.customId === `poll-settings`

        const modalInteraction = await interaction.awaitModalSubmit({
            filter,
            time: 1000 * 60 * 3
        }).catch((error) => console.log(error))


        await modalInteraction.deferReply({ ephemeral: true });

        let pollMessage;

        pollMessage = await interaction.channel.send(`正在建立投票...`)

        const pollTitleValue = modalInteraction.fields.getTextInputValue("poll-title");
        const options1Value = modalInteraction.fields.getTextInputValue("option-1");
        const options2Value = modalInteraction.fields.getTextInputValue("option-2");
        const extraOptionsValue = modalInteraction.fields.getTextInputValue("extra-options");

        let extraList = extraOptionsValue.split(`\n`);
        let votes = 0

        if (extraOptionsValue === ``) {
            const newPoll = new Poll({
                GuildId: interaction.guild.id,
                MessageId: pollMessage.id,
                Title: pollTitleValue,
                Option: 2,
                poll1Value: options1Value,
                poll2Value: options2Value,
                poll1Vote: votes,
                poll2Vote: votes,
                poll1Members: [],
                poll2Members: [],
            })

            await newPoll.save();

            const pollEmbed = new EmbedBuilder()
                .setTitle(`${pollTitleValue}`)
                .setColor(0xF8B500)
                .setImage(process.env.UNDERLINE)
                .setFooter({ text: `Made by AranCygnus` })
                .addFields({ name: `${emojiNumber[0]} ${options1Value}`, value: `> ** ${votes} **` })
                .addFields({ name: `${emojiNumber[1]} ${options2Value}`, value: `> ** ${votes} **` })

            const pollButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`poll-1-button`)
                        .setLabel(`${emojiNumber[0]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-2-button`)
                        .setLabel(`${emojiNumber[1]}`)
                        .setStyle(ButtonStyle.Secondary),
                );

            const votesButton = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId(`votes-button`)
                    .setLabel(`當前票數`)
                    .setStyle(ButtonStyle.Primary)
                );

            pollMessage.edit({ content: `📊 投票`, embeds: [pollEmbed], components: [pollButton, votesButton] });
            modalInteraction.editReply({ content: `建立成功`, ephemeral: true });


        } else if (extraList.length === 1) {

            const newPoll = new Poll({
                GuildId: interaction.guild.id,
                MessageId: pollMessage.id,
                Title: pollTitleValue,
                Option: 3,
                poll1Value: options1Value,
                poll2Value: options2Value,
                poll3Value: extraList[0],
                poll1Vote: votes,
                poll2Vote: votes,
                poll3Vote: votes,
                poll1Members: [],
                poll2Members: [],
                poll3Members: [],
            })

            await newPoll.save();

            const pollEmbed = new EmbedBuilder()
                .setTitle(`${pollTitleValue}`)
                .setColor(0xF8B500)
                .setImage(process.env.UNDERLINE)
                .setFooter({ text: `Made by AranCygnus` })
                .addFields({ name: `${emojiNumber[0]} ${options1Value}`, value: `> ** ${votes} **` })
                .addFields({ name: `${emojiNumber[1]} ${options2Value}`, value: `> ** ${votes} **` })
                .addFields({ name: `${emojiNumber[2]} ${extraList[0]}`, value: `> ** ${votes} **` })

            const pollButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`poll-1-button`)
                        .setLabel(`${emojiNumber[0]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-2-button`)
                        .setLabel(`${emojiNumber[1]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-3-button`)
                        .setLabel(`${emojiNumber[2]}`)
                        .setStyle(ButtonStyle.Secondary),
                );

            const votesButton = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId(`votes-button`)
                    .setLabel(`當前票數`)
                    .setStyle(ButtonStyle.Primary)
                );

            pollMessage.edit({ content: `📊 投票`, embeds: [pollEmbed], components: [pollButton, votesButton] });
            modalInteraction.editReply({ content: `建立成功`, ephemeral: true });


        } else if (extraList.length === 2) {

            const newPoll = new Poll({
                GuildId: interaction.guild.id,
                MessageId: pollMessage.id,
                Title: pollTitleValue,
                Option: 4,
                poll1Value: options1Value,
                poll2Value: options2Value,
                poll3Value: extraList[0],
                poll4Value: extraList[1],
                poll1Vote: votes,
                poll2Vote: votes,
                poll3Vote: votes,
                poll4Vote: votes,
                poll1Members: [],
                poll2Members: [],
                poll3Members: [],
                poll4Members: [],
            })

            await newPoll.save();

            const pollEmbed = new EmbedBuilder()
                .setTitle(`${pollTitleValue}`)
                .setColor(0xF8B500)
                .setImage(process.env.UNDERLINE)
                .setFooter({ text: `Made by AranCygnus` })
                .addFields({ name: `${emojiNumber[0]} ${options1Value}`, value: `> ** ${votes} **` })
                .addFields({ name: `${emojiNumber[1]} ${options2Value}`, value: `> ** ${votes} **` })
                .addFields({ name: `${emojiNumber[2]} ${extraList[0]}`, value: `> ** ${votes} **` })
                .addFields({ name: `${emojiNumber[3]} ${extraList[1]}`, value: `> ** ${votes} **` })

            const pollButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`poll-1-button`)
                        .setLabel(`${emojiNumber[0]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-2-button`)
                        .setLabel(`${emojiNumber[1]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-3-button`)
                        .setLabel(`${emojiNumber[2]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-4-button`)
                        .setLabel(`${emojiNumber[3]}`)
                        .setStyle(ButtonStyle.Secondary),
                );

            const votesButton = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId(`votes-button`)
                    .setLabel(`當前票數`)
                    .setStyle(ButtonStyle.Primary)
                );

            pollMessage.edit({ content: `📊 投票`, embeds: [pollEmbed], components: [pollButton, votesButton] });
            modalInteraction.editReply({ content: `建立成功`, ephemeral: true });


        } else if (extraList.length === 3) {

            const newPoll = new Poll({
                GuildId: interaction.guild.id,
                MessageId: pollMessage.id,
                Title: pollTitleValue,
                Option: 5,
                poll1Value: options1Value,
                poll2Value: options2Value,
                poll3Value: extraList[0],
                poll4Value: extraList[1],
                poll5Value: extraList[2],
                poll1Vote: votes,
                poll2Vote: votes,
                poll3Vote: votes,
                poll4Vote: votes,
                poll5Vote: votes,
                poll1Members: [],
                poll2Members: [],
                poll3Members: [],
                poll4Members: [],
                poll5Members: [],
            })

            await newPoll.save();

            const pollEmbed = new EmbedBuilder()
                .setTitle(`${pollTitleValue}`)
                .setColor(0xF8B500)
                .setImage(process.env.UNDERLINE)
                .setFooter({ text: `Made by AranCygnus` })
                .addFields({ name: `${emojiNumber[0]} ${options1Value}`, value: `> ** ${votes} **` })
                .addFields({ name: `${emojiNumber[1]} ${options2Value}`, value: `> ** ${votes} **` })
                .addFields({ name: `${emojiNumber[2]} ${extraList[0]}`, value: `> ** ${votes} **` })
                .addFields({ name: `${emojiNumber[3]} ${extraList[1]}`, value: `> ** ${votes} **` })
                .addFields({ name: `${emojiNumber[4]} ${extraList[2]}`, value: `> ** ${votes} **` })

            const pollButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`poll-1-button`)
                        .setLabel(`${emojiNumber[0]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-2-button`)
                        .setLabel(`${emojiNumber[1]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-3-button`)
                        .setLabel(`${emojiNumber[2]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-4-button`)
                        .setLabel(`${emojiNumber[3]}`)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`poll-5-button`)
                        .setLabel(`${emojiNumber[4]}`)
                        .setStyle(ButtonStyle.Secondary),
                );

            const votesButton = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId(`votes-button`)
                    .setLabel(`當前票數`)
                    .setStyle(ButtonStyle.Primary)
                );

            pollMessage.edit({ content: `📊 投票`, embeds: [pollEmbed], components: [pollButton, votesButton] });
            modalInteraction.editReply({ content: `建立成功`, ephemeral: true });

        } else if (extraList.length > 3) {
            pollMessage.delete()
            modalInteraction.editReply({ content: `最多增加三項`, ephemeral: true });

        }

    }
}