import fs from 'fs/promises'

const text = await fs.readFile('words.txt', {encoding: 'utf-8'})
const words = text.split('\r\n').filter(word => word.length >= 1)
const output = 'export const words = [\n' + words.map(word => '  "' + word +'",\n').join('') + ']'
await fs.writeFile('words.js', output)
