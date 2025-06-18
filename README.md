# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

---

## Commands

```bash
# Install the latest LTS `node`
nvm list
nvm install --lts
```

```bash
# Create a new project
npm create vite@latest
# Or use this
npm create vue@latest

# Install packages
npm install

# Run a dev server
npm run dev

# Build the source code
npm run build
```

```bash
# Add necessary packages
npm install pinia
npm install vue-router@4
npm install --save-dev @types/node
npm install unhead # https://unhead.unjs.io/

# Free icons
npm install @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons
```

---

## To Do

- Add a list page and move about to a new settings menu
- SEO (SSG = static site generation, `npm install vite-ssg @vueuse/head`)
- httpOnly cookie for tokens - Low priority