import { readFile } from "fs/promises";
import path from "path";
import { glob } from "glob";
import { existsSync } from "fs";
import { BaseProvider } from "./base";
import { extensionsMap } from "../data/contents";

export class FileSystemProvider implements BaseProvider {
    readonly type = "local";

    rootUri: string;

    treePromise: Promise<string[]>;

    constructor(rootUri: string = process.cwd()) {
        this.rootUri = rootUri.replaceAll("\\", "/");
        this.treePromise = glob("**/*.{md,mdx}", { cwd: rootUri, posix: true });
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
            const segments = fullUri.split("/");
            const lastPart = segments[segments.length - 1];
            const files = await this.treePromise;
            const regexp = new RegExp(
                `^${fullUri.replace(/^\.\/?/, "")}(.mdx?|(^|/)(readme|index|${lastPart}).mdx?)$`,
                "i",
            );

            const validFile = files.find((file) =>
                path.posix.join(this.rootUri, file).replaceAll("\\", "/").match(regexp),
            );
            if (validFile) {
                pathname = validFile;
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
}
