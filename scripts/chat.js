import { dice, processDie } from './dice.js'
import { imagePath, templatePath } from './utils/foundry.js'

/**
 * @param {ChatLog} chatLog
 * @param {JQuery} $html
 */
export async function renderChatLog(chatLog, $html) {
    await injectDice($html)
    addListeners($html)
}

/** @param {JQuery} $html */
async function injectDice($html) {
    const data = {
        dice: dice.map(x => ({ type: x, img: imagePath(`${x}.webp`) })),
    }

    const template = await renderTemplate(templatePath('dice.html'), data)
    $html.find('#chat-form').after(template)
}

/** @param {JQuery} $html */
function addListeners($html) {
    $html.find('#fast-rolls-chat-dice .fast-rolls-die').on('click', processDie)
}
