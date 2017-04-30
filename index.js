const imgur     = require('imgur');
const fs        = require('fs');
const concat    = require('concat-stream')



function setupImgurStorage(opts = {}) {
    if (!opts.clientId) throw new Error('Missing client id');
    imgur.setClientId(opts.clientId);

    function _handleFile(req, file, cb) {
        if (!file.mimetype || !file.mimetype.match(/image/gi)) {
            return cb(new Error('File is not of image type'));
        }

        file.stream.pipe(concat((data) => {
            imgur
                ._imgurRequest('upload', data, {})
                .then((json) => {
                    cb(null, json);
                })
                .catch(cb);
        }))
    }

    function _removeFile(req, file, cb) {};

    return { _handleFile, _removeFile };
}

module.exports = function (opts) {
    return setupImgurStorage(opts);
};
