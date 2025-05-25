// This is required to ensure TypeScript recognizes the Vue files and their types.
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
