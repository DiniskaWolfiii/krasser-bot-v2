const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const {token, testToken} = require('./botconfig.json');

const client = new Client({
    intents:
        [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_VOICE_STATES
        ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
}


const eventFiles = fs.readdirSync('./events').filter(file=>file.endsWith('.js'));

for(const file of eventFiles) {

    const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(Token)