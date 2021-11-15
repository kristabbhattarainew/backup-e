const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `addrank`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
       if(message.author.id !== "598524997954306048") return;
 
    let User = message.mentions.users.first() || client.users.cache.get(args[0]);
  
    if(!User) return message.reply("Given User does not exist??")
  
    
    db.add(`rank_${User.id}` , 1)
    
    let Get = db.get(`rank_${User.id}`)
    
    return message.reply(`Successfully added +1 rank to ${User.username}. [Rank : ${Get}]`)
    
  }
};
