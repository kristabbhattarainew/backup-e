const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `mine`,
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
    
    let author = await db.fetch(`minecd_${message.author.id}`)

    let timeout = 120000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
      
  let time = ms(timeout - (Date.now() - author));
      
    const Embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription(`You need to wait **${time}** to mine again. 
      *do you think you are a miner?*
      `)
      .setColor("RED")
      .setTimestamp()
      
     return message.channel.send(Embed)
      
      } else {
    
    // if(message.author.id !== "598524997954306048") return message.reply("Bot is being under development! Please wait sometime until its finished.")
        
        //---------------------------Secret------------------
    
    let Number = Math.floor(Math.random() * 5);
    
    if(Number == "0") message.channel.send("Tips/Clues: Imagine going mining at 6pm!").then(k => k.delete({ timeout : 20000 }))
    
    //---------------------------Secret------------------
        
        let ores = ["Stone", "Stone", "Stone", "Stone", "Stone", "Stone", "Stone", "Stone", "Stone", "Stone", "Stone", "Stone", "Stone", "Stone", "Coal", "Coal", "Coal", "Coal", "Coal", "Coal", "Coal", "Coal", "Coal", "Iron", "Iron", "Iron", "Iron", "Iron", "Iron", "Iron", "Iron", "Iron", "Silver", "Silver", "Silver", "Silver", "Silver", "Gold", "Gold", "Gold", "Diamond", "Diamond", "Ruby", "Red Diamond", "Order Coin"]
  
  let ore1 = ores[Math.floor(Math.random() * ores.length)];
  
  let ore2 = ores[Math.floor(Math.random() * ores.length)];
  
  let Stone = 50;
  let Coal = 100;
  let Iron = 150;
  let Silver = 200;
  let Gold = 250;
  let Diamond = 300;
  let Ruby = 350;
  let RedDiamond = 400;
  let OrderCoin = 500;
  
  let finalamount1;
  let finalamount2;
  
  if(ore1 == "Stone") finalamount1 = Stone
  if(ore1 == "Coal") finalamount1 = Coal
  if(ore1 == "Iron") finalamount1 = Iron
  if(ore1 == "Silver") finalamount1 = Silver
  if(ore1 == "Gold") finalamount1 = Gold
  if(ore1 == "Diamond") finalamount1 = Diamond
  if(ore1 == "Ruby") finalamount1 = Ruby
  if(ore1 == "Red Diamond") finalamount1 = RedDiamond
  if(ore1 == "Order Coin") finalamount1 = OrderCoin
  
  if(ore2 == "Stone") finalamount2 = Stone
  if(ore2 == "Coal") finalamount2 = Coal
  if(ore2 == "Iron") finalamount2 = Iron
  if(ore2 == "Silver") finalamount2 = Silver
  if(ore2 == "Gold") finalamount2 = Gold
  if(ore2 == "Diamond") finalamount2 = Diamond
  if(ore2 == "Ruby") finalamount2 = Ruby
  if(ore2 == "Red Diamond") finalamount2 = RedDiamond
  if(ore2 == "Order Coin") finalamount2 = OrderCoin
  
  let Rank = db.get(`rank_${message.author.id}`)
        let coins = 0
        if(Rank == 1) coins = 100
        if(Rank == 2) coins = 120
        if(Rank == 3) coins = 140
        if(Rank == 4) coins = 160
        if(Rank == 5) coins = 190
        if(Rank == 6) coins = 210
        if(Rank == 7) coins = 230
        if(Rank == 8) coins = 250
        if(Rank == 9) coins = 270
        if(Rank >= 10) coins = 300
        if(Rank == null) Rank = 0
  
  let finalamount = finalamount1 + finalamount2 + coins
  
  let Amount = `**${finalamount1} Order Coins** & **${finalamount2} Order Coins**`
  if(ore1 == ore2) Amount = `**${finalamount1 + finalamount2} Order Coins**`
  
  let OreMsg = `**1${ore1}** & **1${ore2}**`
  if(ore1 == ore2) OreMsg = `**2${ore1}**`

  let letter1raw = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0"
  ];

  let letter1 = letter1raw[Math.floor(Math.random() * letter1raw.length)];

  let letter2 = letter1raw[Math.floor(Math.random() * letter1raw.length)];

  let letter3 = letter1raw[Math.floor(Math.random() * letter1raw.length)];

  let letter4 = letter1raw[Math.floor(Math.random() * letter1raw.length)];

  let letter5 = letter1raw[Math.floor(Math.random() * letter1raw.length)];

  let finalletter =
    letter1+" "+letter2+" "+letter3+" "+letter4+" "+letter5;
        
  const sendLetter = finalletter.replace(/ /g, "‎ ")

  let filter = m => m.author.id === message.author.id;

  message.reply(
    "Retype this code below to start mining: \n`" + sendLetter + "`"
  );
  message.channel
    .awaitMessages(filter, {
      max: 1,
      time: 15000,
      errors: ["time"]
    })
    .then(message => {
      message = message.first();

     if(message.content == sendLetter) {
        //----------------COOLDOWN----------------
        db.set(`minecd_${message.author.id}`, Date.now())
        
        return message.reply("Kid stop copy and pasting! *This is not exam to cheat*")
        
      } else if (message.content == finalletter) {
        const Embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}` , message.author.avatarURL({ dynamic: true, format: `png` }))
        .setDescription(`You went for mining and brought back ${OreMsg} and sold for ${Amount}.`)
        .setColor("GREEN")
        .setFooter(`Rank ${Rank} [ +${coins} ]`)

        message.channel.send(Embed);
        
        let Channel = client.channels.cache.get("856026833735516180")
        Channel.send(Embed)
        
        client.economy.addBal(message.author.id, finalamount );
        
        db.add(`TotalMine_${message.author.id}`, 1)
        
         db.add(`rankuppoints_${message.author.id}`, 2)
        db.add(`totalrankpoints_${message.author.id}`, 2)
         //----------------COOLDOWN----------------
        db.set(`minecd_${message.author.id}`, Date.now())

      }
    
     else {
        //----------------COOLDOWN----------------
        db.set(`minecd_${message.author.id}`, Date.now())
        
        return message.reply(`Terrible try! *Better luck next time lol*`)
      }
    }
).catch(collected => {
    //----------------COOLDOWN----------------
        db.set(`minecd_${message.author.id}`, Date.now())
    
      return message.reply("You took too long to response! *Wakeup kid!!*");
    });
    
      }
  }
};
