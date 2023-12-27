const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');


const Vote = require("../../Models/votes");
const formatResults = require("../../Utils/formatResults")

const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('投票')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     *
     * @param {Object} param0
     * @param {ChatInputCommandInteraction} param0.interaction
     */

    async execute(interaction, client) {

        const modal = new ModalBuilder()
            .setCustomId(`vote-modal`)
            .setTitle("建立一個投票");

        const textInput = new TextInputBuilder()
            .setCustomId(`vote-input`)
            .setLabel("妳想要建立什麼樣的投票?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setMaxLength(1000);


        const actionRow = new ActionRowBuilder().addComponents(textInput);
        modal.addComponents(actionRow);

        await interaction.showModal(modal);


        const filter = (interaction) => interaction.customId === `vote-modal`

        const modalInteraction = await interaction.awaitModalSubmit({
            filter,
            time: 1000 * 60 * 3
        }).catch((error) => console.log(error))


        modalInteraction.deferReply({ ephemeral: true });

        let voteMessage;

        voteMessage = await interaction.channel.send(`正在建立投票...`)

        const voteText = modalInteraction.fields.getTextInputValue("vote-input");

        const newVote = new Vote({
            AuthorId: interaction.user.id,
            GuildId: interaction.guild.id,
            MessageId: voteMessage.id,
            Content: voteText,
        });

        await newVote.save();

        const voteEmbed = new EmbedBuilder()
            .setTitle(voteText)
            .addFields({ name: `票數`, value: formatResults() })
            .setColor(0xF8B500)
            .setImage(process.env.UNDERLINE)
            .setFooter({ text: `Made by AranCygnus` })

        const upVoteButton = new ButtonBuilder()
            .setCustomId(`up-vote-button`)
            .setEmoji("✅")
            .setStyle(ButtonStyle.Secondary)

        const downVoteButton = new ButtonBuilder()
            .setCustomId(`down-vote-button`)
            .setEmoji("❎")
            .setStyle(ButtonStyle.Secondary)


        const buttonRow = new ActionRowBuilder().addComponents(upVoteButton, downVoteButton);

        modalInteraction.editReply({ content: `建立成功`, ephemeral: true });

        voteMessage.edit({ content: `📊 投票`, embeds: [voteEmbed], components: [buttonRow] });



    }
}
