## NLW Setup da Rocketseat 🚀

### Projeto desenvolvido durante o NLW Setup da Rocketseat em Janeiro de 2023. 

### Consiste em um back-end com API RESTful.

### Rascunhos (Server)

#### AULA 1

- `npm init -y`
- `npm i fastify`
- `npm i typescript -D`
- `npx tsc --init`
- `npm i tsx -D`
- `npx tsx src/server.ts`
- `npm i prisma -D`
- `npm i @prisma/client`
- `npx prisma init --datasource-provider SQLite`
- `npx prisma migrate dev`
- `npx prisma studio`
- `npm i @fastify/cors`

#### AULA 2

- `npx prisma migrate dev`
- `npm i -D prisma-erd-generator @mermaid-js/mermaid-cli`
- `npx prisma generate`
- `npx prisma db seed`

### Rascunhos (Client)

#### AULA 1

- `npm i create-vite@latest -D -g`
- `npm create vite@latest`
- `cd web && npm install && npm run dev`

- // Componente: Reaproveitar / isolar
- // Propriedade: Uma informação enviada para modificar um componente visual ou comportamentalmente

- `npm i -D tailwindcss postcss autoprefixer`
- `npx tailwindcss init -p`

- // Extensões VS Code: "PostCSS Language Support" e "Tailwind CSS IntelliSense"


### Rascunhos (Mobile)

#### AULA 1

- `npm install -g expo-cli`
- `expo --version`
- https://react-native.rocketseat.dev/expo-managed/windows/
- Download APP Expo na PlayStore (no Celular Android)
- `npx create-expo-app mobile --template` // Escolher "Blank TypeScript"
- `npx expo start`
- `npx expo start --clear`
- `npx expo install expo-font @expo-google-fonts/inter`