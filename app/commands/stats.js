const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const ItemShop = require("../shop-items.json");

module.exports = {
  name: `stats`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
    //-------------------S T A R T-----------------------
    
    let USER_ID = args[0];
    if(!USER_ID) USER_ID = message.author.id
 
    let User = message.mentions.users.first();

    if(!User) User = client.users.cache.get(USER_ID);
  
    if(!User) return message.reply("Given User does not exist??")
    
    
      let author = await db.fetch(`begcd_${User.id}`)
  
    let timeout = 30000;
    
    let time;
    
    if (author !== null && timeout - (Date.now() - author) > 0) time = ms(timeout - (Date.now() - author));
    
    //-----------------------------------------------------------------------
    
    let author1 = await db.fetch(`fishingcd_${User.id}`)
  
    let timeout1 = 45000;
    
    let time1;
    
    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) time1 = ms(timeout1 - (Date.now() - author1));
    
    //-----------------------------------------------------------------------
    
    let author2 = await db.fetch(`scoutcd_${User.id}`)
  
    let timeout2 = 60000;
    
    let time2;
    
    if (author2 !== null && timeout2 - (Date.now() - author2) > 0) time2 = ms(timeout2 - (Date.now() - author2));
    
    let authorrps = await db.fetch(`rpscd_${User.id}`)
  
    let timeoutrps = 60000;
    
    let timerps;
    
    if (authorrps !== null && timeoutrps - (Date.now() - authorrps) > 0) timerps = ms(timeoutrps - (Date.now() - authorrps));
    
    //-----------------------------------------------------------------------
    
    let author23 = await db.fetch(`huntcd_${User.id}`)
  
    let timeout23 = 120000;
    
    let time23;
    
    if (author23 !== null && timeout23 - (Date.now() - author23) > 0) time23 = ms(timeout23 - (Date.now() - author23));
    
    
    //-----------------------------------------------------------------------
    
    let author234 = await db.fetch(`workcd_${User.id}`)
  
    let timeout234 = 3600000;
    
    let time234;
    
    if (author234 !== null && timeout234 - (Date.now() - author234) > 0) time234 = ms(timeout234 - (Date.now() - author234));
    
    
    //-----------------------------------------------------------------------
    
    let author2345 = await db.fetch(`dailycd_${User.id}`)
  
    let timeout2345 = 86400000;
    
    let time2345;
    
    if (author2345 !== null && timeout2345 - (Date.now() - author2345) > 0) time2345 = ms(timeout2345 - (Date.now() - author2345));
    
    
  
   
    
    //-----------------------------------------------------------------------
    
    let author23456 = await db.fetch(`minecd_${User.id}`)
  
    let timeout23456 = 120000;
    
    let time23456;
    
    if (author23456 !== null && timeout23456 - (Date.now() - author23456) > 0) time23456 = ms(timeout23456 - (Date.now() - author23456));
    
    
  
    //-----------------------------------------------------------------------
    
    
     let authorvote = await db.fetch(`votecdcd_${User.id}`)

    let timeoutvote = 43200000;
    
    let timevote;
    
    if (authorvote !== null && timeoutvote - (Date.now() - authorvote) > 0) timevote = ms(timeoutvote - (Date.now() - authorvote));
    
    
    //-----------------------------------------------------------------------
    
    
     let authortt = await db.fetch(`ttcd_${User.id}`)

    let timeouttt = 120000;
    
    let timett;
    
    if (authortt !== null && timeouttt - (Date.now() - authortt) > 0) timett = ms(timeouttt - (Date.now() - authortt));
    
    
    
    
    if(time == undefined) time = "No running cooldown"  
    if(time1 == undefined) time1 = "No running cooldown"
    if(time2 == undefined) time2 = "No running cooldown"  
    if(time23 == undefined) time23 = "No running cooldown"
    if(time234 == undefined) time234 = "No running cooldown"
    if(time2345 == undefined) time2345 = "No running cooldown"
    if(time23456 == undefined) time23456 = "No running cooldown"
    if(timerps == undefined) timerps = "No running cooldown"
    if(timevote == undefined) timevote = "No running cooldown"
    if(timett == undefined) timett = "No running cooldown"
    
      
   
  let equiped = db.get(`equip_${User.id}`)
  
      let equipedx2 = "Multi: None"
    if(equiped == "x2") equipedx2= "Multi: x2"
    
    let equipedless10 = "Cooldown: Normal"
    if(equiped == "PepeNoTime") equipedless10 = "Cooldown: -10sec"

    
    //--------------------------------------------------------Rank system---------------------------
    
 let Checkrp = db.get(`rankuppoints_${User.id}`)
 let Checktotalrp = db.get(`totalrankpoints_${User.id}`)
 let Rank = db.get(`rank_${User.id}`)
    
 
 if(Checkrp == null) Checkrp = "0"
 if(Checktotalrp == null) Checktotalrp = "0"
 if(Rank == null) Rank = "0"
    
      let rank1 = 500
      let rank2 = 1000
      let rank3 = 1500
      let rank4 = 2000
      let rank5 = 2500
      let rank6 = 3000
      let rank7 = 3500
      let rank8 = 4000
      let rank9 = 4500
      let rank10 = 5000
      
      let reqrp = 99999
      if(Rank == undefined || Rank == null || Rank == 0) reqrp = rank1
      if(Rank == 1) reqrp = rank2
      if(Rank == 2) reqrp = rank3
      if(Rank == 3) reqrp = rank4
      if(Rank == 4) reqrp = rank5
      if(Rank == 5) reqrp = rank6
      if(Rank == 6) reqrp = rank7
      if(Rank == 7) reqrp = rank8
      if(Rank == 8) reqrp = rank9
      if(Rank == 9) reqrp = rank10
     //--------------------------------------------------------Rank system---------------------------
    
  let status = `Active`;
  let bancheck = db.get(`banned_${User.id}`)
  if(bancheck) status = `Banned \nReason: ${bancheck}`
  
  let CommaBal = client.addCommas(await client.economy.getBal(User.id))
    
    let Totalbalance = "[`" + CommaBal + " Order Coins`](https://kristab.ml/)"
    
    
    
    let show = " "
    let Showcase = db.get(`ShowcaseItem_${User.id}`)
    if(!Showcase) show = "None"
    if(Showcase) {
      
      let ITEM = Showcase;
    
     let item = ItemShop[ITEM] 
    if(item) ITEM = item.dbid
      
      let check = db.get(`${ITEM}_${User.id}`)
      let value = 0;
      let emoji;
      let name;
      
      if(check >= 1) {
        
        name = item.name
        value = item.trade
        emoji = item.emoji
        
        show = `**x${check} ${emoji} ${name}** [Worth: ${value} each]`
        
      }
      
      if(check < 1 || check == undefined || check == null) {
        show = "None"
      }
    }

  const embed = new Discord.MessageEmbed()
  .setDescription(`**Total Balance:** ${Totalbalance}`)
  .addField("__Rank__", "[`" + Rank + "`](https://kristab.ml/secret)" , true)
  .addField("__Rank Up XP__", "[`" + Checkrp + "/"+reqrp+"`](https://kristab.ml/secret)" , true)
  .addField("__Total XP__", "[`" + Checktotalrp + "`](https://kristab.ml/face)" , true)
  .addField("__Showcase Item__", `${show}`)
  .addField("__PowerUp__", `${equipedx2} \n${equipedless10}`)
  .addField("__Running Cooldowns__", `Beg: ${time} \nFish : ${time1} \nScout : ${time2} \nRps : ${timerps} \nHunt : ${time23} \nMine : ${time23456} \nWork : ${time234} \nDaily : ${time2345} \nVote : ${timevote} \n---------------| **EVENT** |--------------- \nTt : ${timett}`)
  .addField("__Account__", `Status: ${status}`)
  .setColor("GREEN")
  .setAuthor(`${User.username}'s Stats` , User.avatarURL({ dynamic: true, format: `png` }))
  .setTimestamp()
  .setFooter("© 2021 Order It Economy");

message.channel.send(embed)
    
    let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(embed)

     
    //-------------------E N D---------------------------
  }
};
