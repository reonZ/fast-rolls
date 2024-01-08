export const MODULE_ID = "fast-rolls";

export function templatePath(...path) {
	const pathStr = path.filter((x) => typeof x === "string").join("/");
	return `modules/${MODULE_ID}/templates/${pathStr}.hbs`;
}

export function imagePath(...path) {
	const pathStr = path.filter((x) => typeof x === "string").join("/");
	return `modules/${MODULE_ID}/images/${pathStr}.webp`;
}

export function getSetting(setting) {
	return game.settings.get(MODULE_ID, setting);
}
