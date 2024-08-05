import { readFile } from "fs/promises";
import path from "path";
import { glob } from "glob";
import { existsSync } from "fs";
import { BaseProvider } from "./base";

export class FileSystemProvider implements BaseProvider {
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
}
