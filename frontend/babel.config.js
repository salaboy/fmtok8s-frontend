

module.exports = function(api) {
    if (api) {
        //   https://babeljs.io/docs/en/config-files#apicache
        api.cache.using(() => process.env.NODE_ENV)
    }

    const presets = ['@babel/preset-env', '@babel/preset-react']

    const plugins = []

    return {
        presets,
        plugins,
    }
}