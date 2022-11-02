const fs = require('fs');
const path = require('path');
const through2 = require('through2');

const gulpCpFile = (args) => {
  const { src, dest, fileName } = args;
  return through2.obj(function (file, enc, callback) {
    if (src && dest && fileName) {
      try {
        let filePath = path.relative('./', file.path);
        let lastSlashIndex = filePath.lastIndexOf('\\');
        if (lastSlashIndex < 0) {
          lastSlashIndex = filePath.lastIndexOf('/');
        }
        filePath = filePath.substring(0, lastSlashIndex);
        const sourcePath = path.relative('./', src);
        const targetPath = path.relative('./', `${filePath}/${dest}`);

        if (fs.existsSync(targetPath)) {
          fs.writeFileSync(
            `${targetPath}/${fileName}`,
            fs.readFileSync(`${sourcePath}/${fileName}`),
          );
        } else {
          fs.mkdirSync(targetPath);
          fs.writeFileSync(
            `${targetPath}/${fileName}`,
            fs.readFileSync(`${sourcePath}/${fileName}`),
          );
        }
      } catch (error) {
        console.error('gulpCpFile error:', error);
      }
    }
    callback(null, file);
  });
};

module.exports = gulpCpFile;
