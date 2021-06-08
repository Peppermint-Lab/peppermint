[![Build Status](https://img.shields.io/travis/michaeltaranto/less-vars-to-js/master.svg?style=flat-square)](https://travis-ci.org/michaeltaranto/less-vars-to-js)
[![Coverage Status](https://img.shields.io/coveralls/michaeltaranto/less-vars-to-js.svg?style=flat-square)](https://coveralls.io/github/michaeltaranto/less-vars-to-js?branch=master)
[![npm](https://img.shields.io/npm/v/less-vars-to-js.svg?style=flat-square)](https://www.npmjs.com/package/less-vars-to-js) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
# less-vars-to-js
Read [LESS](http://lesscss.org/) variables from the contents of a file and return them as a javascript object.
```js
$ npm install --save less-vars-to-js
```

### Why?
I wrote this to use in our living style guide where we document our colour palette, typography, grid, components etc. This allows variables to be visualised in the style guide without having to read through the code (useful for non-technical team members).

### What does it do?
Takes in the contents of a less file as a `string` and returns an `object` containing all the variables it found. It is deliberately naive as it is not intending to be a less parser. Basically it reads anything starting with an `@`, so it will ignore comments, rule definitions, import statements etc.

Example :
```less
@import (reference) "theme";

// Colour palette
@blue: #0d3880;
@pink: #e60278;

// Elements
@background: @gray;
@favourite: blanchedalmond;

// Grid
@row-height: 9;

.element {
  @foreground: black;
  color: @foreground;
}
```
Example output:
```json
{
  "@blue": "#0d3880",
  "@pink": "#e60278",
  "@background": "@gray",
  "@favourite": "blanchedalmond",
  "@row-height": 9,
  "@foreground": "black"
}
```
**Note:** while it does return variables it finds within rules, it is recommended to use this on files containing only variables, as it's not a parser and is designed to extract design principles for style guides.

### Options
| Option            | Effect                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| resolveVariables  | Resolves variables when they are defined in the same file.                                                   |
| dictionary        | When `resolveVariables` is true, passes an object to use when the value cannot be resolved in the same file. |
| stripPrefix       | Removes the `@` or `$` in the returned object keys.                                                          |

### Usage
```js
import lessToJs from 'less-vars-to-js';
import fs from 'fs';

// Read the less file in as string
const paletteLess = fs.readFileSync('palette.less', 'utf8');

// Pass in file contents
const palette = lessToJs(paletteLess, {resolveVariables: true, stripPrefix: true});

// Use the variables (example React component)
export default class Palette extends Component {
  render() {
    return (
      <div>
      {
        Object.keys(palette)
          .forEach(colour => (
            <div style={{ backgroundColor: palette[colour] }}>
              <p>{ colour }</p>
              <p>{ palette[colour] }</p>
            </div>
          ))
      }
      </div>
    );
  }
}
```

### License

[MIT](http://michaeltaranto.mit-license.org)
