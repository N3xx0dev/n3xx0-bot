const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, Events, Collection, REST, Routes } = require('discord.js');
const fs = require("fs");
const path = require("path");
const config = require("./config.json");

// Crear nuevo cliente de Discord
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// Evento interactionCreate
client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand() || interaction.isSelectMenu()) {
        try {
            const execute = require(`./interactions/${interaction.customId}`);
            await execute(interaction);
        } catch (err) {
            console.log("[err] Interacción fallida.", err);
        }
    }
});

// juego

const DiscordRPC = require('discord-rpc');
const clientId = '1242535388900229162'; // Reemplaza con tu Client ID de la aplicación de Discord

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

async function setActivity() {
    if (!rpc) {
        return;
    }

    rpc.setActivity({
        state: 'N3xx0',
        details: 'En desarrollo',
        startTimestamp: new Date(), // Puedes ajustar el tiempo según tus necesidades
        endTimestamp: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 horas a partir de ahora
        largeImageKey: 'N3xx0',
        largeImageText: 'N3xx0',
        smallImageKey: 'Visual Studio Code',
        smallImageText: 'By N3xx0dev',
        partyId: 'ae488379-351d-4a4f-ad32-2b9b01c91657',
        partySize: 1,
        partyMax: 1,
        joinSecret: 'MTI4NzM0OjFpMmhuZToxMjMxMjM='
    });
}

rpc.on('ready', () => {
    console.log('Rich Presence está listo');
    setActivity();

    // Actualizar la actividad cada 15 segundos
    setInterval(() => {
        setActivity();
    }, 15 * 1000);
});

rpc.login({ clientId }).catch(console.error);

// Handler de eventos
fs.readdirSync("./events")
    .filter(filename => filename.endsWith(".js"))
    .forEach((filename) => {
        try {
            const listener = require(`./events/${filename}`);
            const eventName = path.basename(filename, ".js");
            client.on(eventName, listener.bind(null, client));
        } catch (err) {
            console.log("[err] Ha ocurrido un error al cargar un evento", err);
        }
    });

// Conectar cliente a nuestra aplicación de Discord
client.login(config.token);