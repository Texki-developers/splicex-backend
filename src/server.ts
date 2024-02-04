import {app} from './app';
import * as http from 'http';

const PORT:number | string = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})