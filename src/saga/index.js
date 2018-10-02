import {takeLatest, all, takeEvery, select, put, race} from 'redux-saga/effects';
import {getUserData,getReposData} from "../api";
import makeSagaRequest from "../helpers/makeSagaRequest";
import {getRepos} from "../reducer/repos";


function* onRepo() {
    yield takeLatest('GET_REPOS',makeSagaRequest(getReposData))
}


function* getReposAfterLogin() {
    yield takeLatest('LOGIN_SUCCESS',function*({ result }){
        yield put(getRepos(result.login));
    }); //можно слушать не только action а масив из action
}


function* login() {
    yield takeLatest('LOGIN',makeSagaRequest(getUserData)) //можно слушать не только action а масив из action
}

function* logger() {
    yield takeEvery('*',function* (action) { // '*' - Вывести все объекты как библиотека redux-logger только не показывает  состояние
        const store = yield select();
        // console.log('action',action)
        // console.log('store',store)

    }); //можно слушать не только action а масив из action
}




export default function* () {
    yield all([
        login(),
        logger(),
        getReposAfterLogin(),
        onRepo(),
    ])
}




//race кто первее вызоветься из двух и больше call
//select()  const store = yield select(); //получает store
//all собирает несколько action
//put = dispatch
//call принимает функцию которую надо будет вызвать и данные которые надо будет вызвать ,и дальше будет вызывать внутри себя нужными аргументами
//takeEvery('*', //выполняет каждый action с любым type
//takeLatest срабатывает один раз

// function makeSagaRequest(getData) {
//     return function* (action) {
//         yield put({
//             type: `${action.type}_PENDING`,
//         });
//         try {
//             const result = yield call(getData,action.payload);
//             yield put({
//                 type: `${action.type}_SUCCESS`,
//                 result,
//             })
//         } catch (error) {
//
//             yield put({
//                 type: `${action.type}_FAILURE`,
//                 error,
//             });
//         }
//     };
// }

// export default function* login() {
//     yield takeLatest('LOGIN',makeSagaRequest(getUserData)) //можно слушать не только action а масив из action
// }