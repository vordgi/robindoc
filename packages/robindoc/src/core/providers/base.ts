/* eslint-disable @typescript-eslint/no-unused-vars */
import { type BranchFiles } from "../types/content";

export class BaseProvider {
    type: "local" | "remote" = "local";

    sourceRoot: string;

    filesPromise: Promise<BranchFiles> | BranchFiles;

    constructor(sourceRoot: string) {
        this.sourceRoot = sourceRoot.replaceAll("\\", "/").replace(/\/$/, "");
        this.filesPromise = { docs: [], structures: [] };
    }

    async getPageSourcePathname(uri: string, fullUri: string) {
        let pathname = null;
        if (fullUri.endsWith(".md") || fullUri.endsWith(".mdx") || fullUri.endsWith(".json")) {
            pathname = fullUri;
        } else {
            const files = await this.filesPromise;
            const validFile = files.docs.find((file) => file.clientPath === uri);
            if (validFile) {
                pathname = validFile.origPath;
            }
        }
        return pathname;
    }

    async load(_uri: string) {
        return "";
    }

    async getEditUri(_uri: string): Promise<string | null> {
        return null;
    }

    async getLastModifiedDate(_uri: string): Promise<string | null> {
        return null;
    }

    async getFileSrc(_uri: string, href: string, _publicDirs?: string[]): Promise<string> {
        return href;
    }
}
