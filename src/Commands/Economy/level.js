const { SlashCommandBuilder } = require("discord.js");
const { AttachmentBuilder , EmbedBuilder } = require("discord.js");
const { Client, Interaction } = require("discord.js");

const canvacord = require("canvacord");

const Level = require("../../Models/levels");
const calculateLevelExp = require("../../Utils/calculateLevelExp")


const dotenv = require("dotenv");
dotenv.config();


/**
 *
 * @param { Client } client
 * @param { Interaction } interaction
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName("level")
        .setDescription("顯示等級")
        .setDMPermission(false)
        .addUserOption(option =>
            option.setName("成員")
                .setDescription("選擇一個成員")
                .setRequired(true)
        ),

    async execute(interaction, client) {
        if (!interaction.inGuild()) {
            interaction.reply("妳只能在伺服器裡使用這指令");
            return;
        };

        await interaction.deferReply();

        const mentionedUserId = interaction.options.getUser("成員").id;
        const targetUserId = mentionedUserId || interaction.member.id;
        const targetUserObject = await interaction.guild.members.fetch(targetUserId);

        const fetchedLevel = await Level.findOne({
            UserId: targetUserId,
            GuildId: interaction.guild.id,
        });

        if (!fetchedLevel || fetchedLevel.Level === null) {
            embed = new EmbedBuilder().setColor(0xe60000).setDescription(mentionedUserId ? `${targetUserObject.user} 並沒有等級` : `妳並沒有等級`);
            return interaction.editReply({embeds: [embed], ephemeral: true});

        } else {



            let allLevels = await Level.find({ GuildId: interaction.guild.id }).select("-_id user level exp");

            allLevels.sort((a, b) => {
                if (a.Level === b.Level) {
                    return b.Exp - a.Exp;
                } else {
                    return b.Level - a.Level;
                }
            });

            let currentRank = allLevels.findIndex((lvl) => lvl.UserId === targetUserId) + 1;


            const rank = new canvacord.Rank()
                .setAvatar(targetUserObject.user.displayAvatarURL({ size: 256 }))
                .setRank(currentRank)
                .setLevel(fetchedLevel.Level || 0)
                .setCurrentXP(fetchedLevel.Exp)
                .setRequiredXP(calculateLevelExp(fetchedLevel.Level))
                .setProgressBar("0xF8B500", "COLOR")
                .setUsername(targetUserObject.user.username)


            const data = await rank.build();
            const attachment = new AttachmentBuilder(data);
            interaction.editReply({ files: [attachment] });
        }
    }
}

