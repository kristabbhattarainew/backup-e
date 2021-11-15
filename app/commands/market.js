const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const ItemShop = require("../shop-items.json");

module.exports = {
  name: `market`,
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
    
    let LogCh = client.channels.cache.get("894552106877485056")
    if(!LogCh) return message.reply(`Error occurred while finding for log channel! [Error Code: 110]`)
    
 //  if(message.author.id !== "598524997954306048") return message.reply("This command is under development! Please wait sometime until its finished.")
    
     if (!args[0]) return message.channel.send("Public Market Commands: \n`o.market sell [item-amount] [item-id] [price]` \n`o.market buy [item-id][seller-id]`\n`o.market remove [item-id]` \n`o.market shop [item-id]`")

  if (args[0].toLowerCase() == "sell") {
    
    let icheck = db.get(`ItemID_${message.author.id}`)
    if(icheck) return message.reply("You already have item on sell in Public Market! Check the item by doing `o.market myitem`")

    let ITEMAmount = args[1]
    if (!ITEMAmount) return message.reply("Please give the amount of item to sell in market!")
    if (isNaN(ITEMAmount)) return message.reply("Given item amount is not a number!")
    if (ITEMAmount.includes("-")) return message.reply("Given item amount is invalid!")

    let ITEM = args[2]
    if (!ITEM) return message.reply("Please give the item id to sell in market!")
    
    if(!ItemShop[ITEM]) return message.reply(`Given item does not exist!`)
    
    if(ItemShop[ITEM].tradeable == "False") return message.reply("Given item cant be sold in Public Market!")
    let DBID;
      if(ItemShop[ITEM].tradeable == "True") DBID = ItemShop[ITEM].dbid
      if(!DBID) return message.reply(`Error occurred while taking item DataBase Id! [Error Code: 105]`)
    
    let Check = db.get(`${DBID}_${message.author.id}`)
    if(!Check || Check < 1 || Check == undefined) return message.reply(`You don't own this item?`)
    
     if(Check < ITEMAmount) return message.reply(`You don't own that many ${ITEM} to sell!`)
    
    if(ItemShop[ITEM] && ItemShop[ITEM].tradeable == 'True') {

    let ITEMPrice = args[3]
    if (!ITEMPrice) return message.reply("Please give the price for item to sell in market!")
    if (isNaN(ITEMPrice)) return message.reply("Given item price is not a number!")
    if (ITEMPrice.includes("-")) return message.reply("Given item price is invalid!")
    if (ITEMPrice) ITEMPrice = ms(ITEMPrice)
      
      
      
      //----------Taking---------------
      
      db.subtract(`${DBID}_${message.author.id}`, ITEMAmount)
      
      //----------------------------

    db.set(`ItemID_${message.author.id}`, ITEM)
    db.set(`ItemAmount_${message.author.id}`, ITEMAmount)
    db.set(`ItemPrice_${message.author.id}`, ITEMPrice)
    db.set(`PriceItem-${ITEM}_${message.author.id}`, ITEMPrice)
      
      LogCh.send(`__${message.author} | ${message.author.id} successfully added below item for sell in Public Market!__
**Item ID:** ${ITEM}
**Item Amount:** x${ITEMAmount}
**Item Price:** ${ITEMPrice} Order Coins
`)

    return message.channel.send(`__You successfully added below item for sell in Public Market!__
**Item ID:** ${ITEM}
**Item Amount:** x${ITEMAmount}
**Item Price:** ${ITEMPrice} Order Coins
`)
    }
    else {
      return message.reply("Given item is not sellable!")
    }

  }

  if (args[0].toLowerCase() == "buy") {

    let ITEM = args[1]
    if(!ITEM) return message.reply("Please give the item-id to buy!")
    
    let SellerId = args[2]
    if(!SellerId) return message.reply(`Please give the item seller id!`)
    
    if(SellerId == message.author.id) return message.reply(`You cant buy your own item from Public Market!`)
    
    let check = db.get(`ItemID_${SellerId}`)
    if(!check) return message.reply("Given seller dont have any item on sell in Public Market!")

    if(check !== ITEM) return message.reply(`Given item is not selling by the given seller in Public Market!`)

    let itemid = db.get(`ItemID_${SellerId}`)
    let itemamount =  db.get(`ItemAmount_${SellerId}`)
    let itemprice = db.get(`ItemPrice_${SellerId}`)
    
    const Bal = client.economy.getBal(message.author.id)
    
    if(Bal < itemprice) return message.reply(`You dont have enough Order Coins to buy that item!`)
    
    client.economy.addBal(message.author.id, -itemprice);
    client.economy.addBal(SellerId, itemprice);
    
     let DBID;
      if(ItemShop[ITEM].tradeable == "True") DBID = ItemShop[ITEM].dbid
      if(!DBID) return message.reply(`Error occurred while taking item DataBase Id! [Error Code: 105]`)
      
      //----------Giving---------------
      
      db.add(`${DBID}_${message.author.id}`, itemamount)
      
      //----------------------------
    
    db.delete(`ItemID_${SellerId}`)
    db.delete(`ItemAmount_${SellerId}`)
    db.delete(`ItemPrice_${SellerId}`)
    db.delete(`PriceItem-${ITEM}_${SellerId}`)
    
    let Seller = client.users.cache.get(SellerId)
    if(Seller) Seller.send(`__You successfully sold below item in Public Market!__
**Item ID:** ${itemid}
**Item Amount:** x${itemamount}
**Item Price:** ${itemprice} Order Coins
**Buyer:** ${message.author} | ${message.author.id}
`)
    
    LogCh.send(`__${message.author} | ${message.author.id} successfully bought below item from Public Market!__
**Item ID:** ${itemid}
**Item Amount:** x${itemamount}
**Item Price:** ${itemprice} Order Coins
**Seller:** ${SellerId}
`)
    
    return message.channel.send(`__You successfully bought below item from Public Market!__
**Item ID:** ${itemid}
**Item Amount:** x${itemamount}
**Item Price:** ${itemprice} Order Coins
**Seller:** ${SellerId}
`)
    
  }
    
    
  if (args[0].toLowerCase() == "myitem") {

    let check = db.get(`ItemID_${message.author.id}`)
    if(!check) return message.reply("You dont have any item on sell in Public Market!")

    let itemid = db.get(`ItemID_${message.author.id}`)
    let itemamount =  db.get(`ItemAmount_${message.author.id}`)
    let itemprice = db.get(`ItemPrice_${message.author.id}`)
    
    LogCh.send(`__${message.author} | ${message.author.id} have below item on sell in Public Market!__
**Item ID:** ${itemid}
**Item Amount:** x${itemamount}
**Item Price:** ${itemprice} Order Coins
`)

    return message.channel.send(`__You have below item on sell in Public Market!__
**Item ID:** ${itemid}
**Item Amount:** x${itemamount}
**Item Price:** ${itemprice} Order Coins
`)

  }


  if (args[0].toLowerCase() == "remove") {

    let check = db.get(`ItemID_${message.author.id}`)
    if(!check) return message.reply("You dont have any item on sell in Public Market!")

    let ITEM = args[1]
    if (!ITEM) return message.reply("Please give the item id to remove from market!")

    if(check !== ITEM) return message.reply(`Given item is not in Public Market!`)

    let itemid = db.get(`ItemID_${message.author.id}`)
    let itemamount =  db.get(`ItemAmount_${message.author.id}`)
    let itemprice = db.get(`ItemPrice_${message.author.id}`)

    db.delete(`ItemID_${message.author.id}`)
    db.delete(`ItemAmount_${message.author.id}`)
    db.delete(`ItemPrice_${message.author.id}`)
    db.delete(`PriceItem-${ITEM}_${message.author.id}`)
    
    let DBID;
      if(ItemShop[ITEM].tradeable == "True") DBID = ItemShop[ITEM].dbid
      if(!DBID) return message.reply(`Error occurred while taking item DataBase Id! [Error Code: 105]`)
      
      //----------Giving---------------
      
      db.add(`${DBID}_${message.author.id}`, itemamount)
      
      //----------------------------
    
    LogCh.send(`__${message.author} | ${message.author.id} removed below item from Public Market!__
**Item ID:** ${itemid}
**Item Amount:** x${itemamount}
**Item Price:** ${itemprice} Order Coins
`)

    return message.channel.send(`__You removed below item from Public Market!__
**Item ID:** ${itemid}
**Item Amount:** x${itemamount}
**Item Price:** ${itemprice} Order Coins
`)

  }


  if (args[0].toLowerCase() == "shop") {

if(!args[1]) {

let lowtohigh = db
      .all()
      .filter(data => data.ID.startsWith(`ItemPrice`))
      .sort((a, b) => a.data - b.data);
    lowtohigh.length = 5;
    var finalLb = "";
    for (var i in lowtohigh) {
      finalLb += `Item ID - ${client.Itemid(lowtohigh[i].ID.split("_")[1])} 
Item Amount - ${client.Itemamount(lowtohigh[i].ID.split("_")[1])} 
Seller ID -  **${ lowtohigh[i].ID.split("_")[1]}** 
Price - ${client.addCommas( lowtohigh[i].data )} Order Coins\n\n`;
    }


let hightolow = db
      .all()
      .filter(data => data.ID.startsWith(`ItemPrice`))
      .sort((a, b) => b.data - a.data);
    hightolow.length = 5;
    var finalLb1 = "";
    for (var i in hightolow) {
      finalLb1 += `Item ID - ${client.Itemid(hightolow[i].ID.split("_")[1])} 
Item Amount - ${client.Itemamount(hightolow[i].ID.split("_")[1])} 
Seller ID -  **${ hightolow[i].ID.split("_")[1]}** 
Price - ${client.addCommas( hightolow[i].data )} Order Coins\n\n`;
    }


    const embed = new Discord.MessageEmbed()
    .setTitle(`Public MarketPlace`)
    .setDescription(`**__Low To High Available Items__ [5]** \n${finalLb} \n**__High To Low Available Items__ [5]** \n${finalLb1} Filter item by doing `+ "`o.market shop [item-id]`")
    .setFooter(`Buy for the best price!`)
    .setColor("BLUE")
    
    let Channel = client.channels.cache.get("856026833735516180");
     Channel.send(embed);

    return message.channel.send(embed)

}

if(args[0] == "shop" && args[1]){

let lowtohigh = db
      .all()
      .filter(data => data.ID.startsWith(`PriceItem-${args[1]}_`))
      .sort((a, b) => a.data - b.data);
    lowtohigh.length = 10;
    var finalLb = "";
    for (var i in lowtohigh) {
      finalLb += `Item Amount - ${client.Itemamount(lowtohigh[i].ID.split("_")[1])} 
Seller ID -  **${ lowtohigh[i].ID.split("_")[1]}** 
Price - ${client.addCommas( lowtohigh[i].data )} Order Coins\n\n`;
    }


  let hightolow = db
      .all()
      .filter(data => data.ID.startsWith(`PriceItem-${args[1]}_`))
      .sort((a, b) => b.data - a.data);
    hightolow.length = 10;
    var finalLb1 = "";
    for (var i in hightolow) {
      finalLb1 += `Item Amount - ${client.Itemamount(hightolow[i].ID.split("_")[1])} 
Seller ID -  **${ hightolow[i].ID.split("_")[1]}** 
Price - ${client.addCommas( hightolow[i].data )} Order Coins\n\n`;
    }


     if(!finalLb1) return message.reply(`No one is selling the given item!`)
  
  let itememoji = ItemShop[args[1]].emoji

    const embed = new Discord.MessageEmbed()
    .setTitle(`Public MarketPlace`)
    .setDescription("Filtered Item: `" + args[1] + "` [" + itememoji + `]\n\n**__Low To High Sellers__** \n${finalLb1} \n**__High To Low Sellers__** \n${finalLb1}`)
    .setFooter(`Buy for the best price!`)
    .setColor("BLUE")
    
    let Channel = client.channels.cache.get("856026833735516180");
    Channel.send(embed);

    return message.channel.send(embed)

}



  }


  return message.channel.send("Public Market Commands: \n`o.market sell [item-amount] [item-id] [price]` \n`o.market buy [item-id][seller-id]`\n`o.market remove [item-id]` \n`o.market shop [item-id]`")
    
  }
};
