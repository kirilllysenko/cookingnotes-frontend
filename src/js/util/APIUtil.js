import {ACCESS_TOKEN} from "../constants/APIurl";

export const request = (options, successCallback = () => {
}, errorCallback = () => {
}) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then((response) => {
            if (!response.ok) {
                errorCallback()
                throw Error(response.statusText)
            }
            return response
        }).then(response => response.status === 204 ? {} : response.json())
        .then(data => successCallback(data))
        .catch((error) => console.log(error))
};