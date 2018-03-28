var fcm = require('../index');
var TopicName = 'TopicName';
var FCM = new fcm('path/to/privatekey.json');

var message = {
  data: {
    score: '850',
    time: '2:45'
  },
  notification:{
    title : 'Navish',
    body : 'Test message by navish'
  },
  topic: TopicName
};
FCM.send(message, function(err, response) {
    if(err){
        console.log('err--', err);
    }else {
        console.log('response', response);
    }

})
