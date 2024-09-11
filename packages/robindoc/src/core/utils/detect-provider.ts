import { GithubProvider, FileSystemProvider } from "../providers";

export const detectProvider = (uri: string) => {
    if (uri.startsWith("https://github.com/")) {
        return GithubProvider;
    }
    if (uri.match(/https?:\/\//)) {
        throw new Error(`Unknown uri "${uri}". Please use custom provider or create issue`);
    }

    return FileSystemProvider;
};
