var $1623e5e7c705b7c7$export$2e2bcd8739ae039 = "fast-rolls";



function $ee65ef5b7d5dd2ef$export$f6ed52839c6955bc(...path) {
    return `${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}.settings.${path.join(".")}`;
}
function $ee65ef5b7d5dd2ef$export$79b67f6e2f31449(...path) {
    return `flags.${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}.${path.join("/")}`;
}
function $ee65ef5b7d5dd2ef$export$bdd507c72609c24e(...path) {
    path = path.filter((x)=>typeof x === "string");
    return `modules/${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}/templates/${path.join("/")}`;
}
function $ee65ef5b7d5dd2ef$export$6d1a79e7c04100c2(...path) {
    return `modules/${0, $1623e5e7c705b7c7$export$2e2bcd8739ae039}/images/${path.join("/")}`;
}



const $ec48d763a317d2a2$var$ROLL_REGEX = /^\/(?:r|roll|publicroll|pr|gmroll|grm|blindroll|broll|br|selfroll|sr) (.+)/i;
const $ec48d763a317d2a2$var$INLINE_REGEX = /\[\[([\dd+ -]+)\]\]$/i;
const $ec48d763a317d2a2$export$19a18205b2511a55 = [
    "d4",
    "d6",
    "d8",
    "d10",
    "d12",
    "d20",
    "d100"
];
async function $ec48d763a317d2a2$export$73650d10343c6963(event) {
    const die = event.currentTarget.dataset.die;
    if (!event.shiftKey) {
        $ec48d763a317d2a2$var$rollDie(die, event.ctrlKey);
        return;
    }
    const chat = ui.chat.element.find("#chat-message");
    const str = chat.val().trim();
    if (!str) {
        chat.val(`/r 1${die}`);
        return;
    }
    if ($ec48d763a317d2a2$var$ROLL_REGEX.test(str)) {
        chat.val($ec48d763a317d2a2$var$processChatRoll(die, str));
        return;
    }
    const match = str.match($ec48d763a317d2a2$var$INLINE_REGEX);
    if (!match) {
        chat.val(str + ` [[1${die}]]`);
        return;
    }
    const index = match.index;
    const sub = str.substring(index + 2, str.length - 2).trim();
    const newStr = str.substring(0, index) + "[[" + $ec48d763a317d2a2$var$processChatRoll(die, sub) + "]]";
    chat.val(newStr);
}
function $ec48d763a317d2a2$var$processChatRoll(die, str) {
    const DIE_REGEX = new RegExp(`(?<!- *)(\\d+)${die}`, "i");
    const match = str.match(DIE_REGEX);
    if (!match) return str + ` + 1${die}`;
    const index = match.index;
    const value = Number(match[1]);
    return str.substring(0, index) + (value + 1) + str.substring(index + 1);
}
async function $ec48d763a317d2a2$var$rollDie(die, ctrlKey) {
    const roll = new Roll(`1${die}`);
    const rollMode = ctrlKey ? CONST.DICE_ROLL_MODES.BLIND : CONST.DICE_ROLL_MODES.PUBLIC;
    await roll.evaluate({
        async: true
    });
    roll.toMessage({}, {
        rollMode: rollMode
    });
}


async function $cf4c32f03d9bb335$export$ab4665cb6d8045f5(chatLog, $html) {
    await $cf4c32f03d9bb335$var$injectDice($html);
    $cf4c32f03d9bb335$var$addListeners($html);
}
async function $cf4c32f03d9bb335$var$injectDice(html) {
    const data = {
        light: game.settings.get((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039), "light"),
        dice: (0, $ec48d763a317d2a2$export$19a18205b2511a55).map((x)=>({
                type: x,
                img: (0, $ee65ef5b7d5dd2ef$export$6d1a79e7c04100c2)(`${x}.webp`)
            }))
    };
    const template = await renderTemplate((0, $ee65ef5b7d5dd2ef$export$bdd507c72609c24e)("dice.html"), data);
    html.find("#chat-form").after(template);
}
function $cf4c32f03d9bb335$var$addListeners(html) {
    html.find("#fast-rolls-chat-dice .fast-rolls-die").on("click", (0, $ec48d763a317d2a2$export$73650d10343c6963));
}


Hooks.on("setup", ()=>{
    game.settings.register((0, $1623e5e7c705b7c7$export$2e2bcd8739ae039), "light", {
        name: "Light Dice",
        type: Boolean,
        default: false,
        config: true,
        scope: "client",
        onChange: (value)=>{
            ui.chat.element.find("#fast-rolls-chat-dice").toggleClass("light", value);
        }
    });
});
Hooks.on("renderChatLog", (0, $cf4c32f03d9bb335$export$ab4665cb6d8045f5));


//# sourceMappingURL=main.js.map
