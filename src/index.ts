import Discord from "discord.js";
import fetch from "node-fetch";

const client = new Discord.Client();

// Utils
import urlMaker from "./utils/urlMaker";
import { searchEndpoint } from "./utils/var";
import makeEmbed from "./utils/embed";

// Dotenv Config
import dotenv from "dotenv";
dotenv.config();

client.on("ready", (): void => console.log(`Logged in as ${client.user?.tag}`));

client.on("message", (msg) => {
	const qValue: string = msg.content.split("!jadwalsholat")[1];
	const getLocationId = async (location: string) => {
		const raw = await fetch(`${searchEndpoint}${location}`);
		const response = await raw.json();

		if (!response.status) return "Kota Tidak Ketemu";

		return response.data[0].id;
	};

	const fetchJadwal = async (lokasi: string = "Jakarta") => {
		let id: string = "1301";
		const getId = await getLocationId(lokasi.trim());
		if (getId == "Kota Tidak Ketemu") {
			return msg.reply("Kota Tidak Ketemu");
		}

		id = getId;
		const rawJadwal = await fetch(urlMaker(id));
		const dataJadwal = await rawJadwal.json();

		const jadwal = dataJadwal.data.jadwal;
		const judul = `${dataJadwal.data.lokasi} (${jadwal.tanggal})`;

		const arrOfJadwal = Object.entries(Object.entries(jadwal));
		msg.channel.send(makeEmbed(judul, arrOfJadwal));
	};

	if (msg.content.includes("!jadwalsholat")) {
		if (!qValue) {
			msg.reply("Kamu bisa lihat list kota dengan ketik '!listkota'");
			return fetchJadwal();
		}

		return fetchJadwal(qValue);
	} else if (msg.content == "!listkota") {
		msg.reply(
			"Kamu bisa lihat di link ini:\nhttps://gist.github.com/dimasandhk/6f9e159176a75b99087a667727208cf5"
		);
	}
});

client.login(process.env.ID);
