import Discord from "discord.js";

export default function (title: string, objEntry: [string, [string, unknown]][]) {
	const embed = new Discord.MessageEmbed().setTitle(title).setColor("#3eaf7c");
	for (const [index, [key, value]] of objEntry) {
		if (Number(index)) {
			if (Number(index) !== objEntry.length - 1) {
				embed.addField(`${key[0].toUpperCase()}${key.slice(1)}:`, value, true);
			}
		}
	}

	return embed;
}
