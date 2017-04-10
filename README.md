# s3-stream
Create stream to upload files to S3

# Usage

```js
const s3Stream = require('s3-stream');

var stream = s3Stream('my/file/in/s3', 'image/jpeg', {
  bucket: 'myS3Bucket',
  accessKeyId: 'xxxxx',
  secretAccessKey: 'yyyyyy',
  region: 'eu-central-1'
}, function(data){
  console.log('Done uploading...');

  /* data:
    { ETag: '"a26c9877ddf2b502616e4b7da8f201d5"',
      Location: 'https://s3.eu-central-1.amazonaws.com/my/file/in/s3',
      key: 'my/file/in/s3',
      Key: 'my/file/in/s3'
      Bucket: 'myS3Bucket' }
    */
});

var fileStream = fs.createReadStream(myFilePath);
fileStream.pipe(stream);
```
