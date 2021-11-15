const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const Rewards = require("../rank-reward.json")

module.exports = {
  name: `quests`,
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
    
    //----------------------------------------- Quest Num  ----------------------------------------
    
    let qNum1 = Math.floor(Math.random() * 9) + 1;
    
    let qNum2 = Math.floor(Math.random() * 8) + 1;
    
    let qNum3 = Math.floor(Math.random() * 8) + 1;
    
    
    
    //----------------------------------------- Quests  ----------------------------------------
    
    let q1 = "Master Hunter"
    let q2 = "Gambler"
    let q3 = "Master Fisherman"
    let q4 = "Master Begger"
    let q5 = "Ture Employee"
    let q6 = "Master Miner"
    let q7 = "Master Adventurer "
    let q8 = "Master RPS Player"
    let q9 = "Very Rich Person"
    
    
    //----------------------------------------- Quest Selector  ----------------------------------------
    
    let quest1 = "None"
    
    if(qNum1 == 1) quest1 = q1 
    if(qNum1 == 2) quest1 = q2
    if(qNum1 == 3) quest1 = q3 
    if(qNum1 == 4) quest1 = q4 
    if(qNum1 == 5) quest1 = q5 
    if(qNum1 == 6) quest1 = q6 
    if(qNum1 == 7) quest1 = q7 
    if(qNum1 == 8) quest1 = q8 
    if(qNum1 == 9) quest1 = q9 
    
    let quest2 = "None"
    
    if(qNum2 == 1) quest2 = q1 
    if(qNum2 == 2) quest2 = q2
    if(qNum2 == 3) quest2 = q3 
    if(qNum2 == 4) quest2 = q4 
    if(qNum2 == 5) quest2 = q5 
    if(qNum2 == 6) quest2 = q6 
    if(qNum2 == 7) quest2 = q7 
    if(qNum2 == 8) quest2 = q8 
    if(qNum2 == 9) quest2 = q9 
    
    
    let quest3 = "None"
    
    if(qNum3 == 1) quest3 = q1 
    if(qNum3 == 2) quest3 = q2
    if(qNum3 == 3) quest3 = q3 
    if(qNum3 == 4) quest3 = q4 
    if(qNum3 == 5) quest3 = q5 
    if(qNum3 == 6) quest3 = q6 
    if(qNum3 == 7) quest3 = q7 
    if(qNum3 == 8) quest3 = q8 
    if(qNum3 == 9) quest3 = q9 
    
    //-----------------------------------------   ----------------------------------------
    
    //-----------------------------------------   ----------------------------------------
    
    //-----------------------------------------   ----------------------------------------
    
    //-----------------------------------------   ----------------------------------------
    
    //-----------------------------------------   ----------------------------------------
    

   
    const embed = new Discord.MessageEmbed()
    .setTitle(`Daily Quests`)
    .setDescription(`Complete daily quest to gain some Order Coins!`)
    .addField(`${quest1}`, qNum1)
    .addField(`${quest2}`, qNum2)
    .addField(`${quest3}`, qNum3)
    .setColor("GREEN")
    
    message.channel.send(embed)
   
  }
};
