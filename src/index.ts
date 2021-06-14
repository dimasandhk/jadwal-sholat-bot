import Discord from "discord.js";
const client = new Discord.Client();

// Dotenv Config
import dotenv from "dotenv";
dotenv.config();

client.on("ready", () => console.log(`Logged in as ${client.user?.tag}`));

client.login(process.env.ID);
