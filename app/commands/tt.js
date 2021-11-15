const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const Rewards = require("../rank-reward.json")

module.exports = {
  name: `tt`,
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
    
    let author = await db.fetch(`ttcd_${message.author.id}`)

    let timeout = 120000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
      
  let time = ms(timeout - (Date.now() - author));
      
    const Embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription(`You need to wait **${time}** to go for Trick or treating again. 
      *rest a little bit before going for another house!*
      `)
      .setColor("RED")
      .setTimestamp()
      
     return message.channel.send(Embed)
      
      } else {
    
     if(message.author.id !== "598524997954306048") return message.reply("Event has ended!")
      
        let increase = "No"
       let roll =  Math.floor(Math.random() * 5);
        if(roll == "4") increase = "Yes"
        
        let msg = `You gone for Trick or treating and got 1 Halloween Candy <:HalloweenCandy:893812881261486112> !`
        if(roll == "4") msg = `You gone for Trick or treating but it was kristab house, he know you so he gave you 5 Halloween Candy <:HalloweenCandy:893812881261486112> !`
      
        const Embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}` , message.author.avatarURL({ dynamic: true, format: `png` }))
        .setDescription(`${msg}`)
        .setColor("GREEN")
        .setFooter(`Happy Halloween!`)
        
        message.channel.send(Embed);
        
        if(roll !== "4") db.add(`HalloweenCandy_${message.author.id}`, 1)
        if(roll == "4") db.add(`HalloweenCandy_${message.author.id}`, 5)
        
        let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(Embed)
        
        
            //---------------------------Secret------------------
    
    let Number = Math.floor(Math.random() * 5);
    
    if(Number == "0") message.channel.send("Tips: Exchange the candy for special react or order coins by using command `o.exchange candy [react/coins]`").then(k => k.delete({ timeout : 20000 }))
    
    //---------------------------Secret------------------
        
        db.add(`rankuppoints_${message.author.id}`, 1)
        db.add(`totalrankpoints_${message.author.id}`, 1)
        //----------------COOLDOWN----------------
        db.set(`ttcd_${message.author.id}`, Date.now())
        
      }
  }
};
