// import dependencies
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../db.json');

// initialize router dependency
const router = express.Router();

// create REST routers
// GET /api/
router.get('/api/', async (req, res) => {
   await fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
      if (!err) {
         const tasks = JSON.parse(data);
         console.log(tasks);
         res.json(tasks);
      } else {
         console.error('error', err);
         res.status(404).json({ success: false, status: '404 Not Found', message: err });
      }
   });
});

// GET 
router.get('', async (req, res) => {
   await fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
      if (!err) {
         const tasks = JSON.parse(data);
         res.json(tasks.tasks);
      } else {
         console.error('error', err);
         res.status(404).json({ success: false, status: '404 Not Found', message: err });
      }
   });
});
// GET /:id
router.get('/:id', async (req, res) => {
   await fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (!err) {
         const tasks = JSON.parse(data);
         const id = req.params.id;
         res.json(tasks.tasks.find(task => task.id.toString() === id));
      } else {
         res.send('No Data...');
      }
   });
});

// POST  UPDATE TASKS @ ROOT
router.post('/api/', async (req, res) => {
   try {
      await fs.writeFile(filePath, JSON.stringify(req.body), err => {
         if (!err) {
            console.log('data saved');
            res.status(200).json({ sucess: true });
         } else console.error('error: ' + err);
      });
   } catch (err) {
      console.error('error saving data: ' + err);
   }
});

// POST tasks
router.post('', async (req, res) => {
   try {
      // get current list form disk
      const tasks = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
      // check if any tasks are in Array
      if (tasks.tasks.length === 0) {
         // if not create array
         tasks.tasks = [];
      }
      // check if any queries exist
      if (Object.keys(req.query).length != 0 && req.query.constructor === Object) {
         // do things with query req.query
         // handle drag and dropp
         if (req.query.srcI !== undefined && req.query.disI !== undefined) {
            tasks.tasks.splice(req.query.disI, 0, tasks.tasks.splice(req.query.srcI, 1)[0]);
            await fs.writeFile(filePath, JSON.stringify(tasks), err => {
               if (!err) console.log('data saved');
               else console.error('error: ' + err);
            });
            console.log('drag and dropp');
            console.log(tasks);
            res.status(201).json({ success: true, message: 'tasks re arranged succufly' });
         } else {
            res.status(403).json({ success: false, message: 'contanct support' });
         }
      } else {
         let _tasks = [...tasks.tasks];
         const highTaskId = _tasks.sort((a, b) => b.id - a.id);
         console.log(tasks);
         let id = 0;
         if (tasks.tasks.length > 0) id = highTaskId[0].id + 1;
         let newTask = { ...req.body, id };
         const newTasks = { tasks: [...tasks.tasks, newTask] };

         await fs.writeFile(filePath, JSON.stringify(newTasks), err => {
            if (!err) console.log('data saved');
            else console.error('error: ' + err);
         });
         res.json(req.body);
      }
   } catch (err) {
      console.error(err);
      res.json({ success: false });
   }
});

// DELETE 
router.delete('/:id', async (req, res) => {
   try {
      const tasks = (await readWrite(0, path, 'db.json', null)).tasks;
      const task = tasks.find(task => task.id == req.params.id);
      if (!task) {
         res.status(404).json(`this task dosnot exist`);
         return -1;
      }
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);
      await readWrite(1, path, 'db.json', { tasks: tasks });
      res.send(`task #id:${task.id} has been deleted`);
   } catch (err) {
      console.error(`Error while PUT update task! [${err}]`);
   }
});
// PUT /id
router.put('/:id', async (req, res) => {
   try {
      // read tasks form dis

      const tasks = (await readWrite(0, path, 'db.json', null)).tasks;
      const task = tasks.find(task => task.id == req.params.id);
      if (!task) {
         res.status(404).json(`this task dosnot exist`);
         return -1;
      }
      const index = tasks.indexOf(task);
      tasks.splice(index, 1, req.body);
      await readWrite(1, path, 'db.json', { tasks: tasks });
      res.json(task);
   } catch (err) {
      console.error(`Error while PUT update task! [${err}]`);
   }
});

// Read/Write tata to disk and from disk.
/**
 *
 * @param {Number} operation Read=0/Write=1
 * @param {String} filePath to file or folder
 * @param {String} file File dayName
 * @param {Object} data data to store
 * @returns
 */
const readWrite = async (operation = 0, path, file, data) => {
   try {
      let _filePath = null;
      let _Data = null;
      // check if there is no data?
      if (!data && operation != 0) {
         console.error(`No Data to Read or write on file!`);
         return -1;
      }
      // check if there is no file name?
      if (!file) {
         console.error(`No File Name provided to Read or write!`);
         return -1;
      }
      //check if there is path?
      if (!path) {
         console.error(`No path to file was provided! However, we add the current path.`);
         // iniciate path and assign to path
         const path = require('path');
         _filePath = path.join(__dirname, file);
      } else {
         _filePath = path.join(__dirname, file);
      }
      console.log(_filePath);
      // check if operation is Read or Write?
      if (operation === 0) {
         // if operation is Read
         const data = fs.readFileSync(filePath, { encoding: 'utf-8' }, err => {
            if (!err) {
               console.log(`data is availble:..`);
            } else {
               console.error('error', err);
               return -1;
            }
         });
         return JSON.parse(data);
      } else if (operation === 1) {
         // if operation is Write
         await fs.writeFile(filePath, JSON.stringify(data), err => {
            if (!err) console.log('data saved');
            else console.error('error: ' + err);
         });
         console.log('Data saved successfully');
         return 1;
      } else {
         return -1;
      }
   } catch (err) {
      console.error(`Error loading file: ${err}`);
      return -1;
   }
};

// export router
module.exports = router;

