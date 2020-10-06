var commons = require('./commons');
commons.makeAPIcall({
    url: 'http://my-custom-module.com/test',
    method: "GET",
    body: commons.stringify({
        some: ["important", "data"]
    })
}).then((data) => {
    console.log("Process Data");
}).catch((error) => {
    console.log("handle Error")
});