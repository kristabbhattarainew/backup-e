const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const ItemShop = require("../shop-items.json") 

module.exports = {
  name: `buy`,
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
    
              //----------------halloween Timer----------------
    
    let author2 = await db.fetch(`HalloweenTimer`)
  
    let timeout2 = 2534400000;
    
    let time2;
    
    if (author2 !== null && timeout2 - (Date.now() - author2) > 0) time2 = ms(timeout2 - (Date.now() - author2));
    
    if(time2 == undefined) time2 = "Event Ended"
    
    //----------------halloween Timer----------------
    
    // if(message.author.id !== "598524997954306048") return message.reply("This command is under redesign! Please wait sometime until its finished.")
    
    const authorbal = await client.economy.getBal(message.author.id)
    
   // let Items = ["commonbox", "uncommonbox"]
    
    let item = args[0]
    if(!item) return message.reply("Please provide the buyable item id! \n`o.buy <item-id> <item-amount>`")
    let itemnum = args[1]
    if(!itemnum) return message.reply("Please provide the amount of how many you want to buy! \n`o.buy <item-id> <item-amount>`")
    if(isNaN(itemnum)) return message.reply("Given amount of item is invalid!")
    
    if(item == "halloweenbox" && time2 == "Event Ended") return message.reply("This item is no longer available to buy! This item gone limited now...")
    
    if(ItemShop[args[0]] && ItemShop[args[0]].buyable == 'True') {
      
//       let ItemCode = ""
      
//       if(item == ItemShop[item].id) ItemCode = ItemShop[args[0]].dbid
//       //if(item == "commonbox") ItemCode = "CommonBoxes"
      
      let ItemCode = ItemShop[args[0]].dbid
      
      if(!ItemCode) return message.reply("Please give the valid item id!")
      
      //----------------------COST-----------------------
      
      let totalnum = ms(itemnum)
      
      let ItemCost = ms(ItemShop[item].buy) * totalnum
      
      if(isNaN(ItemCost)) return message.reply("Money is invalid!")
      
      if(authorbal < ItemCost) return message.reply(`You dont have enough Order coins to buy this item!`)
      
      client.economy.addBal(message.author.id, -ItemCost);
      
      db.add(`${ItemCode}_${message.author.id}`, totalnum)
      
      let Channel = client.channels.cache.get("853904913393647619")
    Channel.send(`${message.author.tag} successfully bought ${ItemShop[item].emoji} **${totalnum} ${ItemShop[item].name}** for **${ItemCost} Order Coins**.`)
      
      return message.reply(`You successfully bought ${ItemShop[item].emoji} **${totalnum} ${ItemShop[item].name}** for **${ItemCost} Order Coins**.`)
    }
    
    if(ItemShop[args[0]] && ItemShop[args[0]].buyable == 'False') { 
      return message.reply(`Given item is not buyable! View shop to get buyable item id.`)
    }
    
    return message.reply(`Given item is not in shop! View shop to get buyable item id.`)
    
    
  }
};
