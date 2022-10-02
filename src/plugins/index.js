const plugins = async (server) => {

    await server.register({
        plugin: require('./user.plugins'),
        routes: { prefix: '/api/v1/user' }
    });

    await server.register({
        plugin: require('./theatre.plugins'),
        routes: { prefix: '/api/v1/theatre' }
    });

    await server.register({
        plugin: require('./shows.plugins'),
        routes: { prefix: '/api/v1/shows' }
    });

    await server.register({
        plugin: require('./movies.plugins'),
        routes: { prefix: '/api/v1/movies' }
    });

    await server.register({
        plugin: require('./screens.plugins'),
        routes: { prefix: '/api/v1/screens' }
    });

}

module.exports = plugins;