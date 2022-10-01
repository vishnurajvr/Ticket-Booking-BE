// Models
const { Shows } = require('../database/models');

// Helpers
const Response = require('../utils/response');
const messages = require('../constants/messages');

class ShowService { }

ShowService.getAllShows = async (query) => {
    try {

        const { page, limit } = query || {};

        const result = await Shows.query().page(page).limit(limit);

        return Response.success(result, messages.successfullyFetch);
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

module.exports = ShowService;