var fcm = require('../index');
var token = 'add token here';
var FCM = new fcm('path/to/privatekey.json');


FCM.subscribeToTopic(['token'], 'TopicName', function(err, response) {
    if(err){
        console.log('err--', err);
    }else {
        console.log('response', response);
    }

})
