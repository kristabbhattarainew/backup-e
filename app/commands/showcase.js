const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const ItemShop = require("../shop-items.json");

module.exports = {
  name: `showcase`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
      
 
    if(args[0] && args[0].toLowerCase() == "add") {
    
    let ITEM = args[1]
    if(!ITEM) return message.reply("Please give the item id from your inventory to showcase!")
      
    
     let item = ItemShop[ITEM] 
     if(!item) return message.reply(`Given item does not exist!`)
      
    if(item) ITEM = item.dbid
    
    let Check = db.get(`${ITEM}_${message.author.id}`)
    if(Check >= 1) {
      
      db.set(`ShowcaseItem_${message.author.id}`, `${args[1]}`)
      
      return message.reply(`Successfully added ${ITEM} [${item.id}] to your showcase!`)
    }
      return message.reply(`You dont have given item in your inventory or item does not exist!`)
    }
    
    if(args[0] && args[0].toLowerCase() == "remove") {
      
      let Get = db.get(`ShowcaseItem_${message.author.id}`)
      if(!Get) return message.reply(`You havent added any item in your showcase yet!`)
    
      db.delete(`ShowcaseItem_${message.author.id}`)
      
      return message.reply(`Successfully removed ${Get} to your showcase!`)
    }
    
    return message.reply("Invalid Command! \n__Try:__\n`o.showcase add [item-id]`\n`o.showcase remove`")
    
  }
};
