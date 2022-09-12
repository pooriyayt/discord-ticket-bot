const Discord = require("discord.js")
const wokcommands = require("wokcommands")
const { join } = require("path")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
        console.log("run shod")

    new wokcommands(client, {
        commandsDir: join(__dirname, '../commands'),

        testServers: ["1018448194230829056"]
    })
	},
};