import path from "path";

const BUNDLE_SUFFIX = "?bundle";

export default function bundleScriptsPlugin(viteConfig) {
  let resolvedConfig;

  return {
    name: "vite-plugin-bundle-scripts",
    enforce: "pre",

    configResolved(config) {
      resolvedConfig = config;
    },

    async load(id) {
      if (!id.endsWith(BUNDLE_SUFFIX)) {
        return;
      }

      if (resolvedConfig.command === "serve") {
        const serveId = path.posix.relative(process.cwd(), id.slice(0, -BUNDLE_SUFFIX.length));

        return `export default "/${serveId.toString()}";`;
      } else {
        const { build } = await import("vite");

        const output = await build({
          ...viteConfig,
          configFile: false,
          clearScreen: false,
          build: {
            rollupOptions: {
              input: id.slice(0, -BUNDLE_SUFFIX.length),
            },
            minify: true,
            write: false,
          },
        });

        const code = output.output[0].code;

        let fileHandle = this.emitFile({
          type: "asset",
          source: code,
          name: path.posix.parse(id).name + ".js",
        });

        // Hack to let Vite process our file as an asset.
        return `export default "__VITE_ASSET__${fileHandle}__";`;
      }
    },
  };
}
