module.exports = {
    paths: (paths, env) => {
        console.log("> paths_stage\n")
        return paths;
    },
    jest: config => {
        console.log("> jest_stage\n")
        return config;
    },
    devServer: configFunction => {
        console.log("> devServer_stage\n")
        const config = function (proxy, allowedHost) {
            return configFunction(proxy, allowedHost)
        }
        return config;
    },
    webpack: (config, env) => {
        console.log("> webpack_stage\n")

        // Your custom webpack here

        config.output.filename = `static/js/[name].v${"0.0.5"}_[contenthash].js`
        return config;
    }
}