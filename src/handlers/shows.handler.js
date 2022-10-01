// Helpers
const Response = require('../utils/response');
const showService = require('../service/show.service');
const commonSchma = require('../validation/schema/common.schema');

class ShowsHandler { }

ShowsHandler.getAllShows = async (req, res) => {
    try {

        let query = req.query;

        query = await commonSchma.pageSchema.validateAsync(query);

        const result = await showService.getAllShows(query);
        return res.response(result).code(result.status);

    } catch (e) {
        return Response.error(e);
    }
}

module.exports = ShowsHandler;