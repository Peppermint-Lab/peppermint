"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _experimentalUtils = require("@typescript-eslint/experimental-utils");

var _utils = require("./utils");

const hasStringAsFirstArgument = node => node.arguments[0] && (0, _utils.isStringNode)(node.arguments[0]);

const findNodeNameAndArgument = node => {
  if (!((0, _utils.isTestCaseCall)(node) || (0, _utils.isDescribeCall)(node))) {
    return null;
  }

  if ((0, _utils.isEachCall)(node)) {
    if (node.parent.arguments.length > 0 && (0, _utils.isStringNode)(node.parent.arguments[0])) {
      return [node.callee.object.name, node.parent.arguments[0]];
    }

    return null;
  }

  if (node.callee.type !== _experimentalUtils.AST_NODE_TYPES.Identifier || !hasStringAsFirstArgument(node)) {
    return null;
  }

  return [node.callee.name, node.arguments[0]];
};

var _default = (0, _utils.createRule)({
  name: __filename,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce lowercase test names',
      category: 'Best Practices',
      recommended: false
    },
    fixable: 'code',
    messages: {
      unexpectedLowercase: '`{{ method }}`s should begin with lowercase'
    },
    schema: [{
      type: 'object',
      properties: {
        ignore: {
          type: 'array',
          items: {
            enum: [_utils.DescribeAlias.describe, _utils.TestCaseName.test, _utils.TestCaseName.it]
          },
          additionalItems: false
        },
        allowedPrefixes: {
          type: 'array',
          items: {
            type: 'string'
          },
          additionalItems: false
        },
        ignoreTopLevelDescribe: {
          type: 'boolean',
          default: false
        }
      },
      additionalProperties: false
    }]
  },
  defaultOptions: [{
    ignore: [],
    allowedPrefixes: [],
    ignoreTopLevelDescribe: false
  }],

  create(context, [{
    ignore = [],
    allowedPrefixes = [],
    ignoreTopLevelDescribe
  }]) {
    let numberOfDescribeBlocks = 0;
    return {
      CallExpression(node) {
        if ((0, _utils.isDescribeCall)(node)) {
          numberOfDescribeBlocks++;

          if (ignoreTopLevelDescribe && numberOfDescribeBlocks === 1) {
            return;
          }
        }

        const results = findNodeNameAndArgument(node);

        if (!results) {
          return;
        }

        const [name, firstArg] = results;
        const description = (0, _utils.getStringValue)(firstArg);

        if (allowedPrefixes.some(name => description.startsWith(name))) {
          return;
        }

        const firstCharacter = description.charAt(0);

        if (!firstCharacter || firstCharacter === firstCharacter.toLowerCase() || ignore.includes(name)) {
          return;
        }

        context.report({
          messageId: 'unexpectedLowercase',
          node: node.arguments[0],
          data: {
            method: name
          },

          fix(fixer) {
            const description = (0, _utils.getStringValue)(firstArg);
            const rangeIgnoringQuotes = [firstArg.range[0] + 1, firstArg.range[1] - 1];
            const newDescription = description.substring(0, 1).toLowerCase() + description.substring(1);
            return [fixer.replaceTextRange(rangeIgnoringQuotes, newDescription)];
          }

        });
      },

      'CallExpression:exit'(node) {
        if ((0, _utils.isDescribeCall)(node)) {
          numberOfDescribeBlocks--;
        }
      }

    };
  }

});

exports.default = _default;