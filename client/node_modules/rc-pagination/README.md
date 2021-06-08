# rc-pagination

React Pagination Component.

[![NPM version][npm-image]][npm-url] [![dumi](https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square)](https://github.com/umijs/dumi) [![build status][github-actions-image]][github-actions-url] [![Test coverage][coveralls-image]][coveralls-url] [![codecov](https://codecov.io/gh/react-component/pagination/branch/master/graph/badge.svg)](https://codecov.io/gh/react-component/pagination) [![Dependencies](https://img.shields.io/david/react-component/pagination.svg?style=flat-square)](https://david-dm.org/react-component/pagination) [![DevDependencies](https://img.shields.io/david/dev/react-component/pagination.svg?style=flat-square)](https://david-dm.org/react-component/pagination?type=dev) [![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-pagination.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-pagination
[github-actions-image]: https://github.com/react-component/pagination/workflows/CI/badge.svg
[github-actions-url]: https://github.com/react-component/pagination/actions
[coveralls-image]: https://img.shields.io/coveralls/react-component/pagination.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/pagination?branch=master
[download-image]: https://img.shields.io/npm/dm/rc-pagination.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-pagination

## Development

```
npm install
npm start
```

## Example

http://localhost:9001

online example: https://pagination-react-component.vercel.app

## Install

[![rc-pagination](https://nodei.co/npm/rc-pagination.png)](https://npmjs.org/package/rc-pagination)

## Usage

```js
import Pagination from 'rc-pagination';

ReactDOM.render(<Pagination />, container);
```

## API

| Parameter                    | Description                                               | Type                                               | Default                                                                                |
| ---------------------------- | --------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------- |
| disabled                     | disable pagination                                        | Bool                                               | -                                                                                      |
| defaultCurrent               | uncontrolled current page                                 | Number                                             | 1                                                                                      |
| current                      | current page                                              | Number                                             | undefined                                                                              |
| total                        | items total count                                         | Number                                             | 0                                                                                      |
| defaultPageSize              | default items per page                                    | Number                                             | 10                                                                                     |
| pageSize                     | items per page                                            | Number                                             | 10                                                                                     |
| onChange                     | page change callback                                      | Function(current, pageSize)                        | -                                                                                      |
| showSizeChanger              | show pageSize changer                                     | Bool                                               | `false` when total less then `totalBoundaryShowSizeChanger`, `true` when otherwise     |
| totalBoundaryShowSizeChanger | when total larger than it, `showSizeChanger` will be true | number                                             | 50                                                                                     |
| pageSizeOptions              | specify the sizeChanger selections                        | Array<String>                                      | ['10', '20', '50', '100']                                                              |
| onShowSizeChange             | pageSize change callback                                  | Function(current, size)                            | -                                                                                      |
| hideOnSinglePage             | hide on single page                                       | Bool                                               | false                                                                                  |
| showPrevNextJumpers          | show jump-prev, jump-next                                 | Bool                                               | true                                                                                   |
| showQuickJumper              | show quick goto jumper                                    | Bool / Object                                      | false / {goButton: true}                                                               |
| showTotal                    | show total records and range                              | Function(total, [from, to])                        | -                                                                                      |
| className                    | className of pagination                                   | String                                             | -                                                                                      |
| simple                       | when set, show simple pager                               | Object                                             | null                                                                                   |
| locale                       | to set l10n config                                        | Object                                             | [zh_CN](https://github.com/react-component/pagination/blob/master/src/locale/zh_CN.js) |
| style                        | the style of pagination                                   | Object                                             | {}                                                                                     |
| showLessItems                | show less page items                                      | Bool                                               | false                                                                                  |
| showTitle                    | show page items title                                     | Bool                                               | true                                                                                   |
| itemRender                   | custom page item renderer                                 | Function(current, type: 'page'                     | 'prev'                                                                                 | 'next' | 'jump-prev' | 'jump-next', element): React.ReactNode | `(current, type, element) => element` |
| prevIcon                     | specifict the default previous icon                       | ReactNode \| (props: PaginationProps) => ReactNode |                                                                                        |
| nextIcon                     | specifict the default previous icon                       | ReactNode \| (props: PaginationProps) => ReactNode |                                                                                        |
| jumpPrevIcon                 | specifict the default previous icon                       | ReactNode \| (props: PaginationProps) => ReactNode |                                                                                        |
| jumpNextIcon                 | specifict the default previous icon                       | ReactNode \| (props: PaginationProps) => ReactNode |                                                                                        |

## License

rc-pagination is released under the MIT license.
