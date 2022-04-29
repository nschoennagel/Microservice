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