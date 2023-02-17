## NLW Setup da Rocketseat 🚀

### Projeto desenvolvido durante o NLW Setup da Rocketseat em Janeiro de 2023. 

![banner](https://user-images.githubusercontent.com/52472087/219544648-83817f49-5a82-4370-b0eb-290aa94a723b.png)

### Consiste em um back-end com API RESTful, além de front-end com React e o mobile com React Native.

- Back-end: `NodeJS`, `TypeScript`, `Fastify`, `Prisma`, `SQLite`, `DayJS` e `Zod`.
- Front-end: `HTML`, `CSS`, `TailwindCSS`, `ReactJS`, `TypeScript`, `DayJS` e `Radix UI`.
- Mobile: `React Native`, `Expo`, `Native Wind`, `DayJS`, `React Navigation` e `React Native Reanimated`.

### Configurando e executando:

- Mobile:
```
cd mobile 
npm install -g expo-cli
npm install
npx expo start --clear
```

- Web/Client (Front-end):
```
cd web
npm install
npm run dev (ou "yarn dev")
```

- Server/API (Back-end):
```
cd server
npm install
npm run dev (ou "yarn dev")
```

### Ferramentas:

- Prisma Studio:
```
cd server && npx prisma studio
```

- Gerar (ERD.svg) - Diagrama Modelo Entidade Relacionamento (ER):
```
cd server && npx prisma migrate dev
```

### 📝 Licença

- [MIT](https://github.com/paulopitta97/nlw-ignite-setup/blob/master/LICENSE) © [Paulo Pitta](https://github.com/paulopitta97)
