import http from 'http'

const port= 4000

http.createServer((request,response)=>{
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.end('Hello');
    console.log('Server responded with "Hello" ');
}).listen(port, ()=>{
console.log(`Server is running on port http://localhost:${port}`);

})
    