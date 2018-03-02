# Puissance4

Les conditions de victoires ne sont pas fini.

Lorqu'on lance la commandce docker-compose up server

L'appli peut parfois fonctionner et parfois planter avec ces log d'érreurs je ne comprend pas pourquoi?.

Starting bureau_server_1 ... done
Attaching to bureau_server_1
server_1  | [nodemon] 1.15.1
server_1  | [nodemon] to restart at any time, enter `rs`
server_1  | [nodemon] watching: *.*
server_1  | [nodemon] starting `node src/server/index.js`
server_1  | Fri, 02 Mar 2018 13:34:33 GMT body-parser deprecated undefined extended: provide extended option at src/server/index.js:15:17
server_1  | Listening on port 80
server_1  | MongoNetworkError: failed to connect to server [mongo:27017] on first connect [MongoNetworkError: getaddrinfo ENOTFOUND mongo mongo:27017]
server_1  |     at Pool.<anonymous> (/app/node_modules/mongodb-core/lib/topologies/server.js:503:11)
server_1  |     at Pool.emit (events.js:127:13)
server_1  |     at Connection.<anonymous> (/app/node_modules/mongodb-core/lib/connection/pool.js:326:12)
server_1  |     at Object.onceWrapper (events.js:219:13)
server_1  |     at Connection.emit (events.js:127:13)
server_1  |     at Socket.<anonymous> (/app/node_modules/mongodb-core/lib/connection/connection.js:245:50)
server_1  |     at Object.onceWrapper (events.js:219:13)
server_1  |     at Socket.emit (events.js:127:13)
server_1  |     at emitErrorNT (internal/streams/destroy.js:64:8)
server_1  |     at process._tickCallback (internal/process/next_tick.js:152:19)
server_1  | [nodemon] app crashed - waiting for file changes before starting...
