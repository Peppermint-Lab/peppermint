# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.2.0](https://github.com/webpack-contrib/less-loader/compare/v6.1.3...v6.2.0) (2020-07-03)


### Features

* support condition names from `package.json` ([#369](https://github.com/webpack-contrib/less-loader/issues/369)) ([671395d](https://github.com/webpack-contrib/less-loader/commit/671395d6a82425ba4408d1329d8cbfa07dfd9153))

### [6.1.3](https://github.com/webpack-contrib/less-loader/compare/v6.1.2...v6.1.3) (2020-06-29)


### Bug Fixes

* revert restrictions ([e758837](https://github.com/webpack-contrib/less-loader/commit/e75883706fc3d3bb2b6283a727a405216473362e))

### [6.1.2](https://github.com/webpack-contrib/less-loader/compare/v6.1.1...v6.1.2) (2020-06-22)


### Bug Fixes

* ignore watch for remove URLs ([3946937](https://github.com/webpack-contrib/less-loader/commit/39469376e28cd0e38162f7bdf8935d343830a40e))
* resolution logic ([2c3a23a](https://github.com/webpack-contrib/less-loader/commit/2c3a23a440cbdad1edb8b232864cb0233a266782))
* resolve absolute and root relative imports ([3d01b82](https://github.com/webpack-contrib/less-loader/commit/3d01b82fae335d5d69d6290911e788debc732182))

### [6.1.1](https://github.com/webpack-contrib/less-loader/compare/v6.1.0...v6.1.1) (2020-06-11)


### Bug Fixes

* do not rebuilt unmodified files on windows in watch mode ([6537a3d](https://github.com/webpack-contrib/less-loader/commit/6537a3d66559464af9b9a25f4bdda8691e8d9407))

## [6.1.0](https://github.com/webpack-contrib/less-loader/compare/v6.0.0...v6.1.0) (2020-05-07)


### Features

* new `implementation` option ([#354](https://github.com/webpack-contrib/less-loader/issues/354)) ([d2de80f](https://github.com/webpack-contrib/less-loader/commit/d2de80f9fe6ee11e784260dbda960853ebd2449b))


### Bug Fixes

* respect third-party plugins for `Less` ([#353](https://github.com/webpack-contrib/less-loader/issues/353)) ([d0db4f9](https://github.com/webpack-contrib/less-loader/commit/d0db4f9839c4921440c9a0fdc00fd00bc5a6fbb8))

## [6.0.0](https://github.com/webpack-contrib/less-loader/compare/v5.0.0...v6.0.0) (2020-04-24)


### ⚠ BREAKING CHANGES

* minimum supported Node.js version is `10.13`, 
* minimum support webpack version is `4`
* `2` version of `less` is not supported anymore
* using `3` versin of `less` by default, so you don't need to have `less` in your `package.json`, we already supply it
* move less-specific options to the `lessOptions` option, please look at [README](https://github.com/webpack-contrib/less-loader#lessoptions)


### Features

* the `paths` options now works with webpack resolver ([3931470](https://github.com/webpack-contrib/less-loader/commit/393147064672ace986ec84aca21f69f0ab819a9c))
* allow a function to be used for `lessOptions` ([#325](https://github.com/webpack-contrib/less-loader/issues/325)) ([a6be94a](https://github.com/webpack-contrib/less-loader/commit/a6be94a6da291a27026415d509249e0203e977ad))
* added the `appendData` option ([#336](https://github.com/webpack-contrib/less-loader/issues/336)) ([fb94605](https://github.com/webpack-contrib/less-loader/commit/fb946051bb4d52a6f9a93fe40a8cd09a56a2c5f1))
* added the `prependData` option ([#327](https://github.com/webpack-contrib/less-loader/issues/327)) ([9df8755](https://github.com/webpack-contrib/less-loader/commit/9df87554ee1ac57d2c32743049174da20e8a8a61))
* support `less` and `style` fields in `package.json`
* support `index.less` file for packages

### Bug Fixes

* support import aliases without tilde ([#335](https://github.com/webpack-contrib/less-loader/issues/335)) ([24021cd](https://github.com/webpack-contrib/less-loader/commit/24021cdb9dc0496fcebd6966516ff66584525cf3))
* do not crash on remotely imports ([#333](https://github.com/webpack-contrib/less-loader/issues/333)) ([8e020e9](https://github.com/webpack-contrib/less-loader/commit/8e020e9cf794d958024cc91ad490b621d5170878))
* add webpack v5 support ([#317](https://github.com/webpack-contrib/less-loader/issues/317)) ([f0b42b4](https://github.com/webpack-contrib/less-loader/commit/f0b42b4e64dceed0bbb2557c0d88d1c36fe3e553))
* first resolve an import using less resolver, then using webpack resolver ([#340](https://github.com/webpack-contrib/less-loader/issues/340)) ([443bd5a](https://github.com/webpack-contrib/less-loader/commit/443bd5ac0539ca93a998326754bcd607aaecdf1a))
* fix a resolution for `@import 'package/file.ess';` and `@import './package/file.ess';`


<a name="5.0.0"></a>
# [5.0.0](https://github.com/webpack-contrib/less-loader/compare/v4.1.0...v5.0.0) (2019-04-29)


### Bug Fixes

* webpack watching does not recover after broken less is fixed ([#289](https://github.com/webpack-contrib/less-loader/issues/289)) ([f41d12e](https://github.com/webpack-contrib/less-loader/commit/f41d12e))


### Chores

* remove old bits mentioning webpack < 4 and node < 6 ([#286](https://github.com/webpack-contrib/less-loader/issues/286)) ([012eb8f](https://github.com/webpack-contrib/less-loader/commit/012eb8f))


### Code Refactoring

* remove deprecated compress option ([#283](https://github.com/webpack-contrib/less-loader/issues/283)) ([3d6e9e9](https://github.com/webpack-contrib/less-loader/commit/3d6e9e9))


### BREAKING CHANGES

* remove deprecated compress option.
* drop support for node < 6.9 and webpack < 4



<a name="4.1.0"></a>
# [4.1.0](https://github.com/webpack-contrib/less-loader/compare/v4.0.6...v4.1.0) (2018-03-09)


### Features

* **package:** support `less >= v3.0.0` ([#242](https://github.com/webpack-contrib/less-loader/issues/242)) ([d8c9d83](https://github.com/webpack-contrib/less-loader/commit/d8c9d83))



<a name="4.0.6"></a>
## [4.0.6](https://github.com/webpack-contrib/less-loader/compare/v4.0.5...v4.0.6) (2018-02-27)


### Bug Fixes

* **package:** add `webpack >= v4.0.0` (`peerDependencies`) ([#245](https://github.com/webpack-contrib/less-loader/issues/245)) ([011cc73](https://github.com/webpack-contrib/less-loader/commit/011cc73))



<a name="4.0.5"></a>
## [4.0.5](https://github.com/webpack-contrib/less-loader/compare/v4.0.4...v4.0.5) (2017-07-10)


### Chore

* support `webpack@3` ([670ab18](https://github.com/webpack-contrib/less-loader/commit/670ab18))


<a name="4.0.4"></a>
## [4.0.4](https://github.com/webpack-contrib/less-loader/compare/v4.0.3...v4.0.4) (2017-05-30)


### Bug Fixes

* resolve `[@import](https://github.com/import)` with absolute paths ([#201](https://github.com/webpack-contrib/less-loader/issues/201)) ([a3f9601](https://github.com/webpack-contrib/less-loader/commit/a3f9601)), closes [webpack-contrib/less-loader#93](https://github.com/webpack-contrib/less-loader/issues/93)



<a name="4.0.3"></a>
## [4.0.3](https://github.com/webpack-contrib/less-loader/compare/v4.0.2...v4.0.3) (2017-03-30)


### Bug Fixes

* sourcesContent missing in source maps ([df28035](https://github.com/webpack-contrib/less-loader/commit/df28035))



<a name="4.0.2"></a>
## [4.0.2](https://github.com/webpack-contrib/less-loader/compare/v4.0.1...v4.0.2) (2017-03-21)


### Bug Fixes

* Plugin.install is not a function ([f8ae245](https://github.com/webpack-contrib/less-loader/commit/f8ae245))



<a name="4.0.1"></a>
## [4.0.1](https://github.com/webpack-contrib/less-loader/compare/v4.0.0...v4.0.1) (2017-03-21)


### Bug Fixes

* wrong entry point in package.json ([918bfe9](https://github.com/webpack-contrib/less-loader/commit/918bfe9)), closes [#161](https://github.com/webpack-contrib/less-loader/issues/161) [#179](https://github.com/webpack-contrib/less-loader/issues/179) [#177](https://github.com/webpack-contrib/less-loader/issues/177)



<a name="4.0.0"></a>
# [4.0.0](https://github.com/webpack-contrib/less-loader/compare/v3.0.0...v4.0.0) (2017-03-20)


### Bug Fixes

* error where not all files were watched ([53c90fc](https://github.com/webpack-contrib/less-loader/commit/53c90fc))
* resolve alias ([98d4e63](https://github.com/webpack-contrib/less-loader/commit/98d4e63))


### Chores

* **dependencies:** Update peer dependencies ([24a6f66](https://github.com/webpack-contrib/less-loader/commit/24a6f66))


### Features

* **source-maps:** refactor source maps handling ([895044f](https://github.com/webpack-contrib/less-loader/commit/895044f))
* allow user to choose between resolvers ([1d6e505](https://github.com/webpack-contrib/less-loader/commit/1d6e505))
* improve formatting of error messages ([39772a5](https://github.com/webpack-contrib/less-loader/commit/39772a5))
* make any file type importable ([d3022b8](https://github.com/webpack-contrib/less-loader/commit/d3022b8))
* remove root option ([39ad4f8](https://github.com/webpack-contrib/less-loader/commit/39ad4f8))


### BREAKING CHANGES

* If you've already configured your `resolve.alias` with a `.less` extension, you can now remove that wrong extension.
* The root option was never documented, so it's very unlikely that this is actually a breaking change. However, since the option was removed, we need to flag this as breaking.
* **dependencies:** Require webpack 2 as peer dependency
* **source-maps:** Since the map is now passed as an object to the next loader, this could potentially break if another loader than the css-loader is used. The css-loader accepts both.



Changelog
---------

### 3.0.0

- **Breaking**: Remove node 0.10 and 0.12 support
- **Breaking**: Remove official webpack 1 support. There are no breaking changes for webpack 1 with `3.0.0`, but future release won't be tested against webpack 1
- **Breaking**: Remove synchronous compilation support [#152](https://github.com/webpack-contrib/less-loader/pull/152) [#84](https://github.com/webpack-contrib/less-loader/issues/84)
- Reduce npm package size by using the [files](https://docs.npmjs.com/files/package.json#files) property in the `package.json`


### 2.2.3

- Fix missing path information in source map [#73](https://github.com/webpack/less-loader/pull/73)
- Add deprecation warning [#84](https://github.com/webpack/less-loader/issues/84)

### 2.2.2

- Fix issues with synchronous less functions like `data-uri()`, `image-size()`, `image-width()`, `image-height()` [#31](https://github.com/webpack/less-loader/issues/31) [#38](https://github.com/webpack/less-loader/issues/38) [#43](https://github.com/webpack/less-loader/issues/43) [#58](https://github.com/webpack/less-loader/pull/58)

### 2.2.1

- Improve Readme

### 2.2.0

- Added option to specify LESS plugins [#40](https://github.com/webpack/less-loader/pull/40)
