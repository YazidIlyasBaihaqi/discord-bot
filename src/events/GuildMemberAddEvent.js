// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../utils/structures/BaseEvent');
const Discord = require('discord.js');
const Canvas = require('canvas');
const applyText = (canvas, text) => {
  const context = canvas.getContext('2d');
  console.log(context.measureText(text).width);
  let fontSize = 50;
  do {
    context.font = `${fontSize - Math.round(context.measureText(text).width / 35)}px sans-serif`;
  } while (context.measureText(text).width > canvas.width - 300);
  return context.font;
}

module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name == 'welcome');
    const canvas = Canvas.createCanvas(1024, 500);
    const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('./src/img/wallpaper.png');
    
    context.drawImage(background, 0, 0, canvas.width, canvas.height); 
    context.strokeStyle = '#74037b';
    context.strokeRect(0, 0, canvas.width, canvas.height);
    
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg'}));
    context.font = '40px sans-serif';
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.fillText('Welcome to Verystia', canvas.width / 2, 315);
    
    context.font = applyText(canvas, `${member.displayName}!`);
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.fillText(`${member.user.tag}!`, canvas.width / 2, 370);
    const y = 70;
    ///
    context.beginPath();
    context.arc(canvas.width / 2.485 + 100, 170, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    ///
    context.drawImage(avatar, canvas.width / 2.485, 70, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.jpg');
    welcomeChannel.send(`Welcome`, attachment);
  }
}