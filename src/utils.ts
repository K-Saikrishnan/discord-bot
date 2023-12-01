import * as fs from 'fs';
import { env } from 'node:process';
import * as path from 'path';
import { Command } from './interfaces/Command';

export const ENV_VARS = {
  BOT_TOKEN: process.env.BOT_TOKEN as string,
  APPLICATION_ID: process.env.APPLICATION_ID as string,
};

export function validateEnvVars(): boolean {
  return Object.keys(ENV_VARS).every((key) => {
    if (!env[key]) {
      console.log(`Missing Environment Variable(s): ${key}`);
      process.exit(1);
    }
    return true;
  });
}

export const COMMANDS = ((): Command[] => {
  const commands: Command[] = [];

  const JS_EXTENSION = '.js';
  const foldersPath = path.join(__dirname, 'commands');
  const commandsFolders = fs.readdirSync(foldersPath);

  for (const folder of commandsFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(JS_EXTENSION));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const command = require(filePath);
      const key = Object.keys(command)[0];
      commands.push(command[key]);
    }
  }
  return commands;
})();
