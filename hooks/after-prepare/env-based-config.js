var path = require("path");
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = function (logger, projectData, usbLiveSyncService) {

    var readStream = null;
    var writeStream = null;
    var hasError = false;

    function rejectCleanup(err, reject) {
        hasError = true;

        readStream.destroy();
        writeStream.end();
        logger.error(err);
        reject(err);
    }

    function createReadStream(buildProfile) {
        var fileToRead = path.join(projectData.projectDir, 'config', 'config.' + buildProfile + '.json');

        readStream = fs.createReadStream(fileToRead);
        readStream.on('error', rejectCleanup);
    }

    function createWriteStream(directoryToWriteTo, resolve) {
        var fileToWriteTo = path.join(directoryToWriteTo, 'config.json');

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

        var buildProfile = process.env['BUILD_PROFILE'];
        var directoryToWriteTo = path.join(projectData.projectDir, 'app', 'config');

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
