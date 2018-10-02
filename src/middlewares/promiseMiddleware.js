export default () => next => action => {
    //next дипо дизпач
    if(!action.promise){
        return next(action);
    }


    const { promise, type, payload, ...rest } = action;
    next({ ...rest, type: `${type}_PENDING` });
    return promise(payload).then(
        result => next({...rest,result,type:`${type}_SUCCESS`}),
        error => next({...rest,error,type:`${type}_FAILURE`}),
    )

}


// export default ({dispatch}) => next => action => {
//     if(typeof action === 'function'){
//         return action(dispatch);
//     } else {
//         next(action)
//     }
// } типо Saga 






// export default () => next => action => {
//     //next дипо дизпач
//     if(!action.promise){
//         return next(action);
//     }
//
//     const { promise,type,payload,...rest} = action;
//     return promise(payload).then((result) => next({...rest,result,type:`${type}_SUCCESS`}))
//
// }