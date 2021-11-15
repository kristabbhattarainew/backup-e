const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const ItemShop = require("../shop-items.json");

module.exports = {
  name: `giveitem`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
    
      if(message.author.id !== "598524997954306048") return message.reply("This command is for Dev! ")
    
      //--------------------------------------------------GIVE-----------------------------
    
    
     if(!args[0]) return message.reply("Give the item amount.")
    if(isNaN(args[0])) return message.reply("Given item amount is invalid! ")
    if(args[0].includes("-")) return message.reply(`You can't give negative amount of item!`)
    let ItemAmount = ms(args[0]);
    
     let ITEM = args[1]
     if(!ITEM) return message.reply("Give the item id to give.")
    
    if(!ItemShop[ITEM]) return message.reply(`Given item does not exist!`)
    
     let item = ItemShop[ITEM]
     //if(item.tradeable == "False") return message.reply(`Given item is not tradeable!`)
    
    if(item) ITEM = item.dbid
        
      let User = message.mentions.users.first();
    if(!User) return message.reply("Mention someone to give item.")
     if(!args[1]) return message.reply("Mention someone to give item.")
    
    //if(User.bot) return message.reply(`Bruh you can't give item to bots idiot. *Don't try to waste the item. Try gifting ur friend?*`)
    
    db.add(`${ITEM}_${User.id}`, ItemAmount)
    
    message.reply(`You successfully gave **${item.emoji} ${ItemAmount} ${item.name}** to ${User.tag} !!`)
    
  }
};