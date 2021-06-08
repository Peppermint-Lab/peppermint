import { create } from '../index';
test('create', function () {
    var store = create({ foo: true });
    expect(store.getState()).toEqual({ foo: true });
});
test('setState', function () {
    var store = create({ foo: false, bar: 1 });
    store.setState({ foo: false });
    expect(store.getState()).toEqual({ foo: false, bar: 1 });
});
test('subscribe', function () {
    var store = create({ foo: false });
    var listener1 = jest.fn();
    var listener2 = jest.fn();
    store.subscribe(listener1);
    store.subscribe(listener2);
    store.setState({ foo: false });
    expect(listener1).toBeCalled();
    expect(listener2).toBeCalled();
});
