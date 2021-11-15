const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const { MessageActionRow, MessageButton } = require("discord-buttons");

module.exports = {
  name: `inv`,
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
    
    //----------------Coupon Timer----------------
    
    let author1 = await db.fetch(`CouponTimer_${User.id}`)
  
    let timeout1 = 18000000;
    
    let time1;
    
    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) time1 = ms(timeout1 - (Date.now() - author1));
    
    if(time1 == undefined) db.delete(`Coupon_${User.id}`)
    
    //----------------Coupon Timer----------------
    
    let Coupon = db.get(`Coupon_${User.id}`)
    let OrderBoxes = db.get(`OrderBoxes_${User.id}`)
    let CommonBoxes = db.get(`CommonBoxes_${User.id}`)
    let UncommonBoxes = db.get(`UncommonBoxes_${User.id}`)
    let RareOrderCoins = db.get(`RareOrderCoins_${User.id}`)
    let OrderTrophy = db.get(`OrderTrophy_${User.id}`)
    let OrderMedal = db.get(`OrderMedal_${User.id}`)
    let Cookie = db.get(`Cookie_${User.id}`)
    let ChampionTrophy = db.get(`ChampionTrophy_${User.id}`)
    let Pumpkin = db.get(`Pumpkin_${User.id}`)
    let HalloweenBoxes = db.get(`HalloweenBoxes_${User.id}`)
    let PumpkinFace = db.get(`PumpkinFace_${User.id}`)
    let HalloweenCandy = db.get(`HalloweenCandy_${User.id}`)
    let GreenBugHunter = db.get(`GreenBugHunter_${User.id}`)
    let GoldenBugHunter = db.get(`GoldenBugHunter_${User.id}`)
    let Detective = db.get(`Detective_${User.id}`)
    
    
  const Embed = new Discord.MessageEmbed()
  Embed.setColor("GREEN")
  Embed.setAuthor(`${User.username} Inventory` , User.avatarURL({ dynamic: true, format: `png` }))
  Embed.setDescription(`__*Items Owned:*__`)
if(Coupon == "True") Embed.addField(`<:LuckyCoupon:866973938897387560>  __Lucky Coupon__ [ 1 ]` , "*ID*- `luckycoupon`" + `- ${time1} Remaining to expire`)
if(GreenBugHunter >= 1) Embed.addField(`<:GreenBugHunter:819505720860737558>  __Green Bug Hunter__ [ ${GreenBugHunter} ]` , "*ID*- `greenbughunter` - Flex")
if(GoldenBugHunter >= 1) Embed.addField(`<:GoldenBugHunter:819506190751891466>  __Golden Bug Hunter__ [ ${GreenBugHunter} ]` , "*ID*- `goldenbughunter` - Flex")
if(Detective >= 1) Embed.addField(`<:Detective:903188859125366804>  __Detective__ [ ${Detective} ]` , "*ID*- `detective` - Mysterious")
if(OrderBoxes >= 1) Embed.addField(`<:OrderBox:866972740173955073>  __Order Box__ [ ${OrderBoxes} ]` , "*ID*- `orderbox` - Loot Box")
if(CommonBoxes >= 1) Embed.addField(`<:CommonBox:868748504225431582>  __Common Box__ [ ${CommonBoxes} ]` , "*ID*- `commonbox` - Loot Box")
if(UncommonBoxes >= 1) Embed.addField(`<:UncommonBox:882270428540846121>  __Uncommon Box__ [ ${UncommonBoxes} ]` , "*ID*- `uncommonbox` - Loot Box")
if(HalloweenBoxes >= 1) Embed.addField(`<a:HalloweenBox:893154148940390400>  __Halloween Box__ [ ${HalloweenBoxes} ]` , "*ID*- `halloweenbox` - Loot Box")
    
      
  const Embed1 = new Discord.MessageEmbed()
  Embed1.setColor("GREEN")
  Embed1.setAuthor(`${User.username} Inventory` , User.avatarURL({ dynamic: true, format: `png` }))
  Embed1.setDescription(`__*Items Owned:*__`)
if(HalloweenCandy >= 1) Embed1.addField(`<:HalloweenCandy:893812881261486112>   __Halloween Candy__ [ ${HalloweenCandy} ]` , "*ID*- `halloweencandy` - Exchangable")
if(Cookie >= 1) Embed1.addField(`<:Cookie:868742411596201994>  __Cookie__ [ ${Cookie} ]` , "*ID*- `cookie` - Collectable")
if(Pumpkin >= 1) Embed1.addField(`<a:Pumpkin:893154578953011200>  __Pumpkin__ [ ${Pumpkin} ]` , "*ID*- `pumpkin` - Collectable")
if(ChampionTrophy >= 1) Embed1.addField(`<:ChampionTrophy:885517756303286282>  __Champion Trophy__ [ ${ChampionTrophy} ]` , "*ID*- `championtrophy` - Collectable")
if(OrderTrophy >= 1) Embed1.addField(`<a:OrderTrophy:867006413900218368>  __Order Trophy__ [ ${OrderTrophy} ]` , "*ID*- `ordertrophy` - Collectable")
if(OrderMedal >= 1) Embed1.addField(`<a:OrderMedal:868740832084238366>  __Order Medal__ [ ${OrderMedal} ]` , "*ID*- `ordermedal` - Collectable")
if(RareOrderCoins >= 1) Embed1.addField(`<a:RareOrderCoin:866972953533874187>  __Rare Order Coin__ [ ${RareOrderCoins} ]` , "*ID*- `rareordercoin` - Collectable")
if(PumpkinFace >= 1) Embed1.addField(`<a:PumpkinFace:893153361640185866>  __Pumpkin Face__ [ ${PumpkinFace} ]` , "*ID*- `pumpkinface` - Collectable")

       

     let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(Embed)
    Channel.send(Embed1)

    
    
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

    const MESSAGE = await message.channel.send(Embed, row);
 
    const filter = ( button ) => button.clicker.user.id === message.author.id 
    const collector = MESSAGE.createButtonCollector(filter, { time : 500000 });

    collector.on('collect', async (b) => {

        if(b.id == "front") {
          
          button2.setStyle("green")
          button2.setDisabled(true)
          button1.setStyle("green")
          button1.setDisabled(false)
          
    
          
          MESSAGE.edit(Embed1, { buttons: [button1, button2] });
          
            await b.reply.defer()

        }
      
      if(b.id == "back") {
          
          button1.setStyle("green")
          button1.setDisabled(true)
          button2.setStyle("green")
          button2.setDisabled(false)
    
          
          MESSAGE.edit(Embed, { buttons: [button1, button2] });
          
            await b.reply.defer()

        }

        


    })

    collector.on('end', (b) => {
      
        //----------------COOLDOWN----------------
            
          button1.setStyle("grey")
          button1.setDisabled(true)
          button2.setStyle("grey")
          button2.setDisabled(true)

          
             MESSAGE.edit(Embed, { buttons: [button1, button2] });
    })

       //---------------------------------------E N D----------------------------------------
    
      
        
      
  }
};
