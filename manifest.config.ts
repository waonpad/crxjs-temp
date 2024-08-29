import { defineManifest } from "@crxjs/vite-plugin";
import { version } from "./package.json";

// NOTE: do not include src/ in paths,
// vite root folder: src, public folder: public (based on the project root)
// @see ../vite.config.ts#L16

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const manifest = defineManifest(async (_env) => ({
  manifest_version: 3,
  name: "Browser Extension",
  description: "Browser Extension Description",
  version,
  background: {
    service_worker: "service-worker/index.ts",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "file:///*"],
      js: ["content/index.tsx"],
    },
  ],
  host_permissions: ["<all_urls>"],
  options_ui: {
    page: "options/options.html",
    open_in_tab: true,
  },
  web_accessible_resources: [
    {
      resources: [
        // this file is web accessible; it supports HMR b/c it's declared in `rollupOptions.input`
        "welcome/welcome.html",
      ],
      matches: ["<all_urls>"],
    },
  ],
  action: {
    default_popup: "popup/popup.html",
    default_icon: {
      "16": "images/extension-16.png",
      "32": "images/extension-32.png",
      "48": "images/extension-48.png",
      "128": "images/extension-128.png",
    },
  },
  icons: {
    "16": "images/extension-16.png",
    "32": "images/extension-32.png",
    "48": "images/extension-48.png",
    "128": "images/extension-128.png",
  },
  permissions: ["storage", "tabs"],
}));

export default manifest;
