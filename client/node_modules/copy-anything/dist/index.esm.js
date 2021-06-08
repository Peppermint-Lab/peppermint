import { isArray, isPlainObject } from 'is-what';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
    var propType = {}.propertyIsEnumerable.call(originalObject, key)
        ? 'enumerable'
        : 'nonenumerable';
    if (propType === 'enumerable')
        carry[key] = newVal;
    if (includeNonenumerable && propType === 'nonenumerable') {
        Object.defineProperty(carry, key, {
            value: newVal,
            enumerable: false,
            writable: true,
            configurable: true,
        });
    }
}
/**
 * Copy (clone) an object and all its props recursively to get rid of any prop referenced of the original object. Arrays are also cloned, however objects inside arrays are still linked.
 *
 * @export
 * @template T
 * @param {T} target Target can be anything
 * @param {Options} [options = {}] Options can be `props` or `nonenumerable`
 * @returns {T} the target with replaced values
 * @export
 */
function copy(target, options) {
    if (options === void 0) { options = {}; }
    if (isArray(target))
        return target.map(function (item) { return copy(item, options); });
    if (!isPlainObject(target))
        return target;
    var props = Object.getOwnPropertyNames(target);
    var symbols = Object.getOwnPropertySymbols(target);
    return __spreadArrays(props, symbols).reduce(function (carry, key) {
        if (isArray(options.props) && !options.props.includes(key)) {
            return carry;
        }
        var val = target[key];
        var newVal = copy(val, options);
        assignProp(carry, key, newVal, target, options.nonenumerable);
        return carry;
    }, {});
}

export { copy };
