import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, bold } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const ping: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Bot Ping').setDMPermission(true).setNSFW(false),
  run: async (interaction: CommandInteraction) => {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true, ephemeral: true });
    interaction.editReply(`${bold('Ping')}: ${sent.createdTimestamp - interaction.createdTimestamp} ms`);
  },
};
