const { Message } = require(`discord.js`);
const Discord = require("discord.js");
const Client = require("../structures/Client");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `work`,
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
    if(Check !== "True") return message.reply("You have to first accept rules to claim work! Do `o.rules` to accept.")
    
    let author = await db.fetch(`workcd_${message.author.id}`)

    let timeout = 3600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
      
  let time = ms(timeout - (Date.now() - author));
      
    const Embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription(`You need to wait **${time}** to work again. 
      *Bruh it is not the time to work dude! Go back home*
      `)
      .setColor("RED")
      .setTimestamp()
      
     return message.channel.send(Embed)
      
      } else {
    
     //if(message.author.id !== "598524997954306048") return message.reply("This command is being re-designed right now!")
    
    let Codes = [
      "Can you give me some bobux?",
      "Naruto or Boruto? lol",
      "am strong like bull",
      "Lets pro, You know that baby pro",
      "I need food break",
      "do you want fite",
      "am strong liek chicken nugget",
      "D I S R E S P E C C",
      "D I S A S T E R",
      "Don't ignore the sup",
      "noob do you want to race",
      "*INTENSE SNIFF*",
      "R E S P E C C",
      "sup am pro",
      "fanta is the best drink",
      "tank you so much",
      "wat did you say?",
      "Oh Plis Shut"

    ]
    
    const Code = Codes[Math.floor(Math.random() * Codes.length)];
        
    const sendCode = Code.replace(/ /g, "‎ ")
    
    let Jobs = [
      "*Roblox Mod* - Retype the sentence given below to ban the exploiter: \n\n`"+ sendCode + "`",
      "*Roblox Mod* - Retype the sentence given below to delete the exploiter account: \n\n`"+ sendCode + "`",
      "*Roblox Mod* - Retype the sentence given below to remove Adopt Me game: \n\n`"+ sendCode + "`",
      "*Roblox Mod* - Retype the sentence given below to reset swear names: \n\n`"+ sendCode + "`",
      "*Fisher Man* - Retype the sentence given below to catch the fish: \n\n`"+ sendCode + "`",
      "*Fisher Man* - Retype the sentence given below to catch the whale: \n\n`"+ sendCode + "`",
      "*Fisher Man* - Retype the sentence given below to kill the whale: \n\n`"+ sendCode + "`",
      "*Fisher Man* - Retype the sentence given below to catch the legenday fish: \n\n`"+ sendCode + "`",
      "*Doctor* -  Retype the sentence given below to save your patient: \n\n`"+ sendCode + "`",
      "*Doctor* -  Retype the sentence given below to do operation: \n\n`"+ sendCode + "`",
      "*Doctor* -  Retype the sentence given below to fix patient broken hand: \n\n`"+ sendCode + "`",
      "*Doctor* -  Retype the sentence given below to check your patient eyes: \n\n`"+ sendCode + "`",
      "*Everest Studio Mod* -  Retype the sentence given below to muted the spammer: \n\n`"+ sendCode + "`",
      "*Everest Studio Mod* -  Retype the sentence given below to warn the spammer: \n\n`"+ sendCode + "`",
      "*Everest Studio Mod* -  Retype the sentence given below to muted the channel: \n\n`"+ sendCode + "`",
      "*Everest Studio Mod* -  Retype the sentence given below to clear bot commands from general chat: \n\n`"+ sendCode + "`",
      "*Everest Studio Mod* -  Retype the sentence given below to respect Kristab \n\n`"+ sendCode + "`",
      "*Everest Studio Mod* -  Retype the sentence given below to get promotion from kistab: \n\n`"+ sendCode + "`",
      
    ]
    
    const Job = Jobs[Math.floor(Math.random() * Jobs.length)];
    
    
     let filter = m => m.author.id === message.author.id
     
     //---------------------------Secret------------------
    
    let Number = Math.floor(Math.random() * 4);
    
    if(Number == "0") message.channel.send("Tips/Clues: Do you know how many tails do kuruma have?").then(k => k.delete({ timeout : 20000 }))
    
    //---------------------------Secret------------------
        
              message.reply(Job)
     //------------------------Timer start-----------------------------------
        db.set(`worktimer_${message.author.id}`, Date.now())
      //------------------------Timer stop-----------------------------------
              message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 20000,
                  errors: ['time']
              })
                  .then(message => {
                      message = message.first()
                
                     if (message.content == Code) {
                       
                         //------------------------Timer for work-----------------------------------
                       //----------------check----------------
                      let author =  db.fetch(`worktimer_${message.author.id}`)

                      let timeout = 3000;

                      if (author !== null && timeout - (Date.now() - author) > 0) {
                      //----------------Check end----------------
                    let time = ms(timeout - (Date.now() - author));

                      const Coins = 2500;
                      
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
        
  
                         client.economy.addBal(message.author.id, Coins + coins);
                  

                        const Embed = new Discord.MessageEmbed()
                        .setAuthor(`Terrible work! [Too Fast!]` , message.author.avatarURL({dynamic : true , format : `png`}))
                        .setDescription("Gave you `2.5k Order coins` for your incomplete work.")
                        .setColor('RED')
                        .setFooter(`Rank ${Rank} [ +${coins} ]`)        
                        
                        
                        
                        db.add(`rankuppoints_${message.author.id}`, 1)
                        db.add(`totalrankpoints_${message.author.id}`, 1)
                        
                        //----------------COOLDOWN----------------
                        db.set(`workcd_${message.author.id}`, Date.now())
                        //----------------COOLDOWN----------------
                        
                        let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(Embed)
                          return message.channel.send(message.author , Embed)
      
                        } 
          //------------------------Timer for work-----------------------------------
                       
                      const Coins = 5000
                      
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
                       
                         client.economy.addBal(message.author.id, Coins + coins);
                    

                        const Embed = new Discord.MessageEmbed()
                        .setAuthor(`Nice work!` , message.author.avatarURL({dynamic : true , format : `png`}))
                        .setDescription("Gave you `5k Order coins` for your one of hour work.")
                        .setColor('GREEN')
                        .setFooter(`Rank ${Rank} [ +${coins} ]`)     
                        
                        db.add(`TotalWork_${message.author.id}`, 1)

                        db.add(`rankuppoints_${message.author.id}`, 5)
                         db.add(`totalrankpoints_${message.author.id}`, 5)
                        //----------------COOLDOWN----------------
                        db.set(`workcd_${message.author.id}`, Date.now())
                       
                       let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(Embed)
                        
                          return message.channel.send(message.author , Embed)
                      } else {

                        const Coins = 2500;
                        
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
                        
                         client.economy.addBal(message.author.id, Coins + coins);
                  

                        const Embed = new Discord.MessageEmbed()
                        .setAuthor(`Terrible work!` , message.author.avatarURL({dynamic : true , format : `png`}))
                        .setDescription("Gave you `2.5k Order coins` for your incomplete work.")
                        .setColor('RED')
                        .setFooter(`Rank ${Rank} [ +${coins} ]`)         
                        
                        db.add(`rankuppoints_${message.author.id}`, 1)
        db.add(`totalrankpoints_${message.author.id}`, 1)
                        //----------------COOLDOWN----------------
        db.set(`workcd_${message.author.id}`, Date.now())
                        
                        let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(Embed)

                          return message.channel.send(message.author , Embed)
                         
                      }
                  })
                  .catch(collected => {
                //----------------COOLDOWN----------------
        db.set(`workcd_${message.author.id}`, Date.now())
                
                      return message.reply('You took too long to response! *Wakeup kid!!*');
                  });
      
      
    
   
        
      }
  }
};
