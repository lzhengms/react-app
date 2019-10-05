module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "standard",
        "standard-react"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "babel",
        "react"
    ],
    "rules": {
        "strict": 0,
        "indent": ["warn", 2, {  switchCase: 2 }], // 默认2个空格，switch语句里面的case也两个空格
        "semi": [1, "never"], // 末尾的；号，不要分号
        "quotes": [1, "single"], // 使用单引号
        "comma-spacing": [ // 逗号后面的空格
            1,
             {
            before: false,
            after: true
        }],
        "curly": [2, "all"], //必须使用 if(){} 中的{}
        "no-unused-vars": [
            1,
            {
              // 允许声明未使用变量
              "vars": "all",
            }
          ],
        "no-undef": [2, {"typeof": true}], // 不允许未定义的变量
        "no-useless-constructor": 0,
        "react/no-did-mount-set-state": 0,
        "react/prop-types": 0
    }
};