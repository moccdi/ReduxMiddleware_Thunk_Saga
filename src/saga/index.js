import { takeLatest,put,call } from 'redux-saga/effects';
import {getUserData} from "../api";

function makeSagaRequest(getData) {
    return function* (action) {
        yield put({
            type: `${action.type}_PENDING`,
        });
        try {
            const result = yield call(getData,action.payload);
            yield put({
                type: `${action.type}_SUCCESS`,
                result,
            })
        } catch (error) {

            yield put({
                type: `${action.type}_FAILURE`,
                error,
            });
        }
    };
}

export default function* login() {
    yield takeLatest('LOGIN',makeSagaRequest(getUserData)) //можно слушать не только action а масив из action
}