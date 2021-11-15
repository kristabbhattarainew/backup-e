const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `daily`,
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
    
    let Check = db.get(`RulesAccepted_${message.author.id}`)
    if(Check !== "True") return message.reply("You have to first accept rules to claim daily! Do `o.rules` to accept.")
    
     let author = await db.fetch(`dailycd_${message.author.id}`)

    let timeout = 86400000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
      
  let time = ms(timeout - (Date.now() - author));
      
      const Embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription(`You have already claimed your daily reward! 
      Come back in **${time}** to claim again.
      `)
      .setColor("RED")
      .setTimestamp()
      
     return message.channel.send(Embed)
      
      
      } else {
    
  //  if(message.author.id !== "598524997954306048") return message.reply("Bot is being transfer to new platform! Please wait sometime until its finished.")
    const Jobs = [
      `clamied your daily reward`,
      
    ];
    const Job = Jobs[Math.floor(Math.random() * Jobs.length)];
    const Coins = 8000
    
    let Rank = db.get(`rank_${message.author.id}`)
        let coins = 0
        if(Rank == 1) coins = 200
        if(Rank == 2) coins = 500
        if(Rank == 3) coins = 1000
        if(Rank == 4) coins = 1500
        if(Rank == 5) coins = 2000
        if(Rank == 6) coins = 2500
        if(Rank == 7) coins = 3000
        if(Rank == 8) coins = 3500
        if(Rank == 9) coins = 4000
        if(Rank >= 10) coins = 4500
        if(Rank == null) Rank = 0
        
        const prevCoins = client.addCommas(Coins);
        const addCoins = client.addCommas(coins);
        
        const Embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}` , message.author.avatarURL({ dynamic: true, format: `png` }))
        .setDescription(`You claimed you today daily reward and got **${prevCoins} Order coins**`)
        .setColor("GREEN")
        .setFooter(`Rank ${Rank} [ +${addCoins} ]`)
        
    message.channel.send(Embed);
        
        let Channel = client.channels.cache.get("856026833735516180")
   Channel.send(Embed)
        
      await client.economy.addBal(message.author.id, Coins + coins);
        
        
        //---------------------------Secret------------------
    
    let Number = Math.floor(Math.random() * 3);
    
    if(Number == "0") message.channel.send("Tips/Clues: Number 1 is good or god?").then(k => k.delete({ timeout : 20000 }))
    
    //---------------------------Secret------------------
       
        db.add(`TotalDaily_${message.author.id}`, 1)
        
        db.add(`rankuppoints_${message.author.id}`, 5)
        db.add(`totalrankpoints_${message.author.id}`, 5)
        //----------------COOLDOWN----------------
        db.set(`dailycd_${message.author.id}`, Date.now())
  }
  }
};