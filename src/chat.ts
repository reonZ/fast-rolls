import { imagePath, templatePath } from './@utils/foundry/path'
import { dice, processDie } from './dice'

export async function renderChatLog(chatLog: ChatLog, $html: JQuery) {
    await injectDice($html)
    addListeners($html)
}

async function injectDice(html: JQuery) {
    const data = {
        dice: dice.map(x => ({ type: x, img: imagePath(`${x}.webp`) })),
    }

    const template = await renderTemplate(templatePath('dice.html'), data)
    html.find('#chat-form').after(template)
}

function addListeners(html: JQuery) {
    html.find('#fast-rolls-chat-dice .fast-rolls-die').on('click', processDie)
}
