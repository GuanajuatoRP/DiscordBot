# FROM node:lts

# # Create the bot's directory
# RUN mkdir -p /usr/src/GuanajuatoBot
# WORKDIR /usr/src/GuanajuatoBot

# COPY package.json /usr/src/GuanajuatoBot
# # COPY package.json ./

# RUN npm install

# COPY . /usr/src/GuanajuatoBot
# # COPY . .

# # Start the bot.
# RUN npm run build
# CMD ["npm", "run", "start"]



FROM node:latest

WORKDIR /home/node/app
ADD . .

ENV NODE_ENV=production
RUN npm ci

RUN chown -R node:node /home/node

CMD ["npm", "run","start"]