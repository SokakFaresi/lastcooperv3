const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let tag = args.join(" ");
  
  if (!tag) return message.reply('Tag ayarlamak için bir tag girmelisin! örn: c!ag VD | {uye} ')
  
  db.set(`tag_${message.guild.id}`, tag);
  
  message.channel.send(`Tag başarıyla \`\`\`${tag}\`\`\` olarak ayarlandı!`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tag-ayarla"],
  permLevel: 3
}
exports.help = {
  name: "tag",
  description: "Tag ayarlama komutudur.",
  usage: "-tag <tag>"
}
