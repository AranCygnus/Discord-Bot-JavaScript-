const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");

const { Guilds, GuildMembers, GuildMessages, MessageContent, GuildPresences, GuildVoiceStates } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember, Channel } = Partials

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");
const { loadComponents } = require("./Handlers/componentHandler");

const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildPresences, GuildVoiceStates],
    partials: [User, Message, GuildMember, ThreadMember, Channel],
});

client.commands = new Collection();
client.buttons = new Collection();
client.stringSelectMenus = new Collection();
client.modals = new Collection();

client.distube = new DisTube(client, {
    searchSongs: 5,
    searchCooldown: 60,
    leaveOnEmpty: false,
    leaveOnFinish: true,
    leaveOnStop: true,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ]
});



module.exports = client;

client.login(process.env.TOKEN).then(() => {
    loadEvents(client);
    loadCommands(client);
    loadComponents(client);
});
