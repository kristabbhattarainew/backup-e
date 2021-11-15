const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const ItemShop = require("../shop-items.json");

module.exports = {
  name: `gift`,
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
    
    //-------------------S T A R T-----------------------
      
    //if(message.author.id !== "598524997954306048") return message.reply("Gifting system is in maintenance")
    
    
    if(!args[0]) return message.reply("Give the item amount. \n `o.gift <amount> <itemid> <@mention>`")
    if(isNaN(args[0])) return message.reply("Given item amount is invalid! \n `o.gift <amount> <itemid> <@mention>`")
    if(args[0].includes("-")) return message.reply(`You can't give negative amount of item!`)
    let ItemAmount = ms(args[0]);
    
     let ITEM = args[1]
     if(!ITEM) return message.reply("Give the item id to gift. \n `o.gift <amount> <itemid> <@mention>`")
    
    if(!ItemShop[ITEM]) return message.reply(`Given item does not exist!`)
    
     let item = ItemShop[ITEM]
     if(item.tradeable == "False") return message.reply(`Given item is not tradeable!`)
    
    if(item.tradeable == "True") ITEM = item.dbid
    // if(ITEM == "Coupon") return message.reply(`You can't give your coupon to other! *Say them to vote me to get it :)*`)
    // if(ITEM == "rareordercoin") ITEM = "RareOrderCoins";
    // if(ITEM == "orderbox") ITEM = "OrderBoxes";
    // if(ITEM == "commonbox") ITEM = "CommonBoxes"
    // if(ITEM == "cookie") ITEM = "Cookie"
    // if(ITEM == "ordertrophy") ITEM = "OrderTrophy"
    
    let Check = db.get(`${ITEM}_${message.author.id}`)
    if(!Check || Check < 1 || Check == undefined) return message.reply(`You don't own this item? *Get that item first nerd*`)
    
    if(Check < ItemAmount) return message.reply(`You don't own that many ${args[1]}!`)
        
      let User = message.mentions.users.first();
    if(!User) return message.reply("Mention someone to gift item. \n `o.gift <amount> <itemid> <@mention>`")
     if(!args[1]) return message.reply("Mention someone to gift item. \n `o.gift <amount> <itemid> <@mention>`")
    
    if(message.author.id == User.id) return message.reply(`Bruh you can't give item to urself nerd. *Try gifting ur friend?*`)
    if(User.bot) return message.reply(`Bruh you can't give item to bots idiot. *Don't try to waste the item. Try gifting ur friend?*`)
     
  
   db.subtract(`${ITEM}_${message.author.id}`, ItemAmount)
    
    db.add(`${ITEM}_${User.id}`, ItemAmount)
    
    message.reply(`You successfully gifted **${item.emoji} ${ItemAmount} ${item.name}** to ${User.tag} !!`)
    
    client.channels.cache.get("853904913393647619").send(`**${message.author.tag}** successfully gifted ${item.emoji} ${ItemAmount} ${item.name} to **${User.tag}** !!`)
        
    
    //-------------------E N D---------------------------
  }
};
