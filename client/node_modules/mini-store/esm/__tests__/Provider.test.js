import React, { useContext } from 'react';
import { mount } from 'enzyme';
import { create, Provider } from '../index';
import { MiniStoreContext } from '../Provider';
test('store context', function (done) {
    var store = create({});
    var App = function () {
        var contextStore = useContext(MiniStoreContext);
        expect(contextStore).toBe(store);
        done();
        return React.createElement("div", null, "hello");
    };
    mount(React.createElement(Provider, { store: store },
        React.createElement(App, null)));
});
