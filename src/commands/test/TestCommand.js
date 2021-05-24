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
    const welcomeChannel = message.guild.channels.cache.get('843377572448567333');
    welcomeChannel.send('test diterima');
  }
}