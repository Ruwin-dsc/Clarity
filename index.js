const Discord = require("discord.js");
const client = new Discord.Client({
    fetchAllMembers: true,
     partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] ,
     intents: [
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
      ]
    })
   
    
    const { GiveawaysManager } = require('discord-giveaways');
    const manager = new GiveawaysManager(client, {
        default: {
            botsCanWin: false,
            reaction: '🎉'
        }
    });
    const discordModals = require('discord-modals');
    const ms = require("ms")
    const {readdirSync} = require("fs")
    const ascii = require("ascii-table");
let table = new ascii("Slash Commands");
let slash = []
    const {login } = require("./util/login.js");
    login(client)
    discordModals(client);
    const Enmap = require("enmap");
    const db = require("quick.db");
    client.db = db;
client.points = new Enmap({ name: "points" });
client.giveawaysManager = manager;
const guildInvites = new Map();


// load commands + events
    const lcom = (dir = "./commands/") => {
        readdirSync(dir).forEach(dirs => {
            const commands = readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith(".js"));

            for (const file of commands) {
                const getFName = require(`${dir}/${dirs}/${file}`);
                client.commands.set(getFName.name, getFName);
                console.log(`[>] [${dirs}] (${getFName.name})`)
            }
        })

    }

    const levt = (dir = "./events") => {
        readdirSync(dir).forEach(dirs => {
            const events = readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith(".js"));

            for (const event of events) {
                const evt = require(`${dir}/${dirs}/${event}`)
                const evtN = event.split(".")[0];
                client.on(evtN, evt.bind(null, client))
                console.log(`[>] [${dirs}] (${evtN})`)

            }
        })
    }



    console.log(table.toString());
    

    lcom();
    levt();

    

    require("./util/antiCrash")(client);
   




