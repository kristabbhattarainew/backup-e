const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const Rewards = require("../rank-reward.json")

module.exports = {
  name: `beg`,
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
    
    let author = await db.fetch(`begcd_${message.author.id}`)

    let timeout = 30000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
      
  let time = ms(timeout - (Date.now() - author));
      
    const Embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription(`You need to wait **${time}** to beg again. 
      *stop being greedy kid!*
      `)
      .setColor("RED")
      .setTimestamp()
      
     return message.channel.send(Embed)
      
      } else {
    
    // if(message.author.id !== "598524997954306048") return message.reply("This command is being re-designed! Please wait sometime until its finished.")
    
    const Jobs = [
      `Kristab: Aww you little begger 🤗 take`,
      `Bill Gates: I am sooo rich 🤑 take`,
      `God: Bless you my child 🖐 take this`,
      `Thanos: Boi you look so sad take`,
      `Mother: Stupid son stop begging me! But anyways you are my son so take`,
      `K.P Oli: *Nepali ho ni ta* 😎 take`,
      `Exbyte: Stupid begger 👿 I am only giving you`,
      `Airforce: Stop begging to me or next time you will be muted!!`,
      `Shadow: Stupid begger get lost!!`,
      `Elon Musk: If you dont stop begging I will send you in moon with out space suit!`
    ];
    const Job = Jobs[Math.floor(Math.random() * Jobs.length)];
        
    let Coins = Math.floor(Math.random() * 200);
        
        
        if(Job == "Shadow: Stupid begger get lost!!") {
          //----------------COOLDOWN----------------
        db.set(`begcd_${message.author.id}`, Date.now())
          
          return message.reply(`${Job}`)
        }
        
        if(Job == "Elon Musk: If you dont stop begging I will send you in moon with out space suit!") {
          //----------------COOLDOWN----------------
        db.set(`begcd_${message.author.id}`, Date.now())
          
          return message.reply(`${Job}`)
        }
        
        if(Job == "Airforce: Stop begging to me or next time you will be muted!!") {
          //----------------COOLDOWN----------------
        db.set(`begcd_${message.author.id}`, Date.now())
          
          return message.reply(`${Job}`)
        }
        
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
        
        const Embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}` , message.author.avatarURL({ dynamic: true, format: `png` }))
        .setDescription(`${Job}, <:order_coins:800022593184596028> ${Coins}`)
        .setColor("GREEN")
        .setFooter(`Rank ${Rank} [ +${coins} ]`)
        
    message.channel.send(Embed);
        
        let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(Embed)
        
     await client.economy.addBal(message.author.id, Coins + coins);
        
            //---------------------------Secret------------------
    
    let Number = Math.floor(Math.random() * 5);
    
    if(Number == "0") message.channel.send("Tips/Clues: Visit: I start begging from 8am to pm!").then(k => k.delete({ timeout : 20000 }))
    
    //---------------------------Secret------------------
        
        db.add(`TotalBeg_${message.author.id}`, 1)
        
        db.add(`rankuppoints_${message.author.id}`, 1)
        db.add(`totalrankpoints_${message.author.id}`, 1)
        //----------------COOLDOWN----------------
        db.set(`begcd_${message.author.id}`, Date.now())
        
      }
  }
};
