/**
 * @const
 * @readonly
 * @kind module
 * @description Javascript asset
 */
declare module '*.js?bundle' {
  const src: string;
  export default src;
}

/**
 * @const
 * @readonly
 * @kind module
 * @description JSX asset
 */
declare module '*.jsx?bundle' {
  const src: string;
  export default src;
}

/**
 * @const
 * @readonly
 * @kind module
 * @description Typescript asset
 */
declare module '*.ts?bundle' {
  const src: string;
  export default src;
}

/**
 * @const
 * @readonly
 * @kind module
 * @description TSX asset
 */
declare module '*.tsx?bundle' {
  const src: string;
  export default src;
}
