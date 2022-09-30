const Response = require('./response');

const errorHandler = (func) => (req, res) => {
    try {
        func(req, res);
    } catch (e) {
        console.log(e);
        return Response.error(e);
    }
}

module.exports = errorHandler;