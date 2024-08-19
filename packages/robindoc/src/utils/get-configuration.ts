import { type Configuration } from "../types/structure";
import { detectProvider } from "./detect-provider";

export const getConfiguration = (currentConfiguration: Configuration, previousConfiguration: Configuration = {}) => {
    let sourceUri = previousConfiguration.sourceUri;
    let provider = previousConfiguration.provider;
    let basePath = previousConfiguration.basePath;
    let gitToken = previousConfiguration.gitToken;
    let fetcher = previousConfiguration.fetcher || fetch;

    if (currentConfiguration.basePath) {
        basePath = currentConfiguration.basePath;
    }
    if (currentConfiguration.gitToken) {
        gitToken = currentConfiguration.gitToken;
    }
    if (currentConfiguration.fetcher !== undefined) {
        fetcher = currentConfiguration.fetcher || fetch;
    }
    if ((currentConfiguration.sourceUri && currentConfiguration.sourceUri !== sourceUri) || !provider) {
        sourceUri = currentConfiguration.sourceUri;

        if (sourceUri) {
            const Provider = detectProvider(sourceUri);
            provider = new Provider(sourceUri, fetcher, gitToken);
        }
    }
    return { sourceUri, provider, basePath, gitToken, fetcher };
};
