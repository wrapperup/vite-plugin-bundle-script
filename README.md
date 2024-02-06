# vite-plugin-bundle-scripts 📦
Bundle your client/external Javascript and Typescript modules as assets with Vite!

[![NPM Version](https://img.shields.io/npm/v/vite-plugin-bundle-scripts)](https://www.npmjs.com/package/vite-plugin-bundle-scripts)
[![NPM License](https://img.shields.io/npm/l/vite-plugin-bundle-scripts)](./LICENSE)

## Installation ##

```sh
npm i vite-plugin-bundle-scripts --save-dev
```

```js
// vite.config.js
import bundleScripts from 'vite-plugin-bundle-scripts';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [bundleScripts({
    // Vite configuration
  })]
});
```

## Usage ##

Append `?bundle` to your imported module.

```js
import clientScript from "./client?bundle"

// Just like any other asset, the asset's URL is provided.
const jsx = <script src={clientScript} type="module" />
```

Vite will now include this module as an asset. Think of it as a super-powered version of `?url` that
also bundles your asset as an entrypoint.

### With TypeScript ###

If you use Typescript, add one of these to let it become aware of
the `?bundle` marker on imported modules.

Add extension declarations to your [`types`](https://www.typescriptlang.org/tsconfig#types) in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "vite-plugin-bundle-scripts/ext"
    ]
  }
}
```

or with a directive:

```ts
/// <reference types="vite-plugin-bundle-scripts/ext" />
```

## What is this for?
This allows you to bundle your client-side code with your server-side application using Vite (especially useful for users of [vavite](https://github.com/cyco130/vavite)).

Usually, you would need to invoke an additional pre-build step to bundle your client code, which can be a bit cumbersome since your bundled client code doesn't exist until you run your build, and your server-side app may depend on it.

This plugin simplifies that by bundling your imported client Javascript/Typescript with Vite, then treating it as an asset, rather than a module (similar to `?url`). Less build steps, cleaner project directory.
