var AWS = require('aws-sdk');

// Set the region
AWS.config.update({region: 'eu-west-1'});

exports.handler = function(event, context, callback) {
    
    let name = event.queryStringParameters.key1;
    
    console.log(event);
    
    // Create the DynamoDB service object
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    
    var params = {
        TableName: 'NAME',
        Item: {
            'KEY' : {S: name}
        }
    };

    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
        if (err) {
                console.log("Error", err);
        } else {
                console.log("Success", data);
        }
    });


    // write to an sns topic
    ////////////////////////

    // Create publish parameters
    var params = {
        Message: 'Hello '+name, /* required */
        TopicArn: 'arn:aws:sns:eu-west-1:TOPIC'
      };
  
      // Create promise and SNS service object
      var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
  
      // Handle promise's fulfilled/rejected states
      publishTextPromise.then(
        function(data) {
          console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
          console.log("MessageID is " + data.MessageId);
        }).catch(
          function(err) {
          console.error(err, err.stack);
        });
      ///////////
      ///////////
    

    // return values    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!' + name),
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    };
    
    callback(null,response);
};