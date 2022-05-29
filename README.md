# nest
[nest](https://www.youtube.com/watch?v=GHTA143_b-s)
## 跟随youtube学nest


### 🚀零、启动项目

```shell
yarn // install
yarn db:dev:restart // start postgres in docker and push migrations
yarn start:dev // start api in dev mode
```

### 一、完成功能
- [x] signup
- [x] signin
- [x] GetUser
- [x] editorUser
- [x] bookmark CRUD

### 二、所用工具和地址


- 1. 请求工具 ---  [Insomnia](https://insomnia.rest/download)
- 2. 数据库管理  ---  [docker](https://www.docker.com/products/docker-desktop/)
- 3. 测试请求库 --- [PactumJS](https://pactumjs.github.io/introduction/quick-start.html#system-requirements)
- 4. nest文档 ---- [nest](https://docs.nestjs.com/)
- 5. JWT --- [Jwt](https://jwt.io/)
- 6. 数据库模型创建 --- [prisma](https://www.prisma.io/docs/concepts/components/prisma-client)

### 三、e2etest

上述列举功能


### 四、要点

- module and controller
- dto
- pipe（global pipe）
- hash user password
- postgres start & prisma migrations
- config module
- passportjs & jwt
- access_token
- guards
- param decorator
- e2e 
- test database
- test database restart & migrations
- dotenv cli with prisma
- Auth & User & BookMarks e2e tests

### 五、不好记的npm

```shell
npx prisma --help

yarn add dotenv-cli
```
