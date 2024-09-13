/* eslint-disable @typescript-eslint/no-var-requires */
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");
const scss = require("rollup-plugin-scss");
const { default: preserveDirectives } = require("rollup-preserve-directives");

module.exports = {
    input: ["src/index.tsx", "src/assets/index.ts"],
    output: [
        {
            dir: "lib",
            format: "es",
            sourcemap: true,
            preserveModules: true,
            assetFileNames: "[name][extname]",
        },
    ],
    external: [
        "react",
        "react-dom",
        "gray-matter",
        "marked",
        "dot-prop",
        "github-slugger",
        "path",
        "shiki",
        "fs",
        "fs/promises",
        "glob",
    ],
    plugins: [
        commonjs(),
        typescript(),
        scss({
            outputStyle: "compressed",
            output: true,
            failOnError: true,
            fileName: "styles.css",
            sourceMap: true,
            exclude: ["node_modules/"],
        }),
        terser(),
        preserveDirectives(),
    ],
};
