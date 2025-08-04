export default function (data) {
    return {
        // PROPERTIES
        init() {
        },
        // GETTERS
        // METHODS
        async _mxFetch_Get(url, data) {
            const urlParams = new URLSearchParams(data);
            return await fetch(url + '?' + urlParams)
                .then((response) => response.json())
        },
        async _mxFetch_Post(url, data, headers, isJson = true) {
            const response = await fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: "same-origin", // include, *same-origin, omit
                headers: headers || {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: isJson ? JSON.stringify(data) : data, // body data type must match "Content-Type" header
            })
            // parses JSON response into native JavaScript objects
            const result = response.json();
            result.status = response.status;
            return result;
        },
        async _mxFetch_Put(url, data, headers, isJson = true) {
            const response = await fetch(url, {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: "same-origin", // include, *same-origin, omit
                headers: headers || {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: isJson ? JSON.stringify(data) : data, // body data type must match "Content-Type" header
            })
            // parses JSON response into native JavaScript objects
            const result = response.json();
            result.status = response.status;
            return result;
        },
        async _mxFetch_Delete(url, data, headers) {
            const response = await fetch(url, {
                method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: "same-origin", // include, *same-origin, omit
                headers: headers || {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                //body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            // parses JSON response into native JavaScript objects
            const result = response.json();
            result.status = response.status;
            return result;
        }
    }
}