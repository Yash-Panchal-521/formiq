const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const config = {
  ...defaultConfig,
  maxWorkers: 2,
  transformer: {
    ...defaultConfig.transformer,
    maxWorkers: 2,
  },
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: [...defaultConfig.resolver.sourceExts, "mjs"],
    extraNodeModules: {
      ...defaultConfig.resolver.extraNodeModules,
      "@emotion/styled": require.resolve("@emotion/styled"),
      "@emotion/react": require.resolve("@emotion/react"),
    },
  },
};

module.exports = config;
