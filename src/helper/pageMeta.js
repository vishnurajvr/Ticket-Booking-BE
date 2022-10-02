module.exports = (count, limit, data) => {
    return {
        data,
        pageMeta: {
            count,
            totalPages: Math.ceil(count / limit),
        }
    };
}