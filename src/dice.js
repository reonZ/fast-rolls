const ROLL_REGEX =
	/^\/(?:r|roll|publicroll|pr|gmroll|grm|blindroll|broll|br|selfroll|sr) (.+)/i;
const INLINE_REGEX = /\[\[([\dd+ -]+)\]\]$/i;

export const dice = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];

export async function processDie(event) {
	const die = event.currentTarget.dataset.die;

	if (!event.shiftKey) {
		rollDie(die, event.ctrlKey);
		return;
	}

	const chat = ui.chat.element.find("#chat-message");
	const str = chat.val().trim();

	if (!str) {
		chat.val(`/r 1${die}`);
		return;
	}

	if (ROLL_REGEX.test(str)) {
		chat.val(processChatRoll(die, str));
		return;
	}

	const match = str.match(INLINE_REGEX);
	if (!match) {
		chat.val(str + ` [[1${die}]]`);
		return;
	}

	const index = match.index;
	const sub = str.substring(index + 2, str.length - 2).trim();
	const newStr = `${str.substring(0, index)}[[${processChatRoll(die, sub)}]]`;
	chat.val(newStr);
}

function processChatRoll(die, str) {
	const DIE_REGEX = new RegExp(`(?<!- *)(\\d+)${die}`, "i");
	const match = str.match(DIE_REGEX);

	if (!match) return str + ` + 1${die}`;

	const index = match.index;
	const value = Number(match[1]);

	return str.substring(0, index) + (value + 1) + str.substring(index + 1);
}

async function rollDie(die, ctrlKey) {
	const roll = new Roll(`1${die}`);
	const rollMode = ctrlKey
		? CONST.DICE_ROLL_MODES.BLIND
		: CONST.DICE_ROLL_MODES.PUBLIC;
	await roll.evaluate({ async: true });
	roll.toMessage({}, { rollMode });
}
