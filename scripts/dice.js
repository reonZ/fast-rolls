const ROLL_REGEX = /^\/(?:r|roll|publicroll|pr|gmroll|grm|blindroll|broll|br|selfroll|sr) (.+)/i
const INLINE_REGEX = /\[\[([\dd+ -]+)\]\]$/i

export const dice = [
    { type: 'd4', img: 'icons/dice/d4black.svg' },
    { type: 'd6', img: 'icons/dice/d6black.svg' },
    { type: 'd8', img: 'icons/dice/d8black.svg' },
    { type: 'd10', img: 'icons/dice/d10black.svg' },
    { type: 'd12', img: 'icons/dice/d12black.svg' },
    { type: 'd20', img: 'icons/dice/d20black.svg' },
]

/** @param {JQuery.ClickEvent<any, any, HTMLElement>} event */
export async function processDie(event) {
    const die = /** @type {string} */ (event.currentTarget.dataset.die)

    if (!event.shiftKey) {
        rollDie(die, event.ctrlKey)
        return
    }

    const $chat = ui.chat.element.find('#chat-message')
    const str = /** @type {string} */ ($chat.val()).trim()

    if (!str) {
        $chat.val(`/r 1${die}`)
        return
    }

    if (ROLL_REGEX.test(str)) {
        $chat.val(processChatRoll(die, str))
        return
    }

    const match = str.match(INLINE_REGEX)
    if (!match) {
        $chat.val(str + ` [[1${die}]]`)
        return
    }

    const index = /** @type {number} */ (match.index)
    const sub = str.substring(index + 2, str.length - 2).trim()
    const newStr = str.substring(0, index) + '[[' + processChatRoll(die, sub) + ']]'
    $chat.val(newStr)
}

/**
 * @param {string} die
 * @param {string} str
 */
function processChatRoll(die, str) {
    const DIE_REGEX = new RegExp(`(?<!- *)(\\d+)${die}`, 'i')
    const match = str.match(DIE_REGEX)

    if (!match) return str + ` + 1${die}`

    const index = /** @type {number} */ (match.index)
    const value = Number(match[1])

    return str.substring(0, index) + (value + 1) + str.substring(index + 1)
}

/**
 * @param {string} die
 * @param {boolean} ctrlKey
 */
async function rollDie(die, ctrlKey) {
    const roll = new Roll(`1${die}`)
    const rollMode = ctrlKey ? CONST.DICE_ROLL_MODES.BLIND : CONST.DICE_ROLL_MODES.PUBLIC
    await roll.evaluate({ async: true })
    roll.toMessage({}, { rollMode })
}
