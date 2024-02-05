# vite-plugin-bundle-scripts 📦
Bundle your client/external Javascript and Typescript modules as assets with Vite!

[![npm](https://img.shields.io/npm/v/vite-plugin-bundle-scripts.svg)]()
[![MIT/Apache 2.0](https://img.shields.io/badge/license-MIT%2FApache-blue.svg)](./LICENSE)

## Installation ##

```sh
npm i vite-plugin-bundle-scripts --save-dev
```

## Usage ##

```js
// vite.config.js
import bundleScripts from 'vite-plugin-bundle-scripts';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [bundleScripts()]
});
```

Append `?bundle` to your imported module.
```js
import clientScript from "./client?bundle"

function html() {
    // Just like any other asset, the asset's URL is provided.
    return <script src={clientScript} type="module" />
}
```

### With TypeScript ###

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

## Versus `?url`
`?bundle` works just like `?url`, except it also bundles the imported asset through Vite, instead of just simply copying the asset.

For example, when Vite transforms your imported Javascript:

`?url`
```js
// Asset is copied directly

import clientScript from "./client/script?url" 
// -> const clientScript = "/assets/script.ts"
```

vs `?bundle`
```js
// Asset is bundled into Javascript with Vite

import clientScript from "./client/script?bundle"
// -> const clientScript = "/assets/script.js"
```

## What is this for?
This allows you to bundle your client-side code with your server-side application using Vite (especially useful for users of [vavite](https://github.com/cyco130/vavite)).

Usually, you would need to invoke an additional pre-build step to bundle your client code, which can be a bit cumbersome since your bundled client code doesn't exist until you run your build, and your server-side app may depend on it.

This plugin simplifies that by bundling your imported client Javascript/Typescript with Vite, then treating it as an asset, rather than a module (similar to `?url`). Less build steps, cleaner project directory.
