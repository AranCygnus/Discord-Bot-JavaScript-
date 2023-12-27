const { Interaction } = require('discord.js');
const { EmbedBuilder } = require('discord.js');


const Vote = require("../../Models/votes");
const formatResults = require("../../Utils/formatResults")


/**
 *
 * @param { Interaction } interaction
 */



module.exports = {
    data: {
        name: `up-vote-button`,
    },
    async execute(interaction, client) {

        try {
            await interaction.deferReply({ ephemeral: true });

            const targetVote = await Vote.findOne({ GuildId: interaction.guild.id });
            const targetMessage = await interaction.channel.messages.fetch(targetVote.MessageId);
            const targetMessageEmbed = targetMessage.embeds[0];

            const hasVote = targetVote.UpVotes.includes(interaction.user.id) || targetVote.DownVotes.includes(interaction.user.id);

            if (hasVote) {
                const votedEmbed = new EmbedBuilder().setDescription(`❌ 妳已經投過票了`).setColor(0xe60000)
                await interaction.editReply({ embeds:[votedEmbed], ephemeral: true });
                return;
            }

            targetVote.UpVotes.push(interaction.user.id);

            await targetVote.save();

            const successfulEmbed = new EmbedBuilder().setDescription(`✔️ 投票成功`).setColor(0x228b22)
            await interaction.editReply({ embeds:[successfulEmbed], ephemeral: true });


            targetMessageEmbed.fields[0].value = formatResults(
                targetVote.UpVotes,
                targetVote.DownVotes,
            )

            targetMessage.edit({ embeds: [targetMessageEmbed] })


        } catch (error) {
            console.log(error);
        }

    }
}