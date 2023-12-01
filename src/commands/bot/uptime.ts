import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, bold } from 'discord.js';
import { Command } from '../../interfaces/Command';

export const ping: Command = {
  data: new SlashCommandBuilder().setName('uptime').setDescription('Bot Uptime').setDMPermission(true).setNSFW(false),
  run: async (interaction: CommandInteraction) => {
    const SECONDS_IN_DAY = 86400,
      SECONDS_IN_HOUR = 3600,
      SECONDS_IN_MINUTE = 60;

    let totalSeconds = interaction.client.uptime / 1000;

    const days = Math.floor(totalSeconds / SECONDS_IN_DAY);

    totalSeconds %= SECONDS_IN_DAY;
    const hours = Math.floor(totalSeconds / SECONDS_IN_HOUR);

    totalSeconds %= SECONDS_IN_HOUR;
    const minutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE);

    const seconds = Math.floor(totalSeconds % SECONDS_IN_MINUTE);

    const human_readable_uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    await interaction.reply({ content: `${bold('Uptime')}: ${human_readable_uptime}`, ephemeral: true });
  },
};
