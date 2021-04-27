# Learn Webpack

## 개념

- webpack.config.js로 설정한다.
- name: 웹팩 설정 이름
- mode: 용도(개발, 배포)
- resolve: entry에 들어가는 파일들의 확장자명을 생략할 수 있게 해준다.
- 메인은 entry(입력), output(출력), module, plugins이다.
  - Entry: 시작하는 파일들
  - Output: 결과가 어떻게 되는지
  - Loaders: 모듈들
  - Plugins: 플러그인을 통한 기능 확장

## 설치

- 웹팩 관련

```command
npm init
npm i -D webpack webpack-cli
```

- 프레임워크, 라이브러리 관련

```command
npm i react react-dom
```

## 설정

### 기본 설정

```js (webpack.config.js)
const path = require("path");
const isDev = process.env.NODE_ENV !== "production";

const config = {
  name: "wordrelay-setting",
  mode: isDev ? "development" : "production",
  devtool: !isDev ? "hidden-source-map" : "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: ["./client"], // 여러개일 경우 배열로 선언해도 되고,  단독일 경우 스트링으로 선언해도 된다.
  },

  output: {
    path: path.join(__dirname, "dist"), // 현재 폴더(__dirname) 안에 있는 dist
    filename: "app.js",
  },
};

module.exports = config;
```

```js (package.json)
{
  "scripts": {
    "dev": "webpack"
  }
}
```

```command
npm run dev
```

### 바벨 설정(리액트, 뷰 환경)

- jsx 파일의 경우 웹팩에 바벨을 추가해줘야 한다. 바벨 안에서도 jsx 설정을 또 해줘야한다.

```command
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

- @babel/preset-react는 jsx를 가능하게 해준다.
- babel-loader는 웹팩과 바벨은 연결해준다.
- 라이브러리 및 프레임워크를 사용할 경우 로더를 설치해서 웹팩에서 해석을 시켜줘야한다.
- [웹팩 로더](https://webpack.js.org/concepts/#loaders)

```js (webpack.config.js)
const config = {
  // ...
  module: {
    rules: [
      {
        test: /\.jsx?/, // test: 규칙을 적용할 파일들
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
};
```

- babel-loader의 옵션들을 정의했는데, 또 그 옵션들의 설정이 따로 있을 수 있다.
- 아래는 @babel/preset-env의 설정값 변경 예제이다.

```js (webpack.config.js)
const config = {
  ...config,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR", "last 2 chrome versions"],
                },
                debug: true, // debug 기능 추가
              },
            ],
            "@babel/preset-react",
          ],
        },
      },
    ],
  },
};
```

- [browserslist](https://github.com/browserslist/browserslist#full-list)

### webpack-dev-server + react-refresh

- devServer를 따로 추가해준다.
- 플러그인들을 설치해서 사용할 수 있다.

```command
npm i -D webpack-dev-server
npm i -D react-refresh @pmmmwh/react-refresh-webpack-plugin
```

```js (webpack.config.js)
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const config = {
  ...config,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          // ...
          plugins: ["react-refresh/babel"],
        },
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    publicPath: "/dist",
    hot: true,
  },
};
```

- 웹팩데브서버에서 dist 폴더는 메모리상에 존재한다.

```js (package.json)
{
  "scripts": {
    "dev": "webpack serve --env development"
  }
}
```

- [웹팩 플러그인](https://webpack.js.org/plugins)

## 참고 링크

- [웹팩 공식문서](https://webpack.js.org)
