import { html, type Compiler } from "./html.ts";
import createPlugin from "./integration.ts";
import { ogImage } from "./ogImage.ts";

export type { Compiler };
export { html, ogImage };
export default createPlugin;
