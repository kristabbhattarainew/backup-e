const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `hunt`,
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
    
    let author = await db.fetch(`huntcd_${message.author.id}`)

    let timeout = 120000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
      
  let time = ms(timeout - (Date.now() - author));
      
    const Embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription(`You need to wait **${time}** to hunt again. 
      *huh are you trying to end this world?*
      `)
      .setColor("RED")
      .setTimestamp()
      
     return message.channel.send(Embed)
      
      } else {
    
 //   if(message.author.id !== "598524997954306048") return message.reply("Bot is being transfer to new platform! Please wait sometime until its finished.")
    
    const Jobs = [
      `Deer 🦌`,
      `Lion 🦁`,
      `Tiger 🐅`,
      `Wild Buffalo 🐃`,
      `Elephant 🐘`,
      `Monkey 🐒`,
      `Leopard 🐆`,
      `Rhino 🦏`,
      `Llama🦙`,
      `Skunk 🦨`,
      `Rabbit 🐇`,
      `Cocodile 🐊`,
      `Snake 🐍`,
      `Dragon 🐉`,
      `T-Rex 🦖`,
      `Mouse 🐁`,
      `Fox 🦊`,
      `Unicorn 🦄`,
      `Gorilla 🦍`,
      `Bear 🐻`,
      `Love Cat 😻`,
      `Flamingo 🦩`,
      `Eagle 🦅`,
      `You brought back nothing like bruh. *I think you should leave this planet*`,
      `You brought back nothing like bruh. *I think you should leave this planet*`,
      `You brought back nothing like bruh. *I think you should leave this planet*`,
      `You brought back nothing like bruh. *I think you should leave this planet*`,
      `You brought back nothing like bruh. *I think you should leave this planet*`,
      `You brought back nothing like bruh. *I think you should leave this planet*`,
      `You brought back nothing like bruh. *I think you should leave this planet*`
    ];
    const Job = Jobs[Math.floor(Math.random() * Jobs.length)];
    let Coins = Math.floor(Math.random() * 300) + 200
    
    if(Job == "You brought back nothing like bruh. *I think you should leave this planet*") {
      //----------------COOLDOWN----------------
        db.set(`huntcd_${message.author.id}`, Date.now())
      return message.reply(Job)
    }

    if(Job == `Dragon 🐉`) Coins = 888;
    if(Job == `Cocodile🐊`) Coins = 550;
    if(Job == `T-Rex 🦖`) Coins = 999;
    if(Job == `Tiger 🐅`) Coins = 600;
    if(Job == `Lion 🦁`) Coins = 600;
    if(Job == `Unicorn 🦄`) Coins = 700;

        let Rank = db.get(`rank_${message.author.id}`)
        let coins = 0
         if(Rank == 1) coins = 100
        if(Rank == 2) coins = 150
        if(Rank == 3) coins = 200
        if(Rank == 4) coins = 250
        if(Rank == 5) coins = 300
        if(Rank == 6) coins = 350
        if(Rank == 7) coins = 400
        if(Rank == 8) coins = 450
        if(Rank == 9) coins = 500
        if(Rank >= 10) coins = 550
        if(Rank == null) Rank = 0
        
         const Embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}` , message.author.avatarURL({ dynamic: true, format: `png` }))
        .setDescription(`You went in forest and brought back ${Job} and sold for **${Coins} Order coins**`)
        .setColor("GREEN")
        .setFooter(`Rank ${Rank} [ +${coins} ]`)

    message.channel.send(Embed);
        
        let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(Embed)
        
         await client.economy.addBal(message.author.id, Coins + coins);
    
        //---------------------------Secret------------------
    
    let Number = Math.floor(Math.random() * 5);
    
    if(Number == "0") message.channel.send("Tips/Clues: The day Order It Economy comes to exist was October 4!").then(k => k.delete({ timeout : 20000 }))
    
    //---------------------------Secret------------------
        
        db.add(`TotalHunt_${message.author.id}`, 1)
        
        db.add(`rankuppoints_${message.author.id}`, 1)
        db.add(`totalrankpoints_${message.author.id}`, 1)
         //----------------COOLDOWN----------------
        db.set(`huntcd_${message.author.id}`, Date.now())
      }
  }
};
