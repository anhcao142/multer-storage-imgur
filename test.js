/* globals describe, it */

const assert        = require('chai').assert;
const ImgurStorage  = require('./index');
const fs            = require('fs');
const stream        = require('stream');
const onFinished    = require('on-finished');
const multer        = require('multer');
const FormData      = require('form-data');
const path          = require('path');


describe('Imgur Storage', function () {
    const upload    = multer({
        storage: ImgurStorage({ clientId: '{INPUT_YOUR_IMGUR_CLIENTID}' }),
    });


    it('should process parser/form-data POST request', function (done) {
        const form      = new FormData();
        const parser    = upload.single('img');

        form.append('name', 'Multer');
        form.append('img', fs.createReadStream(path.resolve(__dirname, './files/img2.jpg')));

        submitForm(parser, form, function (err, req) {
            const file = req.file;

            assert.isUndefined(err);
            assert.isDefined(req);
            assert.isDefined(file.data);
            assert.isDefined(file.success);
            assert.isDefined(file.status);
            assert.equal(file.status, 200);
            assert.isTrue(file.success, true);
            assert.isDefined(file.data.link);

            done();
        });
    });

    it('should throw error if file is not image', function (done) {
        const form      = new FormData();
        const parser    = upload.single('empty');

        form.append('empty', fs.createReadStream(path.resolve(__dirname, './files/empty.dat')));
        form.append('name', 'Multer');

        submitForm(parser, form, function (err, req) {
            assert.isDefined(err);
            assert.equal(err.message, 'File is not of image type');

            done();
        });
    });

    it('should process multiple files', function (done) {
        const form      = new FormData();
        const parser    = upload.fields([
            { name: 'img1', maxCount: 1 },
            { name: 'img2', maxCount: 1 },
        ]);

        form.append('img1', fs.createReadStream(path.resolve(__dirname, './files/img1.png')));
        form.append('img2', fs.createReadStream(path.resolve(__dirname, './files/img2.jpg')));

        submitForm(parser, form, function (err, req) {
            assert.ifError(err);

            assert.deepEqual(req.body, {});

            assert.equal(req.files['img1'][0].fieldname, 'img1');
            assert.equal(req.files['img1'][0].originalname, 'img1.png');
            assert.isDefined(req.files['img1'][0].data);
            assert.isString(req.files['img1'][0].data.link);


            assert.equal(req.files['img2'][0].fieldname, 'img2');
            assert.equal(req.files['img2'][0].originalname, 'img2.jpg');
            assert.isDefined(req.files['img2'][0].data);
            assert.isString(req.files['img2'][0].data.link);

            done();
        });
    });
});


function submitForm(parser, form, cb) {
    form.getLength((err, length) => {
        if (err) return cb(err);

        const req = new stream.PassThrough();

        req.complete = false;
        form.once('end', () => {
            req.complete = true;
        });

        form.pipe(req);
        req.headers = {
            'content-type': `multipart/form-data; boundary=${form.getBoundary()}`,
            'content-length': length,
        };

        return parser(req, null, (err2) => {
            onFinished(req, () => cb(err2, req));
        });
    });
}
