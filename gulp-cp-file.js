const fs = require('fs');
const path = require('path');
const through2 = require('through2');

const gulpCpFile = (args) => {
  const { src, dest, fileNameList } = args;
  return through2.obj(function (file, enc, callback) {
    if (src && dest && fileNameList && fileNameList.length > 0) {
      try {
        let filePath = path.relative('./', file.path);
        let lastSlashIndex = filePath.lastIndexOf('\\');
        if (lastSlashIndex < 0) {
          lastSlashIndex = filePath.lastIndexOf('/');
        }
        filePath = filePath.substring(0, lastSlashIndex);
        const sourcePath = path.relative('./', src);
        const targetPath = path.relative('./', `${filePath}/${dest}`);
        fileNameList.forEach((itemFileName) => {
          // console.info(
          //   '\x1B[0m%s \x1B[32m%s \x1B[0m%s \x1B[34m%s \x1B[0m',
          //   `Copying`,
          //   `${itemFileName}`,
          //   'to',
          //   `${targetPath}`,
          // );
          if (fs.existsSync(targetPath)) {
            fs.writeFileSync(
              `${targetPath}/${itemFileName}`,
              fs.readFileSync(`${sourcePath}/${itemFileName}`),
            );
          } else {
            fs.mkdirSync(targetPath);
            fs.writeFileSync(
              `${targetPath}/${itemFileName}`,
              fs.readFileSync(`${sourcePath}/${itemFileName}`),
            );
          }
        });
      } catch (error) {
        console.error('\x1B[31m gulpCpFile error: %s \x1B[0m', error);
      }
    }
    callback(null, file);
  });
};

module.exports = gulpCpFile;
