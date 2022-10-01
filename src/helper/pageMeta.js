module.exports = (count, limit, data) => {
    console.log({count, limit, data})
    return {
        data,
        pageMeta: {
            count,
            totalPages: Math.ceil(count / limit),
        }
    };
}