import { isPlainObject, isArray } from 'is-what'

type PlainObject = { [key in string | symbol]: any }

function assignProp (
  carry: PlainObject,
  key: string | symbol,
  newVal: any,
  originalObject: PlainObject,
  includeNonenumerable: boolean
): void {
  const propType = {}.propertyIsEnumerable.call(originalObject, key)
    ? 'enumerable'
    : 'nonenumerable'
  if (propType === 'enumerable') carry[key as any] = newVal
  if (includeNonenumerable && propType === 'nonenumerable') {
    Object.defineProperty(carry, key, {
      value: newVal,
      enumerable: false,
      writable: true,
      configurable: true,
    })
  }
}

export type Options = { props?: (string | symbol)[]; nonenumerable?: boolean }

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
export function copy<T extends any> (target: T, options: Options = {}): T {
  if (isArray(target)) return target.map((item) => copy(item, options)) as T
  if (!isPlainObject(target)) return target
  const props = Object.getOwnPropertyNames(target)
  const symbols = Object.getOwnPropertySymbols(target)
  return [...props, ...symbols].reduce((carry, key) => {
    if (isArray(options.props) && !options.props.includes(key)) {
      return carry
    }
    const val = target[key]
    const newVal = copy(val, options)
    assignProp(carry, key, newVal, target, options.nonenumerable)
    return carry
  }, {} as T)
}
