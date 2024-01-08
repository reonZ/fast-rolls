import { dice, processDie } from "./dice.js";
import { getSetting, imagePath, templatePath } from "./module.js";

export async function renderChatLog(chatLog, html) {
	await injectDice(html);
	addListeners(html);
}

async function injectDice(html) {
	const data = {
		light: getSetting("light"),
		dice: dice.map((x) => ({ type: x, img: imagePath(x) })),
	};

	const template = await renderTemplate(templatePath("dice"), data);
	html.find("#chat-form").after(template);
}

function addListeners(html) {
	html.find("#fast-rolls-chat-dice .fast-rolls-die").on("click", processDie);
}
