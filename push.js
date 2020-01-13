var webPush= require('web-push');

const vapidKeys= {
    "publicKey":"BAmo3DBm20dJE1OijcFM580e7DSENmQYcm-fysH0U6k2VqhNWAmWBjKVbzNO4BniLJJDSyySbdyQG86Td_02eOM",
    "privateKey":"iNlLMMDe8YF-jYDUsWzO1tH4gbzlDdERLW0Vb6ieyyY"
};

webPush.setVapidDetails(
    'mailto:elaine.fawne@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
var pushSubscription= {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eml1N1WfvAU:APA91bGmdZh_aSciaCoTjKU1kN1Vve_SJiHlq-SnQPpZYBjEWMnqGiUbkNFU3yhoszwcHOW8M0Z2cTVnUe2ka-uIljAhutRn9-wm6NRbyhP61q87-BhImY1h2M9pr0EvUEflJMtOxKQT",
    "keys": {
        "p256dh": "BOBc0D7Um9LgkjN6s32m2OEr+wJ+7FhULmtP5M07FtnBII+S6H+EzQz2jvv33hgWANZdc5MvWjiaGCs9YXPRdYs=",
        "auth": "cguueWiVNH6PJ/qXif5kkQ=="
    }
};

var payload= "Yuk nonton Premiere League!";

var options={
    gcmAPIKey: '690465620045',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
).catch(function(err){
    console.log(err);
    });