import axios from "axios";
import Discord from "discord.js";

// Utils
import urlMaker from "../utils/urlMaker";
import { searchEndpoint } from "../utils/var";
import makeEmbed from "../utils/embed";

export default class {
	private static async getLocationId(location: string) {
		const response = await (await axios.get(`${searchEndpoint}${location}`)).data;
		if (!response.status) return "Kota Tidak Ketemu";

		return response.data[0].id;
	}
	public static async fetchJadwal(lokasi: string = "Jakarta", msg: Discord.Message) {
		let id: string = "1301";

		const getId = await this.getLocationId(lokasi.trim());
		if (getId == "Kota Tidak Ketemu") return msg.reply("Kota Tidak Ketemu");
		id = getId;

		const response = await (await axios.get(urlMaker(id))).data;

		const jadwal = response.data.jadwal;
		const judul = `${response.data.lokasi} (${jadwal.tanggal})`;
		const arrOfJadwal = Object.entries(Object.entries(jadwal));

		msg.channel.send(makeEmbed(judul, arrOfJadwal));
	}
}
