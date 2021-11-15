const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const Boxes = require("../boxes");

module.exports = {
  name: `use`,
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
    
    
    //  if(message.author.id !== "598524997954306048") return message.reply("This command is under development right now! Please wait sometime until its finished.")
    
     //----------------Coupon Timer----------------
    
    let author1 = await db.fetch(`CouponTimer_${message.author.id}`)
  
    let timeout1 = 18000000;
    
    let time1;
    
    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) time1 = ms(timeout1 - (Date.now() - author1));
    
    if(time1 == undefined) db.delete(`Coupon_${message.author.id}`)
    
    //----------------Coupon Timer----------------
    
    let Coupon = db.get(`Coupon_${message.author.id}`)
    
      //--------------------------------------------------OPEN-----------------------------
    if(!args[0]) return message.reply(`You need to give the item id to use it!`)
  
  if(!args[1]) return message.reply("Please give the number of item you want to use!")
  
  let SPINS  = ms(args[1])
  if(isNaN(SPINS)) return message.reply("Given number of item is invalid!")
    
    
    let OrderBoxes = db.get(`OrderBoxes_${message.author.id}`)
    
    let CommonBoxes = db.get(`CommonBoxes_${message.author.id}`) //cookie - money [500] - Trophy
    let UncommonBoxes = db.get(`UncommonBoxes_${message.author.id}`) //Money [2500] - Medal
    let RareBoxes = db.get(`RareBoxes_${message.author.id}`) //Money [5000] - GoldenCrown
    let LegendaryBoxes = db.get(`LegendaryBoxes_${message.author.id}`)
    let MythicBoxes = db.get(`MythicBoxes_${message.author.id}`)
    let HalloweenBox = db.get(`HalloweenBoxes_${message.author.id}`) //1500 - pumpkin - pumpkinface
    
    
    
      
    if(args[0] == "orderbox") {
    
    if(!OrderBoxes || OrderBoxes < SPINS) return message.reply("You dont have that many Order Boxes!")
      
      db.subtract(`OrderBoxes_${message.author.id}`, SPINS)
      
     
  const Spiningmsg = await message.channel.send(`<a:loading:840232329079291924> Opening ${SPINS}  Order Boxes...`)
  
  let spinedMoney = 0;
   
     //------------------------RARECOIN----------------------------
   let spinedCoin = 0;
    //------------------------RARECOIN----------------------------
   
   let spincount = 0;
   
   let STOP = setInterval(() => {

if(spincount == SPINS) {
  clearInterval(STOP);
  
    let sendMoney = "";
  
    let luckyadd = 1
    if(Coupon == "True") luckyadd = 1000 * spinedMoney
  
  let wonMoney = Math.floor(Math.random() * 5000 * spinedMoney) + luckyadd
   if(wonMoney > 1 ) {
     client.economy.addBal(message.author.id, wonMoney);
     sendMoney = `${wonMoney} Order Coins`
   }
  
    
    
  let wonCoin = ""
  if(spinedCoin >= 1 ) {
    wonCoin = `${spinedCoin} Rare Order Coin <a:RareOrderCoin:866972953533874187>`;
    
    db.add(`RareOrderCoins_${message.author.id}`, spinedCoin)
  }
  
    let cMsg = "without Lucky Coupon"
  if(Coupon == "True")  cMsg = "with <:LuckyCoupon:866973938897387560> **Lucky Coupon** [+10% luck]"
  
  Spiningmsg.edit(`<:OrderBox:866972740173955073> *Successfully opened ${spincount} Order Boxes ${cMsg} and got:*
**${sendMoney}
${wonCoin}**
`);
  
  return;
}
     
  let RewardItems = Boxes.orderbox.normalitems
  if(Coupon == "True") Boxes.orderbox.luckyitems

      
      const Random = RewardItems[Math.floor(Math.random() * RewardItems.length)];

       //------------------------MONEY----------------------------
     if(Random == "Money") spinedMoney++
       //------------------------MONEY----------------------------
     
      //------------------------RARECOIN----------------------------
     
     if(Random == "RareCoin") spinedCoin++
     
      //------------------------RARECOIN----------------------------

spincount++

}, 1)

   return;
   }
    
    
    //---------------------------------------------------------------------------------------------------------------------
    
    
    
    
    if(args[0] == "commonbox") {
    
    if(!CommonBoxes || CommonBoxes < SPINS) return message.reply("You dont have that many Common Boxes!")
      
      db.subtract(`CommonBoxes_${message.author.id}`, SPINS)
      
     const Spiningmsg = await  message.channel.send(`<a:loading:840232329079291924> Opening ${SPINS} Common Boxes...`)
  
  let spinedMoney = 0;
  let spinedCookie = 0;
  let spinedTrophy = 0;
   
   
   let spincount = 0;
   
   let STOP1 = setInterval(() => {

if(spincount == SPINS) {
  clearInterval(STOP1);
  
  let sendMoney = ""
  
  let luckyadd = 1
    if(Coupon == "True") luckyadd = 100 * spinedMoney
  
  let wonMoney = Math.floor(Math.random() * 500 * spinedMoney) + luckyadd
   if(wonMoney > 1 ) {
     client.economy.addBal(message.author.id, wonMoney);
     sendMoney = `${wonMoney} Order Coins`
   }
  
   let wonCookie = ""
  if(spinedCookie >= 1 ) {
    wonCookie = `${spinedCookie} Cookie <:cookie:553980430760804352>`
    db.add(`Cookie_${message.author.id}`, spinedCookie)
  }
  
   let wonTrophy = ""
  if(spinedTrophy >= 1 ) {
    wonTrophy = `${spinedTrophy} Order Trophy <a:OrderTrophy:867006413900218368>`
    db.add(`OrderTrophy_${message.author.id}`, spinedTrophy)
  }
  
  let cMsg = "without Lucky Coupon"
  if(Coupon == "True")  cMsg = "with <:LuckyCoupon:866973938897387560> **Lucky Coupon** [+10% luck]"
  
  Spiningmsg.edit(`*Successfully opened ${spincount} Common Boxes ${cMsg} and got:*
**${sendMoney}
${wonCookie}
${wonTrophy}**
`);
  
  return
}
     
    let RewardItems = Boxes.commonbox.normalitems
  if(Coupon == "True") Boxes.commonbox.luckyitems
      
      const Random = RewardItems[Math.floor(Math.random() * RewardItems.length)];

       //------------------------MONEY----------------------------
     if(Random == "Money") spinedMoney++
       //------------------------MONEY----------------------------
     
      //------------------------Trophy----------------------------
     
     if(Random == "OrderTrophy") spinedTrophy++
     
      //------------------------Trophy----------------------------
     if(Random == "Cookie") spinedCookie++

spincount++

}, 1)
   return;

   }
    
    
        //---------------------------------------------------------------------------------------------------------------------
    
    
    
    
    if(args[0] == "uncommonbox") {
    
    if(!UncommonBoxes || UncommonBoxes < SPINS) return message.reply("You dont have that many Uncommon Boxes!")
      
      db.subtract(`UncommonBoxes_${message.author.id}`, SPINS)
      
     const Spiningmsg = await  message.channel.send(`<a:loading:840232329079291924> Opening ${SPINS} Uncommon Boxes...`)
  
  let spinedMoney = 0;
  let spinedMedal = 0;
   
   
   let spincount = 0;
   
   let STOP2 = setInterval(() => {

if(spincount == SPINS) {
  clearInterval(STOP2);
  
  let sendMoney = ""
  
  let luckyadd = 1
    if(Coupon == "True") luckyadd = 1000 * spinedMoney
  
  let wonMoney = Math.floor(Math.random() * 2500 * spinedMoney) + luckyadd
   if(wonMoney > 1 ) {
     client.economy.addBal(message.author.id, wonMoney);
     sendMoney = `${wonMoney} Order Coins`
   }
  

  
   let wonMedal = ""
  if(spinedMedal >= 1 ) {
    wonMedal = `${spinedMedal} Order Medal <a:OrderMedal:868740832084238366>`
    db.add(`OrderMedal_${message.author.id}`, spinedMedal)
  }
  
  let cMsg = "without Lucky Coupon"
  if(Coupon == "True")  cMsg = "with <:LuckyCoupon:866973938897387560> **Lucky Coupon** [+10% luck]"
  
  Spiningmsg.edit(`*Successfully opened ${spincount} Uncommon Boxes ${cMsg} and got:*
**${sendMoney}
${wonMedal}**
`);
  
  return
}
     
    let RewardItems = Boxes.uncommonbox.normalitems
  if(Coupon == "True") Boxes.uncommonbox.luckyitems
      
      const Random = RewardItems[Math.floor(Math.random() * RewardItems.length)];

       //------------------------MONEY----------------------------
     if(Random == "Money") spinedMoney++
       //------------------------MONEY----------------------------
     
      //------------------------Trophy----------------------------
     
     if(Random == "OrderMedal") spinedMedal++
     
      //------------------------Trophy----------------------------
  

spincount++

}, 1)
   return;

   }
    
    
    //---------------------------------------------------------------------------------------------------------------------
    
    
    
    
    if(args[0] == "halloweenbox") {
    
    if(!HalloweenBox || HalloweenBox < SPINS) return message.reply("You dont have that many Halloween Boxes!")
      
      db.subtract(`HalloweenBoxes_${message.author.id}`, SPINS)
      
     const Spiningmsg = await  message.channel.send(`<a:loading:840232329079291924> Opening ${SPINS} Halloween Boxes...`)
  
  let spinedMoney = 0;
  let spinedPumpkin = 0;
  let spinedPumpkinFace = 0;
   
   
   let spincount = 0;
   
   let STOP2 = setInterval(() => {

if(spincount == SPINS) {
  clearInterval(STOP2);
  
  let sendMoney = ""
  
  let luckyadd = 1
    if(Coupon == "True") luckyadd = 1000 * spinedMoney
  
  let wonMoney = Math.floor(Math.random() * 2500 * spinedMoney) + luckyadd
   if(wonMoney > 1 ) {
     client.economy.addBal(message.author.id, wonMoney);
     sendMoney = `${wonMoney} Order Coins`
   }
  

  
   let wonPumpkin = ""
  if(spinedPumpkin >= 1 ) {
    wonPumpkin = `${spinedPumpkin} Pumpkin <a:Pumpkin:893154578953011200>`
    db.add(`Pumpkin_${message.author.id}`, spinedPumpkin)
  }
  
  let wonPumpkinFace = ""
  if(spinedPumpkinFace >= 1 ) {
    wonPumpkin = `${spinedPumpkinFace} PumpkinFace <a:PumpkinFace:893153361640185866>`
    db.add(`PumpkinFace_${message.author.id}`, spinedPumpkinFace)
  }
  
  let cMsg = "without Lucky Coupon"
  if(Coupon == "True")  cMsg = "with <:LuckyCoupon:866973938897387560> **Lucky Coupon** [+10% luck]"
  
  Spiningmsg.edit(`*Successfully opened ${spincount} Halloween Boxes ${cMsg} and got:*
**${sendMoney}
${wonPumpkin}
${wonPumpkinFace}**
`);
  
  return
}
     
    let RewardItems = Boxes.halloweenbox.normalitems
  if(Coupon == "True") Boxes.halloweenbox.luckyitems
      
      const Random = RewardItems[Math.floor(Math.random() * RewardItems.length)];

       //------------------------MONEY----------------------------
     if(Random == "Money") spinedMoney++
       //------------------------MONEY----------------------------
     
      //------------------------Pumpkin----------------------------
     
     if(Random == "Pumpkin") spinedPumpkin++
     
      //------------------------Pumpkin----------------------------
     
     //------------------------Pumpkin----------------------------
     
     if(Random == "PumpkinFace") spinedPumpkinFace++
     
      //------------------------Pumpkin----------------------------
  

spincount++

}, 1)
   return;

   }
    
    
    return message.reply(`Please give the valid item id!`)
  }
};