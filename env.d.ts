/// <reference types="vite/client" />
declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "js-cookie"
declare module "nprogress"
declare module "vue-i18n"
declare module "vite-i18n-resources"
declare module "vite-plugin-i18n-resources"