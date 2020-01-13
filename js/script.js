
// REGISTER SERVICE WORKER
if(!('serviceWorker' in navigator)){
    console.log("Service worker tidak didukung browser ini.");
}else{
    registerServiceWorker();
    requestPermission();
}

function registerServiceWorker(){
    return navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration){
        console.log("registrasi service worker berhasil");
        return registration;
    })
    .catch(function(err){
        console.error('Registrasi gagal.'. err);
    });
}

function requestPermission(){
    if('Notification' in window){
        Notification.requestPermission().then(function(result){
            if(result === "denied"){
                console.log("Notifikasi tidak diijinkan");
                return;
            }else if(result==="default"){
                console.error("Pengguna tidak menjawab");
                return;
            }

            if(('PushManager' in window)){
                navigator.serviceWorker.getRegistration().then(function(registration){
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BAmo3DBm20dJE1OijcFM580e7DSENmQYcm-fysH0U6k2VqhNWAmWBjKVbzNO4BniLJJDSyySbdyQG86Td_02eOM")
                    }).then(function(subscribe){
                        console.log("Berhasil melakukan subs dengan endpoint: ", subscribe.endpoint);
                        console.log("Berhasil melakukan subs dengan p256dh key: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log("Berhasil melakukan subs dengan auth key: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function(e){
                        console.error('tidak dapat menjalankan subs ', e.message
                        );
                    });
                });
            }
        });
    }
}

function urlBase64ToUint8Array(base64String){
    const padding= '='.repeat((4-base64String.length % 4) %4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData= window.atob(base64);
    const outputArray= new Uint8Array(rawData.length);
    for(let i=0; i<rawData.length; i++){
        outputArray[i]= rawData.charCodeAt(i);
    }
    return outputArray;
}