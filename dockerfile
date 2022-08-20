FROM node:lts

# # Create the bot's directory
RUN mkdir -p /home/node/GuanajuatoBot
WORKDIR /home/node/GuanajuatoBot
EXPOSE 56248
ADD . .

ENV NODE_ENV=production
RUN npm ci

RUN chown -R node:node /home/node

CMD ["npm", "run","start"]