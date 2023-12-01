import { Client, GatewayIntentsString } from 'discord.js';

import { InteractionEvent } from './events/interaction';
import { ReadyEvent } from './events/ready';
import { ENV_VARS, validateEnvVars } from './utils';

(async () => {
  if (!validateEnvVars()) return;

  const INTENTS: GatewayIntentsString[] = ['Guilds', 'GuildMessages'];
  const BOT = new Client({ intents: INTENTS });

  BOT.on('ready', async () => await ReadyEvent(BOT));
  BOT.on('interactionCreate', async (interaction) => await InteractionEvent(interaction));

  await BOT.login(ENV_VARS.BOT_TOKEN);
})();
