const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `ban`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
       if(message.author.id !== "598524997954306048") return;
 
    let User = message.mentions.users.first() || client.users.cache.get(args[0]);
  
    if(!User) return message.reply("Given User does not exist??")
    
    let reason = args.slice(1).join(" ");
    if(!reason) return message.reply("Please give reason to ban!")
    
    db.set(`banned_${User.id}`, reason)
    
    const banembed = new Discord.MessageEmbed()
      .setAuthor(`${User.username} [ Banned ]`, User.avatarURL())
      .setDescription(`*${User.username} is banned from using any Order Coins source commands!*
      **Reason:** ${reason}

      Request unban by using **o.unbanreq [reson]**
      `)
      .setColor("RED")
      .setTimestamp()
      
      return message.reply(banembed)
   
   // return message.reply(`Successfully banned ${User.username} from Order It Economy for ${reason}!`)
    
  }
};
