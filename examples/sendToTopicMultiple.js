var fcm = require('../index');
var Topics = ['Topic one', '..', 'Topic n'];
var FCM = new fcm('path/to/privatekey.json');

var message = {
  data: {
    score: '850',
    time: '2:45'
  },
  notification:{
    title : 'Navish',
    body : 'Test message by navish'
  }
};
FCM.sendToMultipleTopic(message, Topics, function(err, response) {
    if(err){
        console.log('err--', err);
    }else {
        console.log('response-----', response);
    }

})
