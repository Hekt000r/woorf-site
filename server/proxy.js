   // server/proxy.js
   const { createProxyMiddleware } = require('http-proxy-middleware');

   module.exports = function(app) {
     app.use(
       '/api',
       createProxyMiddleware({
         target: 'http://localhost:5172', // Your backend server URL
         changeOrigin: true,
         pathRewrite: {
           '^/api': '', // remove base path
         },
       })
     );
   };