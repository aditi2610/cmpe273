var commons = {
    stringify = (element) => {
        if (typeof element === "string") {
            return element;
        } else if (element === null || typeof element === "undefined") {
            return element;
        } else if (typeof element === "object") {
            return JSON.stringify(element);
        } else if (typeof element === "number") {
            return element.toString();
        }
    },
    makeAPIcall = (obj) => {
        return new Promise((resolve, reject) => {
            obj = obj || {};
            if (!obj.url || !obj.method) {
                reject("Missing Params")
                return;
            } else {
                obj.body = obj.body || {};
                request({
                    method: obj.method,
                    uri: obj.url,
                    headers: obj.headers || {},
                    body: obj.body || {},
                    function (error, response, body) {
                        if (error) {
                            reject("Error from Third Party")
                            return;
                        } else {
                            resolve(body)
                        }
                    }
                })
            }
        })
    }
}