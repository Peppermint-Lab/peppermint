# rc-steps

---

React steps component.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Dependencies][david-image]][david-url]
[![DevDependencies][david-dev-image]][david-dev-url]
[![npm download][download-image]][download-url]
[![bundle size][bundlephobia-image]][bundlephobia-url]

[npm-image]: http://img.shields.io/npm/v/rc-steps.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-steps
[travis-image]: https://img.shields.io/travis/react-component/steps.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/steps
[codecov-image]: https://img.shields.io/codecov/c/github/react-component/steps/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/react-component/steps/branch/master
[david-url]: https://david-dm.org/react-component/steps
[david-image]: https://david-dm.org/react-component/steps/status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/react-component/steps?type=dev
[david-dev-image]: https://david-dm.org/react-component/steps/dev-status.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/rc-steps.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-steps
[bundlephobia-url]: https://bundlephobia.com/result?p=rc-steps
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/rc-steps

## Usage

```bash
npm install rc-steps
```

```jsx
<Steps current={1}>
  <Steps.Step title="first" />
  <Steps.Step title="second" />
  <Steps.Step title="third" />
</Steps>
```

## Example

https://react-component.github.io/steps/

## API

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">name</th>
      <th style="width: 50px;">type</th>
      <th style="width: 50px;">default</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>type</td>
      <td>string</td>
      <td>default</td>
      <td>diretypetion of Steps, enum: `default` or `navigation`</td>
    </tr>
    <tr>
      <td>direction</td>
      <td>string</td>
      <td>horizontal</td>
      <td>direction of Steps, enum: `horizontal` or `vertical`</td>
    </tr>
    <tr>
      <td>current</td>
      <td>number</td>
      <td>0</td>
      <td>index of current step</td>
    </tr>
    <tr>
      <td>initial</td>
      <td>number</td>
      <td>0</td>
      <td>index initial</td>
    </tr>
    <tr>
      <td>size</td>
      <td>string</td>
      <td></td>
      <td>size of Steps, could be `small`</td>
    </tr>
    <tr>
      <td>labelPlacement</td>
      <td>string</td>
      <td></td>
      <td>placement of step title, could be `vertical`</td>
    </tr>
    <tr>
      <td>status</td>
      <td>string</td>
      <td>wait</td>
      <td>status of current Steps, could be `error` `process` `finish` `wait`</td>
    </tr>
    <tr>
      <td>icons</td>
      <td>{ finish: ReactNode, error: ReactNode }</td>
      <td></td>
      <td>specify the default finish icon and error icon</td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>(current: number) => void</td>
      <td></td>
      <td>Trigger when Step changed</td>
    </tr>
  </tbody>
</table>

### Steps.Step

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th style="width: 100px;">name</th>
      <th style="width: 50px;">type</th>
      <th style="width: 50px;">default</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>title</td>
      <td>ReactNode</td>
      <td></td>
      <td>title of step item</td>
    </tr>
    <tr>
      <td>subTitle</td>
      <td>ReactNode</td>
      <td></td>
      <td>subTitle of step item</td>
    </tr>
    <tr>
      <td>description</td>
      <td>ReactNode</td>
      <td></td>
      <td>description of step item</td>
    </tr>
    <tr>
      <td>icon</td>
      <td>ReactNode</td>
      <td></td>
      <td>set icon of step item</td>
    </tr>
    <tr>
      <td>status</td>
      <td>string</td>
      <td></td>
      <td>status of current Steps, could be `error` `process` `finish` `wait`</td>
    </tr>
    <tr>
      <td>tailContent</td>
      <td>ReactNode</td>
      <td></td>
      <td>content above tail</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>bool</td>
      <td>false</td>
      <td>disabled step when onChange exist</td>
    </tr>
  </tbody>
</table>

## Development

```
npm install
npm start
```

## License

rc-steps is released under the MIT license.
