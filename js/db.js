var dbPromised = idb.open("premiere-teams", 1, function (upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", {
        unique: false
    });
});

function saveForLater(team) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            console.log(team);
            store.add(team);
            return tx.complete;
        })
        .then(function () {
            console.log("Team ditambahkan ke favorit.");
            alert("Team ditambahkan ke list favorit");
        });
}

function deleteFromFav(id){
    dbPromised
        .then(function(db){
            var team_id= parseInt(id);
            var tx= db.transaction('teams', 'readwrite');
            var store= tx.objectStore('teams');
            store.delete(team_id);
            return tx.complete;
        })
        .then(function(){
            console.log("Team dihapus dari favorit");
            alert("Team dihapus dari list favorit");
        })
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                console.log(store.getAll());
                return store.getAll();
            })
            .then(function (team) {
                resolve(team);
            });
    });
}

function getById(id){
    return new Promise(function(resolve,reject){
        dbPromised
            .then(function(db){
                var team_id= parseInt(id);
                var tx= db.transaction("teams", "readonly");
                var store= tx.objectStore("teams");
                console.log(store.get(team_id));
                console.log("ini id"+id);
                return store.get(team_id);
            })
            .then(function(team){
                console.log(team);
                resolve(team);
            });
    });
}