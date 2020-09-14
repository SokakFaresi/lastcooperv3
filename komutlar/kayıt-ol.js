const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let ch = await db.fetch(`kayitC_${message.guild.id}`);
  let ar = await db.fetch(`kayitA_${message.guild.id}`);
  let vr = await db.fetch(`kayitV_${message.guild.id}`);
  let lh = await db.fetch(`kayitLC_${message.guild.id}`);
  
  if (!ch) return 
  if (!ar) return
  if (!vr) return 
  if (!lh) return
  
  let isim = args[0]
  let yas = args[1];
  
  if (!isim) return message.reply('İsminizi ve yaşınızı giriniz!')
  if (!yas) return message.reply('İsminizi ve yaşınızı giriniz!')
  
  message.channel.send("Başarı ile kayıt oldunuz!");
  message.member.setNickname(`${isim} | ${yas}`)
  message.member.removeRole(message.guild.roles.get(ar));
  message.member.addRole(message.guild.roles.get(vr));
  client.channels.get(lh).send(`\`${message.author.username}\` adlı kullanıcı kayıt oldu!`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kayıt-ayarla"],
  permLevel: 0
}
exports.help = {
  name: "kayıt",
  description: "Kayıt olmanızı sağlar.",
  usage: "kayıt"
}
