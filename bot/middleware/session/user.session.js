const bot = require("../../connection/token.connection");
const User = require("../../../models/user.model");
const MySQLSession = require("../../modules/mysqlSession");

const session = new MySQLSession({ model: User })

module.exports = bot.use(session.middleware());
