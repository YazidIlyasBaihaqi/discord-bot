const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const Canvas = require('canvas');
const applyText = (canvas, text) => {
  const context = canvas.getContext('2d');
  console.log(context.measureText(text).width);
  let fontSize = 50;
  do {
    context.font = `${fontSize - context.measureText(text).width / 100}px sans-serif`;
  } while (context.measureText(text).width > canvas.width - 300);
  return context.font;
}

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    const canvas = Canvas.createCanvas(1024, 500);
    const context = canvas.getContext('2d');
    const mentionedMember = message.mentions.members.first();
    const background = await Canvas.loadImage('./src/img/wallpaper.png');
    
    context.drawImage(background, 0, 0, canvas.width, canvas.height); 
    context.strokeStyle = '#74037b';
    context.strokeRect(0, 0, canvas.width, canvas.height);
    
    const avatar = await Canvas.loadImage(mentionedMember.user.displayAvatarURL({ format: 'jpg'}));
    context.font = '40px sans-serif';
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.fillText('Welcome to the server,', canvas.width / 2, 325);
    
    context.font = applyText(canvas, `${mentionedMember.displayname}!`);
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.fillText(`${mentionedMember.user.tag}!`, canvas.width / 2, 370);

    ///
    context.beginPath();
    context.arc(canvas.width / 2.5 + 100, 184, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    ///
    context.drawImage(avatar, canvas.width / 2.5, 84, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.jpg');
  }
}