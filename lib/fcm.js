var admin = require("firebase-admin");
function FCM(key) {
    if(!key){
      throw Error('Please provide the key file!');
    }else {
      admin.initializeApp({
          credential: admin.credential.cert(key)
      });

        this.send = function(payload, callback){
            if (!callback) {
                throw Error('Please provide a callback function');
            }
            else{
                if(!payload) callback(new Error('Please provide message object'))
                else {
                    // See documentation on defining a message payload.
                      // var message = {
                      //   data: {
                      //     score: '850',
                      //     time: '2:45'
                      //   },
                      //   token: registrationToken
                      // };

                      // Send a message to the device corresponding to the provided
                      // registration token.
                      admin.messaging().send(payload)
                        .then((response) => {
                          // Response is a message ID string.
                          callback(null,response)
                          console.log('Successfully sent message:', response);
                        })
                        .catch((error) => {
                          callback(error)
                          console.log('Error sending message:', error);
                        });
                      }
                  }
        }

        this.subscribeToTopic = function(registrationTokens, topic, callback) {
          admin.messaging().subscribeToTopic(registrationTokens, topic)
              .then(function(response) {
                // See the MessagingTopicManagementResponse reference documentation
                // for the contents of response.
                callback(null,response)
                console.log('Successfully subscribed to topic:', response);
              })
              .catch(function(error) {
                callback(error)
                console.log('Error subscribing to topic:', error);
              });
        }

        this.unsubscribeFromTopic = function(registrationTokens, topic, callback) {
          admin.messaging().unsubscribeFromTopic(registrationTokens, topic)
              .then(function(response) {
                // See the MessagingTopicManagementResponse reference documentation
                // for the contents of response.
                callback(null,response)
                console.log('Successfully unsubscribed to topic:', response);
              })
              .catch(function(error) {
                callback(error)
                console.log('Error unsubscribing to topic:', error);
              });
        }
    }
}
module.exports = FCM;
