class Response {

    error(err, code) {
        return {
            status: code || 500,
            message: err.message || err,
        };
    }

    success(data, message) {
        return {
            data,
            message,
            status: 200,
        };
    }
}

module.exports = new Response();