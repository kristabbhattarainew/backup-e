const { Message } = require(`discord.js`);
const Discord = require("discord.js");
const Client = require("../structures/Client");
const db = require("quick.db");
module.exports = {
  name: `bal`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  
  run: async (client, message, args) => {
    
    //---------------------------Secret------------------
    
    let Number = Math.floor(Math.random() * 5);
    
    if(Number == "0") message.channel.send("Tips/Clues: Visit: https://kristab.ml/botsecret and try to find the password by solving clues!").then(k => k.delete({ timeout : 20000 }))
    
    //---------------------------Secret------------------

    let USER_ID = args[0];
    if(!USER_ID) USER_ID = message.author.id
 
    let User = message.mentions.users.first();

    if(!User) User = client.users.cache.get(USER_ID);
  
    if(!User) return message.reply("Given User does not exist??")
    
    const coins = client.addCommas( await client.economy.getBal(User.id));
    let HalloweenCandy = db.get(`HalloweenCandy_${User.id}`)
    if(HalloweenCandy < 1 || HalloweenCandy == undefined) HalloweenCandy = 0

    const Embed = new Discord.MessageEmbed()
    .setAuthor(`${User.username}'s Wallet`, User.avatarURL({dynamic : true , format : `png`}))
    .setDescription(`**Wallet: <:order_coins:800022593184596028> ${coins} 
    Halloween Candy: <:HalloweenCandy:893812881261486112> ${HalloweenCandy} Halloween Candy
    **`)
    .setColor("GREEN")
    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({dynamic : true , format : `png`}))
    
    message.channel.send(Embed);
    
    let Channel = client.channels.cache.get("856026833735516180")
    return Channel.send(Embed)



  },
};
