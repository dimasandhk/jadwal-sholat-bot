import Discord from "discord.js";
const client = new Discord.Client();

import ApiService from "./api/ApiService";

// Dotenv Config
import dotenv from "dotenv";
dotenv.config();

client.on("ready", (): void => console.log(`Logged in as ${client.user?.tag}`));

client.on("message", (msg) => {
	const qValue: string = msg.content.split("!jadwalsholat")[1];

	if (msg.content.includes("!jadwalsholat")) {
		if (!qValue) {
			msg.reply("Kamu bisa lihat list kota dengan ketik '!listkota'");
			return ApiService.fetchJadwal("Jakarta", msg);
		}

		return ApiService.fetchJadwal(qValue, msg);
	} else if (msg.content == "!listkota") {
		msg.reply(
			"Kamu bisa lihat di link ini:\nhttps://gist.github.com/dimasandhk/6f9e159176a75b99087a667727208cf5"
		);
	}
});

client.login(process.env.ID);
