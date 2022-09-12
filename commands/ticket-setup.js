const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")

module.exports = {
    category: "ticket",
    slash: true,
    description: "setup ticket",
    guildOnly: true,
    testOnly: true,

    callback: ({interaction}) => {
        const btn = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("create")
            .setLabel("Ticket")
            .setEmoji("🎫")
            .setStyle("DANGER")
        )

        let embed = new MessageEmbed()
        .setTitle("🎫TICKET")
        .setDescription("Click to Create Ticket")
        .setColor("GREEN")

        interaction.reply({content: "created", ephemeral: true})
        interaction.channel.send({embeds: [embed], components: [btn]})
    }
}