import { Bot, session } from 'grammy';
import { composer } from './composers';
import { router as addRouter } from './routers/add';
import { router as multiplyRouter } from './routers/multiply';

import type { CustomContext } from './types/CustomContext';
import type { SessionData } from './types/SessionData';

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  throw Error('BOT_TOKEN is required');
}

const bot = new Bot<CustomContext>(botToken);
bot.use(session({
  initial: (): SessionData => ({
    route: '',
    leftOperand: 0,
    rightOperand: 0,
  })
}));

// Routed middlewares
bot.use(addRouter);
bot.use(multiplyRouter);

// Routeless middlewares
bot.use(composer);

bot.start();
