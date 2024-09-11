import { type Configuration } from "../types/content";
import { detectProvider } from "./detect-provider";

export const getConfiguration = (currentConfiguration: Configuration, previousConfiguration: Configuration = {}) => {
    let basePath = previousConfiguration.basePath;
    let gitToken = previousConfiguration.gitToken;
    let fetcher = previousConfiguration.fetcher || fetch;
    let sourceRoot = previousConfiguration.sourceRoot;
    let provider = previousConfiguration.provider;

    if (currentConfiguration.basePath) {
        basePath = currentConfiguration.basePath;
    }
    if (currentConfiguration.gitToken) {
        gitToken = currentConfiguration.gitToken;
    }
    if (currentConfiguration.fetcher !== undefined) {
        fetcher = currentConfiguration.fetcher || fetch;
    }
    if (currentConfiguration.sourceRoot !== undefined) {
        sourceRoot = currentConfiguration.sourceRoot;
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
    return { sourceRoot, provider, basePath, gitToken, fetcher };
};
