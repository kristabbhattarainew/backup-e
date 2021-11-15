const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `vote`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
    let bancheck = db.get(`banned_${message.author.id}`)
    if(bancheck) {
            
      const banembed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username} [ Banned ]`, message.author.avatarURL())
      .setDescription(`*You are banned from using any Order Coins source commands!*
      **Reason:** ${bancheck}

      Request unban by using **o.unbanreq [reason]**
      `)
      .setColor("RED")
      .setTimestamp()
      
      return message.reply(banembed)
    }
    
    let points = db
    .all()
    .filter(data => data.ID.startsWith(`votesnew`))
 .sort((a, b) => b.data - a.data);
  points.length = 3;
  var finalLb = "";
  for (var i in points) {
    finalLb += `**${points.indexOf(points[i]) + 1}. ${
      client.users.cache.get(points[i].ID.split("_")[1])
        ? client.users.cache.get(points[i].ID.split("_")[1]).tag
        : `Unknown User` 
    }** - ${points[i].data} Votes\n`;
  }
    
    
    let author = await db.fetch(`votecdcd_${message.author.id}`)

    let timeout = 43200000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
      
  let time = ms(timeout - (Date.now() - author));
      
    const Embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription("**__top.gg__** \n`"+ time + " Remanining!` \n\n **__VOTING REWARDS__** \n5k Order Coins \n<:LuckyCoupon:866973938897387560> Lucky Coupon [ Get +10% luck while opening boxes for 5hrs] \n2 <:OrderBox:866972740173955073> Order Box  \n\n**__Top 3 Voters__** \n" + finalLb)
      .setColor("RED")
      .setTimestamp()
      .setFooter(`You can vote in every 12hours!`)
      .setThumbnail(client.user.avatarURL({ dynamic: true , format: `png` }))
      
     return message.channel.send(Embed)
      
      } else {
    
    // if(message.author.id !== "598524997954306048") return message.reply("This command is being developed! Please wait sometime until its finished.")
    
        const Embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription("__**top.gg**__ \n[`AVAILABLE NOW!`](https://top.gg/bot/762324132045914112/vote) \n\n **__VOTING REWARDS__** \n5k Order Coins \n<:LuckyCoupon:866973938897387560> Lucky Coupon [ Get +10% luck while opening boxes for 5hrs] \n2 <:OrderBox:866972740173955073> Order Box \n\n**__Top 3 Voters__** \n" + finalLb)
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(`You can vote in every 12hours!`)
      .setThumbnail(client.user.avatarURL({ dynamic: true , format: `png` }))
      
     return message.channel.send(Embed)
        
        
            //---------------------------Secret------------------
    
    let Number = Math.floor(Math.random() * 5);
    
    if(Number == "0") message.channel.send("Tips/Clues: I wonder what's in https://kristab.ml/botsecret ? I would definetly type server name to get some coins?").then(k => k.delete({ timeout : 20000 }))
    
    //---------------------------Secret------------------
        
        
        
      }
  }
};
