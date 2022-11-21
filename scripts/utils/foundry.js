import MODULE_ID from './module.js'

/** @param {...string} path */
export function templatePath(...path) {
    return `modules/${MODULE_ID}/templates/${path.join('/')}`
}

/** @param {...string} path */
export function imagePath(...path) {
    return `modules/${MODULE_ID}/images/${path.join('/')}`
}
