const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `starttimer`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
       if(message.author.id !== "598524997954306048") return;
 
    let Check = db.get(`HalloweenTimer`)
    if(Check) return message.reply(`Timer is already set!`)
    
    db.set(`HalloweenTimer`, Date.now())
    
    return message.reply(`Started the halloween timer!`)
    
  }
};
