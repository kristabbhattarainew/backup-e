const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const Rewards = require("../rank-reward.json")
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require("discord-buttons");

module.exports = {
  name: `achievements`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
    let USER_ID = args[0];
    if(!USER_ID) USER_ID = message.author.id
 
    let User = message.mentions.users.first();

    if(!User) User = client.users.cache.get(USER_ID);
  
    if(!User) return message.reply("Given User does not exist??")
    
   // if(message.author.id != "598524997954306048") return;
    
    let count = 0
    //----------------------------------------- Collector  ----------------------------------------
    
    let a1 = "<:Cross:889542708128006216>"
    let a1status = "Locked"
    
     let CheckA1 = db.get(`a1_${User.id}`)
    
    if(CheckA1 == "True") {
      count++
      a1 = "<a:verified2:728648877917339698>"
      a1status = "Unlocked"
    }
    
//     let tbeg = db.get(`TotalBeg_${User.id}`)
    
//     if(CheckA7 !== "True" && tbeg >= 1000) {
//       db.set(`a7_${User.id}`, "True")
      

      
//       message.channel.send(`${User}, Just received  for unlocking  Achievement!`)
//     }
    
    
     //----------------------------------------- Collector  ----------------------------------------
    
    let a2 = "<:Cross:889542708128006216>"
    let a2status = "Locked"
    
     let CheckA2 = db.get(`a2_${User.id}`)
    
    if(CheckA2 == "True") {
      count++
      a2 = "<a:verified2:728648877917339698>"
      a2status = "Unlocked"
    }
    
    
    
    //----------------------------------------- Rank 5  ----------------------------------------
    let a3 = "<:Cross:889542708128006216>"
    let a3status = "Locked"
    
    let checkRank = db.get(`rank_${User.id}`)
    if(checkRank >= 5) { 
      count++
      a3 = "<a:verified2:728648877917339698>"
      a3status = "Unlocked"
      
    }
    
    let CheckA3 = db.get(`a3_${User.id}`)
    if(CheckA3 !== "True" && checkRank >= 5) {
      db.set(`a3_${User.id}`, "True")
      
      client.economy.addBal(User.id, 30000);
      
      message.channel.send(`${User}, Just received 30k Order Coins for unlocking Best Player Achievement!`)
    }
    
    //----------------------------------------- Rank 10  ----------------------------------------
    
    let a4 = "<:Cross:889542708128006216>"
    let a4status = "Locked"
    
    let checkRank1 = db.get(`rank_${User.id}`)
    if(checkRank1 >= 10) { 
      count++
      a4 = "<a:verified2:728648877917339698>"
      a4status = "Unlocked"
      
    }
    
    let CheckA4 = db.get(`a4_${User.id}`)
    if(CheckA4 !== "True" && checkRank >= 10) {
      db.set(`a4_${User.id}`, "True")
      
      client.economy.addBal(User.id, 50000);
      
      message.channel.send(`${User}, Just received 50k Order Coins for unlocking Number 1 Player Achievement!`)
    }
    
    //-----------------------------------------  Leaderboard top ----------------------------------------
    
    const data = await client.economy.getTopBal(); //array
    const showLeaders = 1;
    
    await data.sort(function(a, b) {
      return b.Coins - a.Coins
    })
    
    const leaderBoardWithId = data.slice(0, showLeaders);
    let leaderboard = '';
    let index = 1;
    
    let name;
    let coins;
    
    leaderBoardWithId.forEach(leader => {
      name = leader.User;
      coins = client.addCommas(leader.Coins);
      name.toString();
    })
    
    let a5 = "<:Cross:889542708128006216>"
    let a5status = "Locked"
    
    let CheckA5 = db.get(`a5_${User.id}`)
    
    if(CheckA5 == 'True') {
      count++
      a5 = "<a:verified2:728648877917339698>"
      a5status = "Unlocked"
    }
    
     
    if(CheckA5 !== "True" && User.id == name) {
      db.set(`a5_${User.id}`, "True")
      
      client.economy.addBal(User.id, 20000);
      
      message.channel.send(`${User}, Just received 20k Order Coins for unlocking I am in Top Achievement!`)
    }
    
    //----------------------------------------- Millionaire  ----------------------------------------
    
    let bal = await client.economy.getBal(User.id)
    
     let a6 = "<:Cross:889542708128006216>"
    let a6status = "Locked"
    
     let CheckA6 = db.get(`a6_${User.id}`)
    
    if(CheckA6 == "True") {
      count++
      a6 = "<a:verified2:728648877917339698>"
      a6status = "Unlocked"
    }
    
    
    if(CheckA6 !== "True" && bal > 1000000) {
      db.set(`a6_${User.id}`, "True")
      
      client.economy.addBal(User.id, 20000);
      
      message.channel.send(`${User}, Just received 20k Order Coins for unlocking Millionaire Achievement!`)
    }
    
    //----------------------------------------- Begging  ----------------------------------------
    
    let a7 = "<:Cross:889542708128006216>"
    let a7status = "Locked"
    
     let CheckA7 = db.get(`a7_${User.id}`)
    
    if(CheckA7 == "True") {
      count++
      a7 = "<a:verified2:728648877917339698>"
      a7status = "Unlocked"
    }
    
     let tbeg = db.get(`TotalBeg_${User.id}`)
     if(!tbeg) tbeg = 0
    
//     if(CheckA7 !== "True" && tbeg >= 1000) {
//       db.set(`a7_${User.id}`, "True")
      

      
//       message.channel.send(`${User}, Just received  for unlocking  Achievement!`)
//     }
    
    //----------------------------------------- fishing  ----------------------------------------
    
    let a8 = "<:Cross:889542708128006216>"
    let a8status = "Locked"
    
     let CheckA8 = db.get(`a8_${User.id}`)
    
    if(CheckA8 == "True") {
      count++
      a8 = "<a:verified2:728648877917339698>"
      a8status = "Unlocked"
    }
    
    let tfish = db.get(`TotalFish_${User.id}`)
    if(!tfish) tfish = 0
    
//     if(CheckA8 !== "True" && tfish >= 1000) {
//       db.set(`a8_${User.id}`, "True")
      

      
//       message.channel.send(`${User}, Just received  for unlocking  Achievement!`)
//     }
    
    //----------------------------------------- Hunter  ----------------------------------------
    
    let a9 = "<:Cross:889542708128006216>"
    let a9status = "Locked"
    
     let CheckA9 = db.get(`a9_${User.id}`)
    
    if(CheckA9 == "True") {
      count++
      a9 = "<a:verified2:728648877917339698>"
      a9status = "Unlocked"
    }
    
    let thunt = db.get(`TotalHunt_${User.id}`)
    if(!thunt) thunt = 0
    
//     if(CheckA7 !== "True" && tbeg >= 1000) {
//       db.set(`a7_${User.id}`, "True")
      

      
//       message.channel.send(`${User}, Just received  for unlocking  Achievement!`)
//     }
    
    //----------------------------------------- Scout  ----------------------------------------
    
    let a10 = "<:Cross:889542708128006216>"
    let a10status = "Locked"
    
     let CheckA10 = db.get(`a10_${User.id}`)
    
    if(CheckA10 == "True") {
      count++
      a10 = "<a:verified2:728648877917339698>"
      a10status = "Unlocked"
    }
    
    let tscout = db.get(`TotalScout_${User.id}`)
    if(!tscout) tscout = 0
    
//     if(CheckA7 !== "True" && tbeg >= 1000) {
//       db.set(`a7_${User.id}`, "True")
      

      
//       message.channel.send(`${User}, Just received  for unlocking  Achievement!`)
//     }
    
    //----------------------------------------- Miner  ----------------------------------------
    
    let a11 = "<:Cross:889542708128006216>"
    let a11status = "Locked"
    
     let CheckA11 = db.get(`a11_${User.id}`)
    
    if(CheckA11 == "True") {
      count++
      a11 = "<a:verified2:728648877917339698>"
      a11status = "Unlocked"
    }
    
     let tmine = db.get(`TotalMine_${User.id}`)
     if(!tmine) tmine = 0
    
//     if(CheckA7 !== "True" && tbeg >= 1000) {
//       db.set(`a7_${User.id}`, "True")
      

      
//       message.channel.send(`${User}, Just received  for unlocking  Achievement!`)
//     }
    
    //----------------------------------------- Worker  ----------------------------------------
    
    let a12 = "<:Cross:889542708128006216>"
    let a12status = "Locked"
    
     let CheckA12 = db.get(`a12_${User.id}`)
    
    if(CheckA12 == "True") {
      count++
      a12 = "<a:verified2:728648877917339698>"
      a12status = "Unlocked"
    }
    
     let twork = db.get(`TotalWork_${User.id}`)
     if(!twork) twork = 0
    
//     if(CheckA7 !== "True" && tbeg >= 1000) {
//       db.set(`a7_${User.id}`, "True")
      

      
//       message.channel.send(`${User}, Just received  for unlocking  Achievement!`)
//     }
    
    //----------------------------------------- Claimer  ----------------------------------------
    
    let a13 = "<:Cross:889542708128006216>"
    let a13status = "Locked"
    
     let CheckA13 = db.get(`a13_${User.id}`)
    
    if(CheckA13 == "True") {
      count++
      a13 = "<a:verified2:728648877917339698>"
      a13status = "Unlocked"
    }
    
     let tclaim = db.get(`TotalDaily_${User.id}`)
     if(!tclaim) tclaim = 0
    
//     if(CheckA7 !== "True" && tbeg >= 1000) {
//       db.set(`a7_${User.id}`, "True")
      

      
//       message.channel.send(`${User}, Just received  for unlocking  Achievement!`)
//     }
    
    //----------------------------------------- Voter  ----------------------------------------
    let CheckA14 = db.get(`a14_${User.id}`)
    let tvoter = db.get(`votesnew_${User.id}`)
    
    let a14 = "<:Cross:889542708128006216>"
    let a14status = `Locked [${tvoter} /100]`
    
    if(CheckA14 == "True") {
      count++
      a14 = "<a:verified2:728648877917339698>"
      a14status = "Unlocked"
    }
    
     
     if(!tvoter) tvoter = 0
    
    if(CheckA14 !== "True" && tvoter >= 100) {
      
     let Channel = client.channels.cache.get("903535380735877170")
    if(!Channel) return message.reply("This command is having problem right now! [ERROR 101]")  

            const embedfinal = new Discord.MessageEmbed()
             .setTitle(`Pro Voter react claimed by ${User.tag}!`)
             .addField("Claimed by:", `${User.id}`)
             .setColor("GREEN")
             
           Channel.send(embedfinal)
      
      db.set(`a14_${User.id}`, "True")
      
      message.channel.send(`${User}, Just received Special React for unlocking Pro Voter Achievement!`)
    }
    
    //----------------------------------------- Rule  ----------------------------------------
    
     let arule = "<:Cross:889542708128006216>"
    let arulestatus = "Locked"
    
     let CheckArule = db.get(`RulesAccepted_${User.id}`)
    
    if(CheckArule == "True") {
      count++
      arule = "<a:verified2:728648877917339698>"
      arulestatus = "Unlocked"
    }
    
    
    
//     if(CheckA7 !== "True" && tbeg >= 1000) {
//       db.set(`a7_${User.id}`, "True")
      

      
//       message.channel.send(`${User}, Just received  for unlocking  Achievement!`)
//     }
    
    
    //----------------------------------------- Order Box  ----------------------------------------
    
    let tobox = db.get(`OrderBoxes_${User.id}`)
    
     let aobox = "<:Cross:889542708128006216>"
    let aoboxstatus = `Locked [ ${tobox}/100 ]`
    
     let CheckAobox = db.get(`aobox_${User.id}`)
    
    if(CheckAobox == "True") {
      count++
      aobox = "<a:verified2:728648877917339698>"
      aoboxstatus = "Unlocked"
    }
    
    
    if(CheckAobox !== "True" && tobox >= 100) {
      db.set(`aobox_${User.id}`, "True")
      
      db.add(`CommonBoxes_${User.id}`, 10)
      
      client.economy.addBal(User.id, 10000);
      
      message.channel.send(`${User}, Just received 10k Order Coins & 10 Common Boxes for unlocking Order Box Collector Achievement!`)
    }
    
    //-----------------------------------------   ----------------------------------------
    
    //-----------------------------------------   ----------------------------------------
    
    //-----------------------------------------   ----------------------------------------
    
    //-----------------------------------------   ----------------------------------------
    
    //-----------------------------------------   ----------------------------------------
    
    //-----------------------------------------   ----------------------------------------
    
    //-----------------------------------------   ----------------------------------------
    
    
    
     //--------------------------------------S T A R T---------------------------------------

    //--------------------EMBEDS------------------------

    
    
    const embed1 = new Discord.MessageEmbed()
    .setTitle(`Achievements Of Order It Economy`)
    .setAuthor(`Unlocked Achievements [ ${count}/ 16]`, User.avatarURL({ dynamic: true, format: `png` }))
    .addField(`[ ${a1} ] React Collector - ${a1status}`, `Collect all custom, normal and legendary reacts from the react shop \nReward: Special React`)
    .addField(`[ ${a2} ] I speak alot - ${a2status}`, `Get 2k ES Points in discord-reacts bot \nReward: 20k Order Coins`)
    .addField(`[ ${a3} ] Best player - ${a3status}`, `Get to Rank 5 in Order It Economy \nReward: 30k Order Coins`)
    .addField(`[ ${a4} ] Number 1 player - ${a4status}`, `Get to Rank 10 in Order It Economy \nReward: 50k Order Coins`)
    .addField(`[ ${a5} ] I am in Top - ${a5status}`, `Get in the top of leaderboard \nReward: 20k Order Coins`)
    .addField(`[ ${a6} ] Millionaire - ${a6status}`, `Get in 1mil Order Coins \nReward: 20k Order Coins`)
    .addField(`[ ${arule} ] I accept it - ${arulestatus}`, `Accept rules of Order It Economy by doing **o.rules** \nReward: 5k Order Coins & 5 Order Boxes`)
    .addField(`[ ${aobox} ] Order Box Collector - ${aoboxstatus}`, `Collect 100 Order Boxes \nReward: 10k Order Coins & 10 Common Boxes`)
    .setColor("GREEN");
    
    const embed2 = new Discord.MessageEmbed()
    .setTitle(`Achievements Of Order It Economy`)
    .setAuthor(`Unlocked Achievements [ ${count}/ 16]`, User.avatarURL({ dynamic: true, format: `png` }))
    .addField(`[ ${a7} ] Pro Begger - ${a7status} [${tbeg} /1000]`, `Beg 1000 times \nReward: Special React`)
    .addField(`[ ${a8} ] Pro Fisher - ${a8status} [${tfish} /1000]`, `Fish 1000 times \nReward: Special React`)
    .addField(`[ ${a9} ] Pro Hunter - ${a9status} [${thunt} /1000]`, `Hunt 1000 times \nReward: Special React`)
    .addField(`[ ${a10} ] Pro Scout - ${a10status} [${tscout} /1000]`, `Scout 1000 times \nReward: Special React`)
    .addField(`[ ${a11} ] Pro Miner - ${a11status} [${tmine} /500]`, `Mine 500 times \nReward: Special React`)
    .addField(`[ ${a12} ] Pro Worker - ${a12status} [${twork} /500]`, `Work 500 times \nReward: Special React`)
    .addField(`[ ${a13} ] Pro Claimer - ${a13status} [${tclaim} /100]`, `Claim daily 100 times \nReward: Special React`)
    .addField(`[ ${a14} ] Pro Voter - ${a14status}`, `Vote 100 times \nReward: Special React`)
    .setColor("GREEN");
    

    //--------------------EMBEDS------------------------

    //--------------------Buttons------------------------

    let button1 = new MessageButton()
    // .setLabel(`◀`)
    .setID(`back`)
    .setEmoji(`◀`)
    .setStyle("green")
    .setDisabled(true);

    let button2 = new MessageButton()
    // .setLabel(`▶`)
    .setID(`front`)
    .setEmoji(`▶`)
    .setStyle("green");


    let row = new MessageActionRow()
    .addComponents(button1, button2);

    //--------------------Buttons------------------------

    const MESSAGE = await message.channel.send(embed1, row);
 
    const filter = ( button ) => button.clicker.user.id === message.author.id 
    const collector = MESSAGE.createButtonCollector(filter, { time : 500000 });

    collector.on('collect', async (b) => {

        if(b.id == "front") {
          
          button2.setStyle("green")
          button2.setDisabled(true)
          button1.setStyle("green")
          button1.setDisabled(false)
          
    
          
          MESSAGE.edit(embed2, { buttons: [button1, button2] });
          
            await b.reply.defer()

        }
      
      if(b.id == "back") {
          
          button1.setStyle("green")
          button1.setDisabled(true)
          button2.setStyle("green")
          button2.setDisabled(false)
    
          
          MESSAGE.edit(embed1, { buttons: [button1, button2] });
          
            await b.reply.defer()

        }

        


    })

    collector.on('end', (b) => {
      
        //----------------COOLDOWN----------------
            
          button1.setStyle("grey")
          button1.setDisabled(true)
          button2.setStyle("grey")
          button2.setDisabled(true)

          
             MESSAGE.edit(embed1, { buttons: [button1, button2] });
    })

       //---------------------------------------E N D----------------------------------------
   
  }
};
