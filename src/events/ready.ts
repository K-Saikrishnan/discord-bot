import { REST } from '@discordjs/rest';
import { APIApplicationCommandOption, Routes } from 'discord-api-types/v9';
import { Client } from 'discord.js';
import { COMMANDS, ENV_VARS } from '../utils';

export const ReadyEvent = async (BOT: Client): Promise<void> => {
  try {
    const rest = new REST().setToken(ENV_VARS.BOT_TOKEN);
    const commands = COMMANDS.map(
      (command) =>
        command.data.toJSON() as {
          name: string;
          description?: string;
          type?: number;
          options?: APIApplicationCommandOption[];
        },
    );

    console.log(`Registering ${commands.length} Slash Command(s)`);
    await rest.put(Routes.applicationCommands(ENV_VARS.APPLICATION_ID), { body: commands });
    console.log(`Bot Online! ${BOT.user?.tag}`);
  } catch (err) {
    console.log('Ready Event: ', err);
  }
};
