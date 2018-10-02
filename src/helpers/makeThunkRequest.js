export default function makeThunkRequest(getData,action) {
    return (dispatch) => {
        dispatch({
            type: `${action.type}_PENDING`,
        });
        return getData(action.payload).then(
            result =>
                dispatch({
                    type: `${action.type}_SUCCESS`,
                    result,
                }),
            error =>
                dispatch({
                    type: `${action.type}_FAILURE`,
                    error,
                })
        );

    };
}