const plugins = async (server) => {

    await server.register({
        plugin: require('./user.plugins'),
        routes: { prefix: '/api/v1/user' }
    });

    await server.register({
        plugin: require('./theatre.plugins'),
        routes: { prefix: '/api/v1/theatre' }
    })

}

module.exports = plugins;