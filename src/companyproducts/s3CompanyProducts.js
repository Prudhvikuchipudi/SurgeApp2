const aws = require('aws-sdk');
var s3data;
/*console.oldLog = console.log;
console.log = function(value)
{
    console.oldLog(value);
    window.s3data = vaxlue;
};*/

(async function() {
      try {
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: 'AKIAJEQJRIWYYKZCO44Q',
            secretAccessKey: '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',
            region: 'us-east-1'
        });

        const s3 = new aws.S3();

        const response = await s3.listObjectsV2({
            Bucket: 'surge-app-v2',
            Prefix: 'Product Guidelines'
        }).promise();

        console.log(response);
        //var s3data;
        const data = await s3.getObject({
            Bucket: 'surge-app-v2',
            Key: 'Product Guidelines/data.json'
        }, function(err,data){
            if(err){
                console.log(err)
            }
            else{
                //s3data = data.Body;
                s3data = data.Body.toJSON();
                //s3data = data.Body.toString();
                //console.log(data.Body.toString());
            }
        }).promise();

        console.log(data);
        
    } catch(e) {
        console.log('our error', e);
    }
    debugger;

})();

export { s3data };