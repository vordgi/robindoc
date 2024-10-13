import { type Configuration } from "../types/content";
import { detectProvider } from "./detect-provider";

export const getConfiguration = (currentConfiguration: Configuration, previousConfiguration: Configuration = {}) => {
    let basePath = previousConfiguration.basePath;
    let gitToken = previousConfiguration.gitToken;
    let spreadedLevel = previousConfiguration.spreadedLevel;
    let sourceRoot = previousConfiguration.sourceRoot;
    let fetcher = previousConfiguration.fetcher || fetch;
    let provider = previousConfiguration.provider;

    if (currentConfiguration.basePath) {
        basePath = currentConfiguration.basePath;
    }
    if (currentConfiguration.gitToken) {
        gitToken = currentConfiguration.gitToken;
    }
    if (currentConfiguration.spreadedLevel !== undefined) {
        spreadedLevel = currentConfiguration.spreadedLevel;
    }
    if (currentConfiguration.sourceRoot !== undefined) {
        sourceRoot = currentConfiguration.sourceRoot;
    }
    if (currentConfiguration.fetcher !== undefined) {
        fetcher = currentConfiguration.fetcher || fetch;
    }
    if (currentConfiguration.provider) {
        provider = currentConfiguration.provider;
    } else if (
        (currentConfiguration.sourceRoot && currentConfiguration.sourceRoot !== previousConfiguration.sourceRoot) ||
        !provider
    ) {
        if (sourceRoot) {
            const Provider = currentConfiguration.provider || detectProvider(sourceRoot);
            provider = new Provider(sourceRoot, fetcher, gitToken);
        }
    }
    return { sourceRoot, provider, basePath, gitToken, fetcher, spreadedLevel };
};
