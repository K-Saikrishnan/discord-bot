import { Interaction } from 'discord.js';
import { COMMANDS } from '../utils';

export const InteractionEvent = async (interaction: Interaction): Promise<void> => {
  try {
    if (!interaction.isCommand()) return;

    const command = COMMANDS.find((cmd) => cmd.data.name === interaction.commandName);
    if (command) {
      await command.run(interaction);
    }
  } catch (err) {
    console.log('Interaction Event: ', err);
  }
};
