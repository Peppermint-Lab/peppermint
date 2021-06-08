import test from 'ava'
import { copy } from '../src/index'

test('copy - change original', t => {
  const original = { a: 0, b: 0, c: { d: 0 } }
  const copied = copy(original)
  t.deepEqual(copied, original)
  // change original
  original.a = 1
  t.is(original.a, 1)
  t.is(copied.a, 0)
  original.c.d = 1
  t.is(original.c.d, 1)
  t.is(copied.c.d, 0)
  // @ts-ignore
  original.c.e = 'new'
  // @ts-ignore
  t.is(original.c.e, 'new')
  // @ts-ignore
  t.is(copied.c.e, undefined)
})
test('copy - change copied', t => {
  const original = { a: false, b: '', c: { d: false } }
  const copied = copy(original)
  // change copied
  copied.a = true
  t.is(copied.a, true)
  t.is(original.a, false)
  copied.c.d = true
  t.is(copied.c.d, true)
  t.is(original.c.d, false)
  // @ts-ignore
  copied.c.e = 'new'
  // @ts-ignore
  t.is(copied.c.e, 'new')
  // @ts-ignore
  t.is(original.c.e, undefined)
})

test('Arrays in objects - change original', t => {
  const original = { a: [1, 2], c: { d: ['a'] } }
  const copied = copy(original)
  t.deepEqual(copied, original)
  // change original
  original.a.push(3)
  t.deepEqual(original.a, [1, 2, 3])
  t.deepEqual(copied.a, [1, 2])
  original.c.d.splice(0, 0, 'z')
  t.deepEqual(original.c.d, ['z', 'a'])
  t.deepEqual(copied.c.d, ['a'])
})
test('Arrays in objects - change copied', t => {
  const original = { a: [1, 2], c: { d: ['a'] } }
  const copied = copy(original)
  t.deepEqual(copied, original)
  // change copied
  copied.a.push(3)
  t.deepEqual(copied.a, [1, 2, 3])
  t.deepEqual(original.a, [1, 2])
  copied.c.d.splice(0, 0, 'z')
  t.deepEqual(copied.c.d, ['z', 'a'])
  t.deepEqual(original.c.d, ['a'])
})

test('Arrays with objects in objects - change original', t => {
  const original = { a: [{ a: 1 }], c: { d: [{ b: 1 }] } }
  const copied = copy(original)
  t.deepEqual(copied, original)
  // change original
  original.a[0].a = 2
  t.deepEqual(original.a, [{ a: 2 }])
  t.deepEqual(copied.a, [{ a: 1 }])
  original.c.d[0].b = 2
  t.deepEqual(original.c.d, [{ b: 2 }])
  t.deepEqual(copied.c.d, [{ b: 1 }])
})
test('Arrays with objects in objects - change copied', t => {
  const original = { a: [{ a: 1 }], c: { d: [{ b: 1 }] } }
  const copied = copy(original)
  t.deepEqual(copied, original)
  // change copied
  copied.a[0].a = 2
  t.deepEqual(copied.a, [{ a: 2 }])
  t.deepEqual(original.a, [{ a: 1 }])
  copied.c.d[0].b = 2
  t.deepEqual(copied.c.d, [{ b: 2 }])
  t.deepEqual(original.c.d, [{ b: 1 }])
})

test('Arrays', t => {
  const original = [1, 2, 3, 4]
  const copied = copy(original)
  t.deepEqual(copied, original)
  copied.splice(0, 0, 0)
  t.deepEqual(original, [1, 2, 3, 4])
  t.deepEqual(copied, [0, 1, 2, 3, 4])
})

test('non objects 1', t => {
  const original = 'ha'
  const copied = copy(original)
  t.is(copied, original)
})
test('non objects 2', t => {
  const original = 1
  const copied = copy(original)
  t.is(copied, original)
})
test('non objects 3', t => {
  const original = undefined
  const copied = copy(original)
  t.is(copied, original)
})

test('special objects 1', t => {
  const original = new Date()
  const copied = copy(original)
  t.deepEqual(copied, original)
})
test('special objects 2', t => {
  const original = {}
  const copied = copy(original)
  t.deepEqual(copied, original)
})

test('symbols as keys', t => {
  const mySymbol = Symbol('mySymbol')
  const original = { value: 42, [mySymbol]: 'hello' }
  const copied = copy(original)
  // change original
  original.value = 1
  // @ts-ignore
  original[mySymbol] = 2
  t.is(copied.value, 42)
  t.is(copied[mySymbol], 'hello')
  t.is(original.value, 1)
  // @ts-ignore
  t.is(original[mySymbol], 2)
})

test('nonenumerable keys - turned on', t => {
  const mySymbol = Symbol('mySymbol')
  const original = { value: 42 }
  Object.defineProperty(original, 'id', {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(original, mySymbol, {
    value: 'original',
    writable: true,
    enumerable: false,
    configurable: true,
  })
  const copied = copy(original, { nonenumerable: true })
  // change original
  // @ts-ignore
  original.id = 100
  original[mySymbol] = 'new'
  original.value = 300
  t.is(copied.value, 42)
  // @ts-ignore
  t.is(copied.id, 1)
  t.is(copied[mySymbol], 'original')
  t.is(Object.keys(copied).length, 1)
  t.true(Object.keys(copied).includes('value'))
  // @ts-ignore
  t.is(original.id, 100)
  t.is(original[mySymbol], 'new')
  t.is(original.value, 300)
  t.is(Object.keys(original).length, 1)
})

test('nonenumerable keys - turned off', t => {
  const mySymbol = Symbol('mySymbol')
  const original = { value: 42 }
  Object.defineProperty(original, 'id', {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(original, mySymbol, {
    value: 'original',
    writable: true,
    enumerable: false,
    configurable: true,
  })
  const copied = copy(original)
  // change original
  t.is(copied.value, 42)
  // @ts-ignore
  t.is(copied.id, undefined)
  t.is(copied[mySymbol], undefined)
})

test('specific props', t => {
  const mySymbol = Symbol('mySymbol')
  const mySymbol2 = Symbol('mySymbol')
  const original = { value: 42, value2: 24 }
  Object.defineProperty(original, 'id', {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(original, mySymbol, {
    value: 'original',
    writable: true,
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(original, 'id2', {
    value: 2,
    writable: true,
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(original, mySymbol2, {
    value: 'original2',
    writable: true,
    enumerable: false,
    configurable: true,
  })
  // only enumerable
  const copied = copy(original, { props: [mySymbol, 'value', 'id'] })
  t.is(copied.value, 42)
  // @ts-ignore
  t.is(copied.id, undefined)
  t.is(copied[mySymbol], undefined)
  t.is(copied.value2, undefined)
  // @ts-ignore
  t.is(copied.id2, undefined)
  t.is(copied[mySymbol2], undefined)
  t.is(Object.keys(copied).length, 1)
  t.true(Object.keys(copied).includes('value'))
  t.is(Object.keys(original).length, 2)

  // non-enumerable included
  const copied2 = copy(original, { props: [mySymbol, 'value', 'id'], nonenumerable: true })
  t.is(copied2.value, 42)
  // @ts-ignore
  t.is(copied2.id, 1)
  t.is(copied2[mySymbol], 'original')
  t.is(copied2.value2, undefined)
  // @ts-ignore
  t.is(copied2.id2, undefined)
  t.is(copied2[mySymbol2], undefined)
  t.is(Object.keys(copied2).length, 1)
  t.true(Object.keys(copied2).includes('value'))
  t.is(Object.keys(original).length, 2)
})
