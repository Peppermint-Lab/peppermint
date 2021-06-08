# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Support for `behavior`, `block` and `inline` options, from [the spec](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView).
- `scrollMode: "if-needed" | "always"` to control the `if-needed` behavior, based on [the csswg proposal to the spec](https://github.com/w3c/csswg-drafts/pull/1805).

### Removed

- `centerIfNeeded`, use `scrollMode: "if-needed", block: "center"` instead.
- `duration` to trigger animation, use [`smooth-scroll-into-view-if-needed`](https://github.com/stipsan/smooth-scroll-into-view-if-needed) instead.
- `handleScroll(parent, {scrollLeft, scrollTop}, options)`, use `behavior: function(actions)` instead, where `actions` is an array of `{el, top, left}` allowing you to scroll everything in parallel or in a sequence, it's up to you.
- `offset`, use wrapper elements and CSS like padding or margins instead.

## [1.5.0] - 2018-02-25

### Added

- `sideEffects: false` in package.json to enable optimizations introduced in webpack v4.

## [1.4.0] - 2017-11-17

### Added

- New `handleScroll` option allows customizing scrolling behavior.

### Changed

- Animation logic is separated from scroll calculation logic. This allows skip
  importing animation dependencies and reduces bundle sizes when you don't need
  the built in animation feature.

## [1.3.0] - 2017-11-12

### Added

- New API interface (#148 @tonybdesign)

## [1.2.8] - 2017-11-05

### Fixed

- Missing TypeScript definitions and rollup/webpack pkg.module files from
  published package (#145)

## [1.2.7] - 2017-11-05

### Fixed

- Package published on npm contained unnecessary files bloating the package
  (#144)

## [1.2.6] - 2017-11-05

### Fixed

- Don't use postinstall as it runs in userland (#143)

## [1.2.5] - 2017-11-05

### Fixed

- Migrate tests to
  [new page](https://stipsan.github.io/scroll-into-view-if-needed/) that
  showcases how it works (#141)

## [1.2.4] - 2017-11-05

### Fixed

- TypeScript requires HTMLElement when it should accept Element (#140)

## [1.2.3] - 2017-11-04

### Fixed

- Incorrect TypeScript declarations and export format (#136)

## [1.2.2] - 2017-10-29

### Fixed

- Incorrect export declaration in TS typings (#132)

## [1.2.1] - 2017-10-02

### Fixed

- Fifth option should be optional (#129)

## [1.2.0] - 2017-10-01

### Added

- Set offset feature (#127 @iwangulenko)

## [1.1.1] - 2017-10-01

### Fixed

- Windows compatibility and CommonJS interop change back to Babel 5
  functionality (#121 @khell)

## [1.1.0] - 2017-03-29

### Added

- An optional argument finalElement was added to limit the scope of the function
  (#108 @hemnstill)

## [1.0.7] - 2017-03-14

### Added

- MIT License (#107 @JKillian)

### Changed

- Reduced size of dist build by switching from rollup to babel (#106 @JKillian)

## [1.0.6] - 2016-11-17

### Changed

- Updated typescript definition making options optional (#75 @pelotom)

## [1.0.5] - 2016-11-12

### Fixed

- Fix TypeScript definition file issues (#74 @forabi)

### Documentation

- React example snippet in readme.

## [1.0.4] - 2016-10-31

### Added

- Changelog readme.
- TypeScript definition file (#73 @forabi)

## 1.0.3 - 2016-09-30

### Documentation

- link to official ponyfill page (#68 @sindresorhus)

## 1.0.2 - 2016-04-18

### Added

- Greenkeeper

### Fixes

- Incomatibility with default webpack config.

## 1.0.1 - 2016-04-18

- PULLED: accidentally pushed incomplete build to npm!

## 1.0.0 - 2016-04-18

### Added

- Initial release.

[unreleased]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.5.0...HEAD
[1.5.0]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.2.8...v1.3.0
[1.2.8]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.2.7...v1.2.8
[1.2.7]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.2.6...v1.2.7
[1.2.6]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.2.5...v1.2.6
[1.2.5]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.2.4...v1.2.5
[1.2.4]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.2.3...v1.2.4
[1.2.3]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.0.7...v1.1.0
[1.0.7]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.0.6...v1.0.7
[1.0.6]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/stipsan/scroll-into-view-if-needed/compare/v1.0.3...v1.0.4
