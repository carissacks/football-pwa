self.addEventListener('push', function(event){
    var body;
    if(event.data){
        body= event.data.text();
    }else{
        body="Push message no payload";
    }

    var options= {
        body: body,
        icon: 'icon.png',
        vibrate:[100,50,100],
        data:{
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push notification', options)
    );
});

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.0/workbox-sw.js');
const base_url= "https://api.football-data.org/";

if(workbox)
    console.log("workbox berhasil dimuat");
else
    console.log("workbox gagal dibuat");

workbox.precaching.precacheAndRoute([
    {url: '/', revision: '1'},
    {url: '/index.html', revision: '1'},
    {url: '/teams.html', revision: '1'},
    {url: '/nav.html', revision: '1'},
    {url: '/manifest.json', revision: '1'},
    // {url: '/teams.html', revision: '1'},
    {url: '/css/materialize.min.css', revision: '1'},
    {url: '/css/style.css', revision: '1'},
    {url: '/js/materialize.min.js', revision: '1'},
    {url: '/js/db.js', revision: '1'},
    {url: '/js/idb.js', revision: '1'},
    {url: '/js/nav.js', revision: '1'},
    {url: '/js/script.js', revision: '1'},
    {url: '/assets/bg.svg', revision: '1'},
    {url: '/assets/PremiereLeagueLogo.png', revision: '1'}
], {
    ignoreURLParametersMatching: [/.*/]
});



workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    /\.(?:png)$/,
    workbox.strategies.staleWhileRevalidate({
        cacheName:'icons'
    }),
);

workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/"),
    workbox.strategies.staleWhileRevalidate({
        plugins:[
            new workbox.cacheableResponse.Plugin({
                statuses: [200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 90,
                maxEntries: 20,
            }),
        ],
        cacheName:'requestAPI'
    }),
);