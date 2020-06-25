multer-storage-imgur
========================
[![npm version](https://badge.fury.io/js/multer-storage-imgur.svg)](https://badge.fury.io/js/multer-storage-imgur)
[![Dependency Status](https://david-dm.org/boylove142/multer-storage-imgur/status.svg)](https://david-dm.org/boylove142/multer-storage-imgur)
[![DevDependency Status](https://david-dm.org/boylove142/multer-storage-imgur/dev-status.svg)](https://david-dm.org/boylove142/multer-storage-imgur?type=dev)

This will upload using multer directly to Imgur

### Installation

```bash
$ npm install --save multer-storage-imgur
```

### Usage

```
const ImgurStorage = require('multer-storage-imgur');
const multer = require('multer');

const upload = multer({
  storage: ImgurStorage({ clientId: 'INPUT_YOUR_IMGUR_CLIENTID' })
})
```

After the file is uploaded to Imgur, the reponse json from Imgur will be appended to the file object like this:

```
\\ req
{
...
file: {
    fieldname: 'img',
    originalname: 'img2.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    data: {
        id: 'LnMoaHr',
        title: null,
        description: null,
        datetime: 1493549597,
        type: 'image/jpeg',
        animated: false,
        width: 564,
        height: 423,
        size: 9767,
        views: 0,
        bandwidth: 0,
        vote: null,
        favorite: false,
        nsfw: null,
        section: null,
        account_url: null,
        account_id: 0,
        is_ad: false,
        tags: [],
        in_most_viral: false,
        in_gallery: false,
        deletehash: 'XBizK4Enq1n7Fze',
        name: '',
        link: 'http://i.imgur.com/LnMoaHr.jpg'
    },
    success: true,
    status: 200}
}
```
