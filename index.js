import { Client } from "discord.js";
import { computeStatistics } from "./modules/computeStatistics.js";
import config from "./config.js";

const { token, updateInterval } = config;

const client = new Client();

const statusChange = async () => {
  const { cpu, usedMem: freeMem, totalMem } = await computeStatistics();
  client.user.setActivity(`CPU: ${cpu}% | RAM: ${freeMem}/${totalMem}GB`, {
    type: "PLAYING",
  });
};

client.once("ready", () => {
  // client.user.setUsername("Machine stats");
  setInterval(statusChange, updateInterval * 1000);
});

client.login(token);
