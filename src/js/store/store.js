import {applyMiddleware, createStore} from 'redux'
import reducers from "./reducers"
import initialState from "./initialState"

if (window.JSON && !window.JSON.dateParser) {
    const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    const reMsAjax = /^\/Date\((d|-|.*)\)[|\\]$/;

    JSON.dateParser = function (key, value) {
        if (typeof value === 'string') {
            let a = reISO.exec(value);
            if (a)
                return new Date(value);
            a = reMsAjax.exec(value);
            if (a) {
                let b = a[1].split(/[-+,.]/);
                return new Date(b[0] ? +b[0] : 0 - +b[1]);
            }
        }
        return value;
    };
}

const saver = store => next => action => {
    let result = next(action);
    localStorage['redux-store'] = JSON.stringify(store.getState());
    return result
};

const storeFactory = () =>
    applyMiddleware(saver)(createStore)(
        reducers,
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store'], JSON.dateParser) :
            initialState
    );

export default storeFactory