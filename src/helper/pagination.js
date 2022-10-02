const pagination = (page, limit, data) => {
    if (data?.length > 0) {
        console.table({ leng: data.length, page, limit, data })
        return {
            data: data.slice(((page - 1) * limit), page * limit),
            pageMeta: {
                count: data.length,
                totalPages: Math.ceil(data.length / limit),
            }
        };
    }
    return {
        data: [],
        pageMeta: {
            count: 0,
            totalPages: 0
        }
    };
}

module.exports = {
    pagination
};