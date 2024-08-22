import { readFile } from "fs/promises";
import { glob } from "glob";
import { existsSync } from "fs";
import path from "path";

import { type BranchFiles } from "../types/content";
import { BaseProvider } from "./base";
import { extensionsMap } from "../data/contents";
import { getFileUrl, normalizePathname } from "../utils/path-tools";

export class FileSystemProvider implements BaseProvider {
    readonly type = "local";

    rootUri: string;

    filesPromise: BaseProvider["filesPromise"];

    constructor(rootUri: string = process.cwd()) {
        this.rootUri = rootUri.replaceAll("\\", "/");
        this.filesPromise = this.loadFiles("");
    }

    async load(uri: string) {
        const fullUri = path.posix.join(this.rootUri, uri).replaceAll("\\", "/").replace(/\/$/, "");
        let pathname;
        if (fullUri.endsWith(".md") || fullUri.endsWith(".mdx")) {
            if (existsSync(fullUri)) {
                pathname = fullUri;
            } else {
                throw new Error(`Can not find file "${fullUri}"`);
            }
        } else {
            const files = await this.filesPromise;
            const validFile = files.docs.find((file) => file.clientPath === uri);
            if (validFile) {
                pathname = this.rootUri + validFile.origPath;
            } else {
                throw new Error(
                    `Can not find md file at "${path.posix.join(this.rootUri, fullUri).replaceAll("\\", "/")}"`,
                );
            }
        }

        const content = await readFile(pathname, "utf-8");
        return content;
    }

    async getFileSrc(uri: string, href: string, publicDirs?: string[]) {
        if (href.match(/https?:\/\//)) return href;

        const assetPath = path.posix.join(process.cwd(), uri?.replace(/^\//, "./") || "", href.replace(/^\//, "./"));
        const relativePath = path.posix.relative(process.cwd(), assetPath);
        const { dir, ext } = path.parse(relativePath);
        const publicDirsRule = publicDirs && new RegExp(`^(${publicDirs?.join("|")})(\/|$)`);
        const publicDirMatch = publicDirsRule && dir.match(publicDirsRule);

        let src = href;
        if (publicDirMatch) {
            src = `${relativePath.replace(publicDirMatch[1], "")}`;
        } else if (ext in extensionsMap) {
            const base64Image = await readFile(relativePath, "base64");
            src = `data:${extensionsMap[ext as keyof typeof extensionsMap]};base64,${base64Image}`;
        }
        return src;
    }

    private async loadFiles(pathname?: string) {
        const pathnameClean = pathname?.replace(/^\//, "");
        const files = await glob(["**/*.{md,mdx}", "**/structure.json"], { cwd: this.rootUri, posix: true });

        const fileTree = files.reduce<BranchFiles>(
            (acc, item) => {
                if (!pathnameClean || (pathnameClean && item.startsWith(pathnameClean))) {
                    const clientPath = getFileUrl("/" + item);

                    acc.docs.push({
                        origPath: normalizePathname("/" + item.substring(pathnameClean?.length || 0)),
                        clientPath: normalizePathname(clientPath.substring(pathnameClean?.length || 0)),
                    });
                }
                return acc;
            },
            { docs: [], structures: [] },
        );
        this.filesPromise = fileTree;
        return fileTree;
    }
}
