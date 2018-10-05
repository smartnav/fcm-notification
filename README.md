#### The fcm plugin for push notificaton on Android, ios and web.



###   fcm-notification
New reliesed of firebase team with admin.messaging()  to send push notification to iOS, Android and web, March 21, 2018.

 ![](https://user-images.githubusercontent.com/19702085/38019338-efe70d6a-3294-11e8-9668-3de48e2af7af.png "ddd")

### Usage
We tried to make this plugin as user (developer) friendly as possible, but if anything is unclear, please submit any questions as issues on GitHub: https://github.com/smartnav/fcm-notification/issues

###Install from NPM

    $ npm install fcm-notification --save
### Examples

**Before starting you need to download privatekey.json file from  **  [This link](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk "Service account tab")

 ![](https://user-images.githubusercontent.com/19702085/46529601-a7390300-c8b4-11e8-9427-fe02505bea6b.gif "ddd")

Check Steps:
- Go Choose a project to continue to the Firebase console - If already have then click on it otherwise create new one.
- Go to Service account tab and generate new private key (In node.js)
- Add this file in your project's workspace
- Import that file with a require('path/to/privatekey.json') style call and pass the object to the FCM constructor

### Start:
### Send to single token



```js
var fcm = require('fcm-notification');
var FCM = new fcm('path/to/privatekey.json');
var token = 'token here';

	var message = {
		data: {    //This is only optional, you can send any data
			score: '850',
			time: '2:45'
		},
		notification:{
			title : 'Title of notification',
			body : 'Body of notification'
		},
		token : token
		};

FCM.send(message, function(err, response) {
    if(err){
        console.log('error found', err);
    }else {
        console.log('response here', response);
    }
})
```

### Send to multiple tokens

```js
var fcm = require('fcm-notification');
var Tokens = [ 'token1 here', '....', 'token n here'];
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
FCM.sendToMultipleToken(message, Tokens, function(err, response) {
    if(err){
        console.log('err--', err);
    }else {
        console.log('response-----', response);
    }

})

```

### Send to a topic
FCM topic messaging allows you to send a message to multiple devices that have opted in to a particular topic.
But before this we need to subscribe to topic.
### Subscribe to topic
```js
var fcm = require('fcm-notification');
var FCM = new fcm('path/to/privatekey.json');
var tokens =[ 'token1 here', '....', 'token n here'];

FCM.subscribeToTopic(tokens, 'TopicName', function(err, response) {
    if(err){
        console.log('error found', err);
    }else {
        console.log('response here', response);
    }
})
```


### Unsubscribe to topic
```js
var fcm = require('fcm-notification');
var FCM = new fcm('path/to/privatekey.json');
var tokens =[ 'token1 here', '....', 'token n here'];

FCM.unsubscribeFromTopic(tokens, 'TopicName', function(err, response) {
    if(err){
        console.log('error found', err);
    }else {
        console.log('response here', response);
    }
})
```

### Send push to topic
```js
var fcm = require('fcm-notification');
var FCM = new fcm('path/to/privatekey.json');
var TopicName = 'TopicName';


var message = {
  data: {
    score: '850',
    time: '2:45'
  },
  notification:{
    title : 'Title name',
    body : 'Test body..'
  },
  topic: TopicName
};
FCM.send(message, function(err, response) {
    if(err){
        console.log('error found', err);
    }else {
        console.log('response here', response);
    }
})
```

### Send push to multiple topics
```js
var fcm = require('fcm-notification');
var FCM = new fcm('path/to/privatekey.json');
var Topics = ['Topic one',  '..',  'Topic n'];


var message = {
	  data: {
			score: '850',
			time: '2:45'
	  },
	  notification:{
			title : 'Title name',
			body : 'Test body..'
	  }
};
FCM.sendToMultipleTopic(message, Topics,  function(err, response) {
    if(err){
        console.log('error found', err);
    }else {
        console.log('response here', response);
    }
})
```

### Defining the message

It is possible to set android, apns, webpush and notification fields on the same message. FCM service will take all specified parameters into account and customize the message for each platform. However, a message must contain exactly one of the token, topic or condition fields. It is an error to specify zero or multiple fields.

### Android-specific fields

```js
var message = {
  android: {
    ttl: 3600 * 1000, // 1 hour in milliseconds
    priority: 'normal',
    notification: {
      title: '$GOOG up 1.43% on the day',
      body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
      icon: 'stock_ticker_update',
      color: '#f45342'
    }
  },
  topic: 'TopicName'
};

```

### APNS-specific fields (IOS)
```js
var message = {
  android: {
    ttl: 3600 * 1000, // 1 hour in milliseconds
    priority: 'normal',
    notification: {
      title: '$GOOG up 1.43% on the day',
      body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
      icon: 'stock_ticker_update',
      color: '#f45342'
    }
  },
  topic: 'TopicName'
};

```

### WebPush-specific fields

```js
var message = {
  webpush: {
    notification: {
      title: '$GOOG up 1.43% on the day',
      body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
      icon: 'https://my-server/icon.png'
    }
  },
  topic: 'TopicName'
};

```

### Putting it all together

A message may contain configuration parameters for multiple device platforms. This means it is possible to include android, apns and webpush fields in the same message. The FCM service customizes the message for each target platform when delivering. The following example shows how a notification has been customized for Android and iOS platforms:

```js
var message = {
  notification: {
    title: '$GOOG up 1.43% on the day',
    body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
  },
  android: {
    ttl: 3600 * 1000,
    notification: {
      icon: 'stock_ticker_update',
      color: '#f45342',
    },
  },
  apns: {
    payload: {
      aps: {
        badge: 42,
      },
    },
  },
  topic: 'TopicName'
};

```
In the same vein, it is possible include both data and notification fields in the same message.



License

[MIT](https://opensource.org/licenses/MIT "MIT")
