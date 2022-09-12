const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {
        const btn = interaction.customId
        if(btn === "create") {
            interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                parent: config.category,
                topic: interaction.user.id,
                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                  },
                  {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                  },
                ],
                type: 'text',
              }).then(async c => {
                interaction.reply({
                  content: `Ticket has ben created! <#${c.id}>`,
                  ephemeral: true
                });

              
              

                let openEmbed = new Discord.MessageEmbed()
                .setTitle("please say your question")
                .setDescription(`<@${interaction.user.id}> wait for respond`)
                .setColor("GREEN")

                const close = new Discord.MessageActionRow().addComponents(
                  new Discord.MessageButton()
                  .setCustomId("close")
                  .setStyle("DANGER")
                  .setEmoji("❌")
                  .setLabel("close")
                )

                c.send({content: `<@${config.teamId}> please help <@${interaction.user.id}>`, embeds: [openEmbed], components: [close]})
                
              })

            }
              if(btn === "close") {

                const sure = new Discord.MessageEmbed()
                .setDescription("Are you sure to close this Ticket?")
      
                const sureBtn = new Discord.MessageActionRow().addComponents(
                  new Discord.MessageButton()
                  .setLabel("Yes")
                  .setCustomId("Yes")
                  .setStyle("SUCCESS")
                )

      
                interaction.reply({embeds: [sure], components: [sureBtn], ephemeral: true})
              }

              if(btn === "Yes") {

                let closedEmbed = new Discord.MessageEmbed()
                .setDescription("please select")
                .setTitle("Admin Panel")
                .setColor("RED")

                let closeBtns = new Discord.MessageActionRow().addComponents(
                  
                  new Discord.MessageButton()
                  .setCustomId("delete")
                  .setLabel("Delete")
                  .setStyle("DANGER")

                )
                

                const guild = client.guilds.cache.get(interaction.guildId);
                const ch = guild.channels.cache.get(interaction.channelId);

                  interaction.reply({embeds: [closedEmbed], components: [closeBtns]})

                  ch.edit({
                    name: `closed-Ticket`,
                    permissionOverwrites: [
                      {
                        id: interaction.user.id,
                        deny: ["VIEW_CHANNEL"],
                      }, {
                        id: interaction.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                      }
                    ]
                  })
               
              }

              if(btn === 'delete') {
                const guild = client.guilds.cache.get(interaction.guildId);
                const ch = guild.channels.cache.get(interaction.channelId);

                interaction.reply({content: "This shannel deleting sfter 5s"}) 
                setTimeout(() => {
                  ch.delete();
                }, 5000)
              }

    }
}