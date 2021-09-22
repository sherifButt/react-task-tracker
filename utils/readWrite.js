const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../db.json');
// Read/Write tata to disk and from disk.
/**
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

module.exports = readWrite;
