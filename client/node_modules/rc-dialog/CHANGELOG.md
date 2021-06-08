# Changelog

## 8.5.1

`2021-01-07`

- improve: ScrollLocker call related. [#227](https://github.com/react-component/dialog/pull/227)

## 8.5.0

`2021-01-04`

- refactor: use ScrollLocker. [#220](https://github.com/react-component/dialog/pull/220)

## 8.4.6

`2020-12-19`

- fix: trigger close only when click wrap itself. [#218](https://github.com/react-component/dialog/pull/218)

## 8.4.5

`2020-12-07`

- fix: Dialog should keep refresh when forceRender provided. [#217](https://github.com/react-component/dialog/pull/217)

## 8.4.4

`2020-12-03`

- fix: dialog dont close when mouseDown in content and mouseUp in wrapper. [#210](https://github.com/react-component/dialog/pull/210)

- chore: Should not re-render when dialog is invisible. [#212](https://github.com/react-component/dialog/pull/212)


## 8.4.3

`2020-10-21`

- chore: support react 17. [#207](https://github.com/react-component/dialog/pull/207)

## 8.4.2

`2020-10-14`

- fix: Dialog should not auto destroy. [#206](https://github.com/react-component/dialog/pull/206)

## 8.4.1

`2020-10-11`

- fix: Portal event bubble. [#204](https://github.com/react-component/dialog/pull/204)

## 8.4.0

`2020-09-29`

- refactor: Use `rc-motion`. [#203](https://github.com/react-component/dialog/pull/203)

## 8.3.4 (8.2.2, 8.1.2) / 2020-09-04
- fix: prevent scroll behavior when focus trigger. [ant-design/ant-design#26582](https://github.com/ant-design/ant-design/issues/26582)

## 8.3.3 / 2020-09-02
- fix: page scroll position will jump after dialog is closed. [#202](https://github.com/react-component/dialog/pull/202)

## 8.3.2 / 2020-09-02
- fix: remove typing from package.json. [#201](https://github.com/react-component/dialog/pull/201)

## 8.3.1 / 2020-09-02
- fix: add displayName. [#200](https://github.com/react-component/dialog/pull/200)

## 8.3.0 / 2020-08-31
- fate: add `modalRender`. [#195](https://github.com/react-component/dialog/pull/195)

## 8.2.0 / 2020-08-27
- use `father`. [#197](https://github.com/react-component/dialog/pull/197)

## 8.1.1 / 2020-08-19

- Fix dialog component will only show mask, if initialize a Dialog component with both forceRender and visible are true. [#194](https://github.com/react-component/dialog/pull/194)

## 8.1.0 / 2020-07-09

- remove babel runtime.
- up `rc-drawer` to `4.1.0`.

## 8.0.0 / 2020-05-29

- upgrade `rc-util` to `5.0.0`.

## 7.7.0 / 2020-05-05

- upgrade `rc-animate` to `3.0.0`.

## 7.4.0 / 2019-05-10

- Update accessibility.

## 7.3.0 / 2018-12-06

- Support `forceRender` for dialog.

## 7.2.0 / 2018-07-30

- Add closeIcon. [#89](*https://github.com/react-component/dialog/pull/89) [@HeskeyBaozi ](https://github.com/HeskeyBaozi)

## 7.1.0 / 2017-12-28

- Add destroyOnClose. [#72](https://github.com/react-component/dialog/pull/72) [@Rohanhacker](https://github.com/Rohanhacker)

## 7.0.0 / 2017-11-02


- Remove ReactNative support, please use https://github.com/react-component/m-dialog instead.
- Support React 16.

Notable change: Close animation won't trigger when dialog unmounting after React 16, see [facebook/react#10826](https://github.com/facebook/react/issues/10826)

## 6.5.11 / 2017-8-21

- fixed: RN modal support landscape orientation, https://github.com/react-component/dialog/pull/64

## 6.5.0 / 2016-10-25

- remove rc-dialog/lib/Modal's entry prop, add animationType prop

## 6.4.0 / 2016-09-19

- add rc-dialog/lib/Modal to support react-native

## 6.2.0 / 2016-07-18

- use getContainerRenderMixin from 'rc-util'

## 6.0.0 / 2016-03-18

- new html structure and class
- disable window scroll when show

## 5.4.0 / 2016-02-27

- add maskClosable

## 5.3.0 / 2015-11-23

- separate close and header

## 5.1.0 / 2015-10-20

- only support react 0.14

## 5.0.0 / 2015-08-17

- refactor to clean api. remove onShow onBeforeClose

## 4.5.0 / 2015-07-23

use rc-animate & rc-align

## 4.4.0 / 2015-07-03

support esc to close

## 4.2.0 / 2015-06-09

add renderToBody props

## 4.0.0 / 2015-04-28

make dialog render to body and use [dom-align](https://github.com/yiminghe/dom-align) to align

## 3.0.0 / 2015-03-17

support es6 and react 0.13

## 2.1.0 / 2015-03-05

`new` [#3](https://github.com/react-component/dialog/issues/3) support closable requestClose onBeforeClose
