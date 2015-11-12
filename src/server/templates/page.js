const fs = require('fs');
const handlebars = require('handlebars');

const templateString = fs.readFileSync(__filename.replace(/\.js$/, '.hbs'), 'utf8');
module.exports = handlebars.compile(templateString);
