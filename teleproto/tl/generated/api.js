const { createApiFromDefinitions } = require("../runtime/createApi");
const definitions = require("./api-definitions.js");
const Api = createApiFromDefinitions(definitions);
module.exports = { Api };
