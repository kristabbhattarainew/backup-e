const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `redeem`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
    message.delete()
    
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
    
  //  if(message.author.id !== "598524997954306048") return message.reply("No code is valid rn!")
    
    let Check1 = db.get(`RulesAccepted_${message.author.id}`)
    if(Check1 !== "True") return message.reply("You have to first accept rules to redeem codes! Do `o.rules` to accept.")
    
   // let Check = db.get(`redeemcode_${message.author.id}`)
    let Check = db.get(`GlobalRedeemCode`)
    if(Check) return message.reply("Someone have already redeemed this code?")
    
   if(!args[0]) return message.reply("Give the code to redeem kid. *LOL*")

    const code = 'Detective' // code


    if (args[0] === code ) {
      
         //if(message.author.id !== "598524997954306048") return message.reply("The given code is expired!!")

      db.add(`Detective_${message.author.id}`, 1)

      
     // db.set(`redeemcode_${message.author.id}`, "halloweenfirstcode")
     db.set(`GlobalRedeemCode`, message.author.id)

      message.channel.send(`Successfully redeemed special code by ${message.author.tag}`);
      
      let Channel = client.channels.cache.get("856026833735516180")
    return Channel.send(`<@598524997954306048> , Successfully redeemed special code [ detective ] by ${message.author.tag}`)
    }

    message.reply('Given code is invalid!');
        
         
      
  },
  timeout: 10000,
};
