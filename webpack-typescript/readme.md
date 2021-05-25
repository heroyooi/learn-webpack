# Webpack Typescript

```command
npm i -g typescript
tsc --init
```

- tsconfig.json 파일이 생성된다.

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es2015"
  }
}
```

- 위 2가지 설정값만 바꿔준다.

```command
npm init
npm i webpack webpack-cli ts-loader typescript -D
npm i webpack-dev-server -D
```

- 아래 명령어로 웹팩데브서버 실행

```
npm run serve
```

## 강좌

- [Webpack & TypeScript](https://youtu.be/sOUhEJeJ-kI)
