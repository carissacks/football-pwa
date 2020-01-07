var webPush= require('web-push');

const vapidKeys= {
    "publicKey":"BOSFJ05UurL48Qbnnr8NiQaD8tvomTBzS9jRkTkbPQW3kkHt2QRxCCD3DpcQFqu-nOUP3WkTQzJrfJDOM-v19Hc",
    "privateKey":"jK6uS2--cenCd-jrYJikxuH9VSxhKXdR-qycjGj42Do"
};

webPush.setVapidDetails(
    'mailto:elaine.fawne@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
var pushSubscription= {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fmfCBFX08RM:APA91bH5DkV6ZRDjS8ardEq5yxWg5C9QUBaikgI7GxObEgDUjCAkv6DoszkOda514ubAEYP9ht6XXe3BsgjG4xItR8m1clTcb2kyjHWjr3tAswLMlbzU1TU4G7ezP0K9C0HQBiuOQ-0f",
    "keys": {
        "p256dh": "BNNixMLu2uAiQYhe01u8PrZfO9NL2P3cNYgeumMIv9T2+x47RDLl1Y8JzqNdCkaNjiS5TWoB+W5VUjlKWV6NdhM=",
        "auth": "domkeil0bh3lP3qKFpmAhQ=="
    }
};

var payload= "Yuk nonton Premiere League!.";

var options={
    gcmAPIKey: '417674891169',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
).catch(function(err){
    console.log(err);
    });