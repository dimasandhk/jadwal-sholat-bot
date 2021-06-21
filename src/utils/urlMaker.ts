import { endpoint } from "./var";

export default function (id: string) {
	const date = new Date().toISOString().split("T")[0];
	return `${endpoint}${id}/${date.replace(/-/g, "/")}`;
}
