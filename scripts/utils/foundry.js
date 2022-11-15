import MODULE_ID from './module.js'

/** @param {...string} path */
export function templatePath(...path) {
    return `modules/${MODULE_ID}/templates/${path.join('/')}`
}
