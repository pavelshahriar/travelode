const path = require("path");
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = function (logger, projectData, usbLiveSyncService) {

    let readStream = null;
    let writeStream = null;
    let hasError = false;

    function rejectCleanup(err) {
        hasError = true;

        readStream.destroy();
        writeStream.end();
        logger.error(err);
        reject(err);
    }

    function createReadStream(buildProfile) {
        const fileToRead = path.join(projectData.projectDir, 'config', 'config.' + buildProfile + '.json');

        readStream = fs.createReadStream(fileToRead);
        readStream.on('error', rejectCleanup);
    }

    function createWriteStream(directoryToWriteTo, resolve) {
        const fileToWriteTo = path.join(directoryToWriteTo, 'config.json');

        writeStream = fs.createWriteStream(fileToWriteTo);
        writeStream.on('error', rejectCleanup);
        writeStream.on('finish', function () {
            if (!hasError) {
                resolve();
            }
        });
    }

    return new Promise(function (resolve, reject) {
        // do not copy on live sync
        if (!!usbLiveSyncService.isInitialized) {
            resolve();
            return;
        }

        const buildProfile = process.env['BUILD_PROFILE'];
        const directoryToWriteTo = path.join(projectData.projectDir, 'app', 'config');

        mkdirp(directoryToWriteTo, function (err) {
            if (!err) {
                createReadStream(buildProfile);
                createWriteStream(directoryToWriteTo, resolve);
                readStream.pipe(writeStream);
            } else {
                rejectCleanup(err, reject);
            }
        });
    });
};