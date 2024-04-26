# 🌟 Choconotey Notes (React.JS + Typescript)

Welcome to **choconotey notes** app repository, built with React.JS and Typescript, and of course, with a flavour of other awesome community open source packages.

Taking notes in markdown is made simple with this application. It provides the core features to create, organize, share and export your notes content in multiple formats like Markdown, CSV, HTML and plain text.

Not limited, the core editor is built on top of the headless [Tiptap Editor](https://tiptap.dev), empowering this application for robust note editing, with extensions, tools, syntax highlighting and more. You can find the API source code [here](https://github.com/KainNhantumbo/notes-api).

> **Access this app live at: [https://choconotey-demo.vercel.app](https://choconotey-demo.vercel.app)**

## **Here are some screenshots:**

|           Light Theme (Desktop)           |           Dark Theme (Desktop)           |
| :---------------------------------------: | :--------------------------------------: |
| ![](./src/assets/demo-light.png?raw=true) | ![](./src/assets/demo-dark.png?raw=true) |

|               Light Theme (Mobile)               |               Dark Theme (Mobile)               |
| :----------------------------------------------: | :---------------------------------------------: |
| ![](./src/assets/demo-light-mobile.png?raw=true) | ![](./src/assets/demo-dark-mobile.png?raw=true) |

## 🌠 Project status

Note: This project is concluded, but I am maintaining it. You can expect to see more features being added in the future. Enjoy!!

## 🌳 Project structure

```
$PROJECT_ROOT
.
├── public
└── src
    ├── assets
    ├── components
    │   ├── editor
    │   └── modals
    ├── config
    ├── context
    ├── hooks
    ├── libs
    ├── routes
    │   ├── auth
    │   ├── docs
    │   └── workspace
    ├── shared
    ├── styles
    │   ├── modules
    │   └── routes
    └── types
```

## 🐾 Project Stack

- **Typescript** - a superset language of Javascript that provides typechecking.
- **Vite** - a next generation frontend tooling.
- **React.JS** - library used to build big, fast Web apps with JavaScript.
- **Styled Components** - library to write styles for components.
- **Tiptap** - a framework that powers the core editor.
- **Zod** - for frontend data validation.

## 🎊 Features Log

See all important logs that are documented here, on this [changelog file](CHANGELOG.md).

## 🏗️ Local Setup

Make sure you have installed **Node.js (v18.17.0 or later recommended) which also comes with npm v9.6.7**.\
In the project directory, you can run in terminal:

```bash
npm ci && npm run dev
```

Runs the app in the development mode and the server will reload when you make changes to the source code.

```bash
npm run build
```

Builds the app for production to the **dist folder**.

```bash
npm run start
```

Builds and starts the server in production.

## ☘️ Find me!

E-mail: [nhantumbok@gmail.com](nhantumbok@gmail.com 'Send an e-mail')\
Github: [https://github.com/KainNhantumbo](https://github.com/KainNhantumbo 'See my github profile')\
Portfolio: [https://codenut-dev.vercel.app](https://codenut-dev.vercel.app 'See my portfolio website')\
My Blog: [https://codenut-dev.vercel.app/en/blog](https://codenut-dev.vercel.app/en/blog 'Visit my blog site')

#### If you like this project, let me know by leaving a star on this repository so I can keep improving this app.😊😘

Best regards, Kain Nhantumbo.\
✌️🇲🇿 **Made with ❤ React + Vite and Typescript**

## 📜 License

Licensed under Apache License 2.0. All rights reserved.\
Copyright &copy; 2023 Kain Nhantumbo.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
