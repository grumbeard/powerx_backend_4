const fs = require('fs');
const path = require('path');

module.exports = () => {
  const service = {};

  service.logText = async (filename, text) => {
    const filepath = path.resolve(__dirname, '../../logs', filename);
    return fs.appendFile(filepath, text, (err) => {
      if (err) console.log('Error in writing log: ', err);
    });
  };

  service.clearLog = async (filename) => {
    const filepath = path.resolve(__dirname, '../../logs', filename);
    return fs.writeFile(filepath, '', (err) => {
      if (err) console.log('Error in clearing log: ', err);
    });
  };

  return service;
};
