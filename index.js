var AWS = require('aws-sdk');
var Stream = require('stream');

module.exports = function createS3Stream(filePath, contentType, opts, onEnd){
  var config = new AWS.Config({
    accessKeyId: opts.accessKeyId,
    secretAccessKey: opts.secretAccessKey,
    region: opts.region || 'eu-central-1'
  });

  AWS.config = config;

  var s3 = new AWS.S3;
  var pass = new Stream.PassThrough();

  var params = {
    Bucket: opts.bucket,
    Key: filePath,
    Body: pass,
    ACL: 'public-read',
    ContentType: contentType
  };

  if(opts.CacheControl){
    params.CacheControl = opts.CacheControl
  }

  s3.upload(params, function(err, data) {
    console.log(err, data);
    onEnd && onEnd(data);
    /*
    { ETag: '"a26c9877ddf2b502616e4b7da8f201d5"',
      Location: 'https://s3.eu-central-1.amazonaws.com/medias.adrapid.se/static/medias/901a681f-4ef5-46a8-9090-4108b9da260b/2a9d16fb-b00a-4834-a7c8-b7ed8170c4e8/2a9d16fb-b00a-4834-a7c8-b7ed8170c4e8.png',
      key: 'static/medias/901a681f-4ef5-46a8-9090-4108b9da260b/2a9d16fb-b00a-4834-a7c8-b7ed8170c4e8/2a9d16fb-b00a-4834-a7c8-b7ed8170c4e8.png',
      Key: 'static/medias/901a681f-4ef5-46a8-9090-4108b9da260b/2a9d16fb-b00a-4834-a7c8-b7ed8170c4e8/2a9d16fb-b00a-4834-a7c8-b7ed8170c4e8.png',
      Bucket: 'medias.adrapid.se' }
    */
  });
  return pass;
}
