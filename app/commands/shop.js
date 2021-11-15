const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const Item = require("../shop-items.json") 

module.exports = {
  name: `shop`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
    let Ccheck = db.get(`Coupon_${message.author.id}`)
    if(Ccheck == "True") {
          //----------------Coupon Timer----------------
    
    let author1 = await db.fetch(`CouponTimer_${message.author.id}`)
  
    let timeout1 = 18000000;
    
    let time1;
    
    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) time1 = ms(timeout1 - (Date.now() - author1));
    
    if(time1 == undefined) db.delete(`Coupon_${message.author.id}`)
    
    //----------------Coupon Timer----------------
    }
    
    
    let Hcheck = db.get(`HalloweenTimer`)
 
          //----------------halloween Timer----------------
    
    let author2 = await db.fetch(`HalloweenTimer`)
  
    let timeout2 = 2534400000;
    
    let time2;
    
    if (author2 !== null && timeout2 - (Date.now() - author2) > 0) time2 = ms(timeout2 - (Date.now() - author2));
    
    if(time2 == undefined) time2 = "Event Ended"
    
    //----------------halloween Timer----------------
    

    
    
   
     let Code = args[0]
  
   //if(Item[Code]) message.reply("True!")
  // if(!item[Code]) message.reply("False!")
  let T = "`"
  
if(Item[Code]) {
  
  let item = Item[Code]
      
      let Amount = db.get(`${item.dbid}_${message.author.id}`)
      
      if(Code == "luckycoupon" && Amount == "True") Amount = "1" 
      if(!Amount || Amount == undefined) Amount = "None"
  
      
      const embed = new Discord.MessageEmbed()
      .setTitle(item.name)
      .setDescription(`
      **You Owned:** ${T+Amount+T}
      **Item ID:** ${item.id}
      
      **Item Description:** ${item.description}
      `)
      .addField(`__Market Place__`, `**BUY:** ${item.buy} \n**SELL:** ${item.sell} \n**TRADE:** ${item.trade}`)
      .addField(`__${item.inside}__`, `${item.insideItems}`)
      .setFooter(`Item Category: ${item.category}`)
      .setThumbnail(`${item.icon}`)
      .setColor(`${item.color}`);
      
      return message.channel.send(embed)
}
    
    const Embed = new Discord.MessageEmbed()
    .setTitle("Order It Economy Shop")
    .setDescription("Use `o.buy <item-id> <item-amount>`")
    .addField("<:CommonBox:868748504225431582> Common Box [` ID: commonbox `] - 1,000 Order Coins", `Contains Upto 500 Order coins, Cookie & Order Trophy.`)
    .addField("<:UncommonBox:882270428540846121> Uncommon Box [` ID: uncommonbox `] - 5,000 Order Coins", `Contains Upto 2500 Order coins & Order Medal.`)
    
    .setColor("YELLOW");
    
    return message.channel.send(Embed)
   
  }
};
