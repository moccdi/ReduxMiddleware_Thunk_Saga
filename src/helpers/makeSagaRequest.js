import {call, put,race} from "redux-saga/effects";
import {delay} from "redux-saga";






export default function makeSagaRequest(getData) {
    return function* (action) {
        yield put({
            type: `${action.type}_PENDING`,
        });
        try {
            const { result, timeout } = yield race({ //race кто первее вызоветься из двух и больше call
              result: call(getData, action.payload),
              timeout: call(delay, 1000),
            });

            console.log('11111111111',result,timeout)
            if (result) {
              yield put({
                type: `${action.type}_SUCCESS`,
                result,
              });
              return result;
            } else {
              yield put({
                type: `${action.type}_TIMEOUT`,
              });
            }
        } catch (error) {

                yield put({
                    type: `${action.type}_FAILURE`,
                    error,
                });
        }
    };
}





// export default function makeSagaRequest(getData) {
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