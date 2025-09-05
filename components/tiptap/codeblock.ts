import { all, createLowlight } from "lowlight";

import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import hljs from "highlight.js";

export const LANGUAGES = hljs.listLanguages();

export const lowlight = createLowlight(all);

export const CodeBlock = CodeBlockLowlight.configure({ lowlight });
