const express = require('express');
const fs = require('fs'),
   path = require('path'),
   filePath = path.join(__dirname, 'db.json'),
   { v4: uuidv4 } = require('uuid');
const cors = require('cors');

// import routers
const tasks = require('./routes/api/tasks');
// Init Express
const app = express();

// CORS
app.use(cors());

// body parser middleware
app.use(express.json());

// Create End point
app.use('/api/tasks', tasks);

if (process.env.NODE_ENV !== 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  // all routes should go to client/build/index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

// set headers middleware
app.use((req, res, next) => {
   res.header('Content-Type', 'application/json');
   res.header('Access-Control-Allow-Origin', '*');
   next();
});

// Listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started @ http://localhost:' + PORT));

function terminate(server, options = { coredump: false, timeout: 500 }) {
   // Exit function
   const exit = code => {
      options.coredump ? process.abort() : process.exit(code);
   };

   return (code, reason) => (err, promise) => {
      if (err && err instanceof Error) {
         // Log error information, use a proper logging library here :)
         console.log(err.message, err.stack);
      }

      // Attempt a graceful shutdown
      server.close(exit);
      setTimeout(exit, options.timeout).unref();
   };
}
