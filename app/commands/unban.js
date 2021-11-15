const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `unban`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
       if(message.author.id !== "598524997954306048") return;
 
    let User = message.mentions.users.first() || client.users.cache.get(args[0]);
  
    if(!User) return message.reply("Given User does not exist??")
    
    db.delete(`banned_${User.id}`)
   
    return message.reply(`Successfully unbanned ${User.username} from Order It Economy!`)
    
  }
};
