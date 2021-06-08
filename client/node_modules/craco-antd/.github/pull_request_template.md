Thanks for helping to maintain `craco-antd`!

Before you submit this PR, please check the following:

- 100% test coverage

```
jest --coverage --testPathIgnorePatterns test-app
```

- Code is formatted with Prettier

```
yarn prettier --write "**/*.{js,jsx,json,css,scss,html,md,yml}"
```

- No ESLint warnings

```
yarn eslint --fix --ext .js lib/
```

- No security vulnerabilities in any NPM packages

```
yarn audit
```

You are also welcome to add your GitHub username to the [Contributors](#Contributors) section at the bottom of this README. (_optional_)

**Please don't submit this pull request if it does not meet the above requirements.**
