var fcm = require('../index');
var token = '';
var FCM = new fcm('path/to/privatekey.json');

var message = {
  data: {
    score: '850',
    time: '2:45'
  },
  notification:{
    title : 'Navish Token',
    body : 'Test message by navish with token'
  },
  token : token
};
FCM.send(message, function(err, response) {
    if(err){
        console.log('err--', err);
    }else {
        console.log('response', response);
    }

})
