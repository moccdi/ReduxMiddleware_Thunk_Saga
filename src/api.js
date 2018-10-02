import axios from 'axios';

const API_URL = 'https://api.github.com';

export function getUserData(userName) {
    return axios.get(`${API_URL}/users/${userName}`)
        .then(res => res.data);

}



// export function getUserData(userName) {
//     return fetch(`${API_URL}/users/${userName}`)
//         .then(res => res.json());
// }