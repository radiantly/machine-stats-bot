const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const computeStatistics = require("./modules/computeStatistics");

console.log("Reading config.json");
const { token, updateInterval } = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "config.json"))
);

if (!token) {
  console.error("Error reading config file. Exiting.");
  process.exit(1);
}

const client = new Discord.Client();

const statusChange = async client => {
  const { cpu, usedMem: freeMem, totalMem } = await computeStatistics();
  client.user.setActivity(`CPU: ${cpu}% | RAM: ${freeMem}/${totalMem}GB`, {
    type: "PLAYING",
  });
};

client.once("ready", () => {
  console.info(`${client.user.tag} initialized!`);
  // client.user.setUsername("Machine stats");
  setInterval(statusChange, updateInterval * 1000, client);
});

client.login(token);
