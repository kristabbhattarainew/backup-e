const { Message, DiscordAPIError } = require(`discord.js`);
const Discord = require("discord.js");
const Client = require("../structures/Client");
module.exports = {
  name: `buyreactolddddddddddddddddddddddddddddddddddddddd`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    

    const authorbal = await client.economy.getBal(message.author.id)

    if(authorbal < 99000) return message.reply(`You need to have atleast <:order_coins:800022593184596028> 100k to buy anything from the shop. \n You have <:order_coins:800022593184596028> ${authorbal} right now!!`)

    message.reply('Check your DM to fill the form.')

    const questions = [`Your Tag`, `Your ID`, `React/Premium`, `Which react`, `Payment Type`, `Payment`, `More`, `Are you confirm?`];
    const dmChannel = await message.author.send('*Welcome to your form.* \n\nExample: \n Your Tag = [Your discord tag] \nYour ID = [Your discord ID] \nReact/Premium = [Which you are buying] \nWhich react = [Which react you are buying / if not then say none] \nPayment Type = [How will you pay for it. {Order coin or any there ?}] \nPayment = [How much will you pay] \nMore = [More to say] \n**-----------------------** \n**To cancel the form say `cancel form` in one answer and spam other answers** \n**-----------------------** ');
    const collector = dmChannel.channel.createMessageCollector((msg) => msg.author.id == message.author)
    let i = 0;
    const res = [];
    dmChannel.channel.send(questions[0])
    collector.on('collect', async(msg) => {
        if(questions.length == i) return collector.stop('MAX');
        const answer = msg.content;
        res.push({ question: questions[i], answer });
        i++;
        if(questions.length == i) return collector.stop('MAX');
        else {
            dmChannel.channel.send(questions[i]);
        }
    });
    collector.on('end', async(collected, reason) => {
        if(reason == 'MAX') {

          if(res.map(d => d.answer).includes("cancel form")) return message.reply('Canceled the form.');

          let suggestchannelid = '773072387881041930'

          const channel = client.channels.cache.get(suggestchannelid)
          if(!channel) return message.channel.send("Error occur, Channel can't be found! ");

            
            message.reply("Thanks for buying! \nWe will provide it to you as soon as possible");

            const Embed = new Discord.MessageEmbed()
            .setDescription(`**----------------------------**\n${res.map(d => `**${d.question}**: ${d.answer}`).join("\n\n")}\n\n**Posted by** ${message.member || message.author} (${message.author.tag}) \n\nPage 1/1`)
            .setTimestamp()
            .setColor("GREEN")

            channel.send(Embed)
        }
    })

  }
}