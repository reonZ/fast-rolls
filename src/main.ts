import MODULE_ID from './module'
import { renderChatLog } from './chat'

Hooks.on('setup', () => {
    game.settings.register(MODULE_ID, 'light', {
        name: 'Light Dice',
        type: Boolean,
        default: false,
        config: true,
        scope: 'client',
        onChange: value => {
            ui.chat.element.find('#fast-rolls-chat-dice').toggleClass('light', value)
        },
    })
})

Hooks.on('renderChatLog', renderChatLog)
