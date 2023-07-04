console.log("Halo, kita akan belajar membuat server");

const http = require("http");

/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */

const requestListener = (request, response) => {
    response.setHeader("Content-Type", "text/html");

    response.statusCode = 200;
    response.end("<h1>Halo HTTP Server!</h1>");
};
 
const server = http.createServer(requestListener);