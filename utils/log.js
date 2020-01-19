const convertTimestamp = require('./date');

module.exports = (msg) => console.log(`[${convertTimestamp(Date.now())}] ${msg}`);
