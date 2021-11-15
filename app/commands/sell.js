const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const ItemShop = require("../shop-items.json") 

module.exports = {
  name: `sell`,
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
    
     //if(message.author.id !== "598524997954306048") return message.reply("This command is under redesign! Please wait sometime until its finished.")
    
    const authorbal = await client.economy.getBal(message.author.id)
    
 
    
    let item = args[0]
    if(!item) return message.reply("Please provide the sellable item id! \n`o.sell <item-id> <item-amount>`")
    let itemnum = args[1]
    if(!itemnum) return message.reply("Please provide the amount of how many you want to sell! \n`o.sell <item-id> <item-amount>`")
    if(isNaN(itemnum)) return message.reply("Given amount of item is invalid!")
    
    if(ItemShop[args[0]] && ItemShop[args[0]].sellable == 'True') {
  
      
      let ItemCode = ItemShop[args[0]].dbid
      
      if(!ItemCode) return message.reply("Please give the valid item id!")
      
       let Check = db.get(`${ItemCode}_${message.author.id}`)
    if(!Check || Check < 1 || Check == undefined) return message.reply(`You don't own this item? *Get that item first nerd*`)
      
      //----------------------COST-----------------------
      
      let totalnum = ms(itemnum)
      
      if(Check < totalnum) return message.reply(`You don't own that many ${ItemCode}!`)
      
      let ItemCost = ms(ItemShop[item].sell) * totalnum
      
      if(isNaN(ItemCost)) return message.reply("Money is invalid!")
      
    //  if(authorbal < ItemCost) return message.reply(`You dont have enough Order coins to buy this item!`)
      
      client.economy.addBal(message.author.id, ItemCost);
      
      db.subtract(`${ItemCode}_${message.author.id}`, totalnum)
      
      let Channel = client.channels.cache.get("853904913393647619")
    Channel.send(`${message.author.tag} successfully sold ${ItemShop[item].emoji} **${totalnum} ${ItemShop[item].name}** for **${ItemCost} Order Coins**.`)
      
      return message.reply(`You successfully sold ${ItemShop[item].emoji} **${totalnum} ${ItemShop[item].name}** for **${ItemCost} Order Coins**.`)
    }
    
    if(ItemShop[args[0]] && ItemShop[args[0]].sellable == 'False') { 
      return message.reply(`Given item is not sellable! View shop to get sellable item id.`)
    }
    
    return message.reply(`Given item is not in shop! View shop to get sellable item id.`)
    
    
  }
};
