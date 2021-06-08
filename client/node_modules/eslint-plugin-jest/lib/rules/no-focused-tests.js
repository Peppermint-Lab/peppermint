"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _experimentalUtils = require("@typescript-eslint/experimental-utils");

var _utils = require("./utils");

const validTestCaseNames = [_utils.TestCaseName.test, _utils.TestCaseName.it];
const testFunctions = new Set([_utils.DescribeAlias.describe, ...validTestCaseNames]);

const isConcurrentExpression = expression => (0, _utils.isSupportedAccessor)(expression.property, _utils.TestCaseProperty.concurrent) && !!expression.parent && expression.parent.type === _experimentalUtils.AST_NODE_TYPES.MemberExpression;

const matchesTestFunction = object => 'name' in object && typeof object.name === 'string' && (object.name in _utils.TestCaseName || object.name in _utils.DescribeAlias);

const isCallToFocusedTestFunction = object => object.name.startsWith('f') && testFunctions.has(object.name.substring(1));

const isCallToTestOnlyFunction = callee => matchesTestFunction(callee.object) && (0, _utils.isSupportedAccessor)(isConcurrentExpression(callee) ? callee.parent.property : callee.property, 'only');

var _default = (0, _utils.createRule)({
  name: __filename,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Disallow focused tests',
      recommended: 'error',
      suggestion: true
    },
    messages: {
      focusedTest: 'Unexpected focused test.',
      suggestRemoveFocus: 'Remove focus from test.'
    },
    schema: [],
    type: 'suggestion'
  },
  defaultOptions: [],
  create: context => ({
    CallExpression(node) {
      const callee = node.callee.type === _experimentalUtils.AST_NODE_TYPES.TaggedTemplateExpression ? node.callee.tag : node.callee;

      if (callee.type === _experimentalUtils.AST_NODE_TYPES.MemberExpression) {
        const calleeObject = callee.object;

        if (calleeObject.type === _experimentalUtils.AST_NODE_TYPES.Identifier && isCallToFocusedTestFunction(calleeObject)) {
          context.report({
            messageId: 'focusedTest',
            node: calleeObject,
            suggest: [{
              messageId: 'suggestRemoveFocus',

              fix(fixer) {
                return fixer.removeRange([calleeObject.range[0], calleeObject.range[0] + 1]);
              }

            }]
          });
          return;
        }

        if (calleeObject.type === _experimentalUtils.AST_NODE_TYPES.MemberExpression && isCallToTestOnlyFunction(calleeObject)) {
          context.report({
            messageId: 'focusedTest',
            node: isConcurrentExpression(calleeObject) ? callee.property : calleeObject.property,
            suggest: [{
              messageId: 'suggestRemoveFocus',

              fix(fixer) {
                if (calleeObject.property.type === _experimentalUtils.AST_NODE_TYPES.Identifier && calleeObject.property.name === 'only') {
                  return fixer.removeRange([calleeObject.object.range[1], calleeObject.range[1]]);
                }

                return fixer.removeRange([calleeObject.range[1], callee.range[1]]);
              }

            }]
          });
          return;
        }

        if (isCallToTestOnlyFunction(callee)) {
          context.report({
            messageId: 'focusedTest',
            node: callee.property,
            suggest: [{
              messageId: 'suggestRemoveFocus',

              fix(fixer) {
                return fixer.removeRange([calleeObject.range[1], callee.range[1]]);
              }

            }]
          });
          return;
        }
      }

      if (callee.type === _experimentalUtils.AST_NODE_TYPES.Identifier && isCallToFocusedTestFunction(callee)) {
        context.report({
          messageId: 'focusedTest',
          node: callee,
          suggest: [{
            messageId: 'suggestRemoveFocus',

            fix(fixer) {
              return fixer.removeRange([callee.range[0], callee.range[0] + 1]);
            }

          }]
        });
      }
    }

  })
});

exports.default = _default;