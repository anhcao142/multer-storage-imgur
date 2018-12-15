# multer-storage-imgur

[![Build Status](https://travis-ci.com/trevorblades/multer-storage-imgur.svg?branch=master)](https://travis-ci.com/trevorblades/multer-storage-imgur)

Multer storage engine that uploads images to Imgur

## Installation

```bash
$ npm install --save multer-storage-imgur
```

## Usage

```js
const ImgurStorage = require('multer-storage-imgur');
const multer = require('multer');

const upload = multer({
  storage: ImgurStorage({
    clientId: 'INPUT_YOUR_IMGUR_CLIENTID'
  })
});
```

After the file is uploaded to Imgur, the JSON reponse from Imgur will be appended to the file object like this:

```js
\\ req
{
  ...rest,
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
    status: 200
  }
}
```
