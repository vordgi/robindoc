import { readFile } from "fs/promises";
import { glob } from "glob";
import path from "path";

import { type BranchFiles } from "../types/content";
import { BaseProvider } from "./base";
import { extensionsMap } from "../data/contents";
import { getFileUrl, normalizePathname } from "../utils/path-tools";

export class FileSystemProvider extends BaseProvider {
    readonly type = "local";

    rootUri: string;

    constructor(rootUri: string = process.cwd()) {
        super(rootUri);
        this.rootUri = rootUri.replaceAll("\\", "/");
        this.filesPromise = this.loadFiles("");
    }

    async getPageSourcePathname(uri: string) {
        const fullUri = path.posix.join(this.rootUri, uri).replaceAll("\\", "/").replace(/\/$/, "");
        return super.getPageSourcePathname(uri, fullUri);
    }

    async load(uri: string) {
        const filePath = await this.getPageSourcePathname(uri);
        if (!filePath) {
            throw new Error(`Can not find file for "${uri}"`);
        }
        const content = await readFile(filePath, "utf-8");
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
        const filesSorted = files.sort();

        const fileTree = filesSorted.reduce<BranchFiles>(
            (acc, item) => {
                if (!pathnameClean || (pathnameClean && item.startsWith(pathnameClean))) {
                    const origPath = path
                        .relative(process.cwd(), (this.rootUri || ".") + "/" + item)
                        .replace(/\\/g, "/");

                    if (item.match(/\.mdx?$/)) {
                        const clientFileUrl = getFileUrl("/" + item);

                        acc.docs.push({
                            origPath,
                            clientPath: normalizePathname(clientFileUrl.substring(pathnameClean?.length || 0)),
                        });
                    } else {
                        acc.structures.push(origPath);
                    }
                }
                return acc;
            },
            { docs: [], structures: [] },
        );
        this.filesPromise = fileTree;
        return fileTree;
    }
}
