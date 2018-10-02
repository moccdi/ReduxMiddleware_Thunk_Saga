import {getUserData} from "../api";
import makeThunkRequest from "../helpers/makeThunkRequest";

const initialState = {
    entity: undefined,
    error: undefined,
    status: 'pending',
};

export default function stateReducer(state = initialState,action) {
  //  console.log(action)
    switch (action.type) {
        case 'LOGIN_PENDING' : {
            return {
                ...state,
                status: 'loading',
            }
        }
        case 'LOGIN_SUCCESS' : {
            return {
                ...state,
                entity: action.result,
                error: undefined,
                status: 'success',
            }
        }
        case 'LOGIN_FAILURE' : {
            return {
                ...state,
                entity: action.result,
                error: action.error,
                status: 'failure',
            }
        }
        default:
            return state;
    }
}

//saga
export function getUser(username) {
    return{ playload:username,type: 'LOGIN'};
    
}


//thunk
// export function getUser(username){
//     return makeThunkRequest(getUserData,{playload:username,type: 'LOGIN'})
// }


//thunk
// export function getUser(username){
//     return (dispatch) => {
//         dispatch({
//             type: 'LOGIN_PENDING',
//         });
//         return getUserData(username).then(
//             result =>
//                 dispatch({
//                     type: 'LOGIN_SUCCESS',
//                     result,
//                 }),
//             error =>
//                 dispatch({
//                     type: 'LOGIN_FAILURE',
//                     error,
//                 })
//         );
//
//     };
// }


//middleware
// //использование сихронных сигнатур(action мб) наличием 'promise' мб
// export function getUser(username){
//     return {
//         type: 'LOGIN',
//         payload: username,
//         promise: getUserData
//     }
// }