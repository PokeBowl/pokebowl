const URL = './api';
import store from './store.js';

const token = store.getToken();
if(!token && location.pathname !== '/auth.html') {
    const searchParams = new URLSearchParams();
    searchParams.set('redirect', location.pathname);
    location = `auth.html?${searchParams.toString()}`;
}

function fetchWithError(url, options) {
    if(token) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers.Authorization = token;
    }

    return fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                return response.json().then(json => {
                    throw json.error;
                });
            }
        });
}

export function userSignUp(credentials) {
    const url = `${URL}/auth/signup`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });
}

export function userSignIn(credentials) {
    const url = `${URL}/auth/signin`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });
}



export function addHistoryItem(battleResult) {

    const url = `${URL}/battle-results`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(battleResult)
    });
}

export function getHistoryItems() {
    const url = `${URL}/battle-results`;
    return fetchWithError(url);
}

export function deleteUserHistory() {
    const url = `${URL}/battle-results/`;
    return fetchWithError(url, {
        method: 'DELETE'
    });
}



export function getUserPkmnStats() {
    const url = `${URL}/user-pokemon-stats`;
    return fetchWithError(url);
}

export function addUserPkmnStats(pokemon) {
    const url = `${URL}/user-pokemon-stats`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pokemon)
    });
}

export function updateUserPkmnStats(pokemon) {
    const url = `${URL}/user-pokemon-stats/${pokemon.id}`;
    return fetchWithError(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pokemon)
    });
} 

export function removeUserPkmnStats(id) {
    const url = `${URL}/user-pokemon-stats/${id}`;
    return fetchWithError(url, {
        method: 'DELETE'
    });
}