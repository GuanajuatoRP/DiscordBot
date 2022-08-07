FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/GuanajuatoBot
WORKDIR /usr/src/GuanajuatoBot

# COPY package.json /usr/src/GuanajuatoBot
COPY package.json ./
RUN npm install

# COPY . /usr/src/GuanajuatoBot
COPY . .

# Start the bot.
CMD ["npm", "run", "start"]