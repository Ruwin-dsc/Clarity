const { readdirSync} = require('fs');
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const login = (client) => {
const Discord = require("discord.js")
const db = require("quick.db")
const cl = new db.table("Color")
const wait = require("timers/promises").setTimeout;
const { MessageButton , MessageActionRow } = require("discord.js")
const { Captcha } = require("discord.js-captcha");
client.config = require("../config.json")

client.cooldown = new Array();
client.interaction = {}
client.guildInvites = new Map();
client.queue = new Map();
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.slashcom= new Discord.Collection();
client.snipes = new Map()
client.inter = new Array()
client.superagent = require('superagent');


client.login(client.config.token)

client.on("ready", async() => {
    
    

    let color = client.config.color

    let join = new Discord.MessageEmbed()
    .setTitle(`je viens de démarrer`)
    .addFields({
        name: "Besoin d'aide?", value: `Rejoins le support`
    }, {
        name: "Version Du Bot :", value: `\`${client.config.version}\``

    })
    .setDescription(`[Support Clarity](https://discord.gg/XdTwAKwJh9)`)
    .setFooter({text:`Clarity ${client.config.version}`})
    .setColor(color)

    if (!client.users.cache.has(client.config.buyer)) return
    client.users.cache.find(u => u.id === client.config.buyer).send({embeds: [join]}).catch(e => { })
    


 
} )


















}


  

module.exports = {

    login
}