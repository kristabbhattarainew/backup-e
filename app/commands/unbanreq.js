const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `unbanreq`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
       let bancheck = db.get(`banned_${message.author.id}`)
    if(!bancheck) {
      return message.reply(`You are not banned to request unban!`)
    }
    
    let reason = args.slice(0).join(" ");
    if(!reason) return message.reply("Please give reason for unban request!")
   
    let Channel = client.channels.cache.get("855459124552007690")
    if(!Channel) return message.reply("Error: Failed to send your request!")
    message.reply("Requested successfully!")
    return Channel.send(`Requestor: ${message.author} [ ${message.author.id}]
    Request: ${reason}`)
    
  }
};
