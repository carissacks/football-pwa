var base_url = "https://api.football-data.org/";
var header = {
    'X-Auth-Token': '062bf95c563b4affb2a02e41705a32a5'
}

function status(response) {
    if (response.status !== 200) {
        console.log("Error: " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getTeams() {
    if ("caches" in window) {
        caches.match(base_url + "v2/competitions/2021/teams").then(
            function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log("masuk ke getTeams dari cache " + data);
                        var teamsHTML = "";

                        data.result.forEach(function (teams) {
                            url = team.crestUrl.replace(/^http:\/\//i, 'https://');
                            teamsHTML += `
                            <div class="card col s12 m4 hoverable">
                                <a href="./teams.html?id=${team.id}">
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img class="center-align responsive-img" src="${url}" id="teamLogo" />
                                    </div>
                                </a>
                                <div class="card-content">
                                    <span class="card-title truncate">${team
                                        .name}</span>
                                    <p>${team.area.name}</p>
                                </div>
                            </div>
                            `;
                        });
                        document.getElementById("teams").innerHTML = teamsHTML;
                    });
                }
            }
        );
    }

    fetch(base_url + "v2/competitions/2021/teams", {
            headers: header
        })
        .then(status)
        .then(json)
        .then(function (data) {
            console.log("masuk ke getTeams dari url " + data);
            console.log(data);

            var teamsHTML = "";
            data.teams.forEach(function (team) {
                url = team.crestUrl.replace(/^http:\/\//i, 'https://');
                teamsHTML += `
                    <div class="card col s12 m4 hoverable">
                        <a href="./teams.html?id=${team.id}">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="center-align responsive-img" src="${url}" id="teamLogo" />
                            </div>
                        </a>
                        <div class="card-content">
                            <span class="card-title truncate">${team
                                .name}</span>
                            <p>${team.area.name}</p>
                        </div>
                    </div>
                    `;
            });
            console.log(document.getElementById("teams"));
            document.getElementById("teams").innerHTML = teamsHTML;
        }).catch(error);
}

function getTeamsById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idTeams = urlParams.get("id");

        if ("caches" in window) {
            caches.match(base_url + "v2/teams/" + idTeams).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        url = data.crestUrl.replace(/^http:\/\//i, 'https://');
                        var teamsHTML = `
                            <div class="card">
                                <div class="card-image waves-effect waves-block">
                                    <img src="${url}"/>
                                </div>
                                <div class="card-content">
                                    <span class="card-title">${data.name}</span>
                                    <p>${data.address}</p>
                                    <p>Since ${data.founded}</p>
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Role</th>
                                        <th>Nationality</th>
                                    </tr>
                                </thead>
                                <tbody>
                        `;
                        data.squad.forEach(function (player) {
                            teamsHTML += `
                            <tr>
                                <td>${player.name}</td>
                                <td>${player.position}</td>
                                <td>${player.role}</td>
                                <td>${player.nationality}</td>
                            </tr>
                            `;
                        });

                        teamsHTML += `
                            </tbody>
                        </table>
                        `;
                        document.getElementById("mainContent").innerHTML = teamsHTML;
                        resolve(data);
                    });
                }
            });
        }

        fetch(base_url + "v2/teams/" + idTeams, {
            headers: header
        })
            .then(status)
            .then(json)
            .then(function (data) {
                // Objek JavaScript dari response.json() masuk lewat variabel data.
                url = data.crestUrl.replace(/^http:\/\//i, 'https://');
                        var teamsHTML = `
                        <div class="row">
                            <div class="col s12 m6">
                                <img src="${url}" class="responsive-img"/>
                            </div>
                            <div class="col s12 m6">
                                <h4>${data.name}</h4>
                                <p>${data.address}</p>
                                <p>Since ${data.founded}</p>
                            </div>
                        </div>
                            <table class="highlight responsive-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Role</th>
                                        <th>Nationality</th>
                                    </tr>
                                </thead>
                                <tbody>
                        `;
                        data.squad.forEach(function (player) {
                            teamsHTML += `
                            <tr>
                                <td>${player.name}</td>
                                <td>${player.position}</td>
                                <td>${player.role}</td>
                                <td>${player.nationality}</td>
                            </tr>
                            `;
                        });

                        teamsHTML += `
                            </tbody>
                            <tfooter>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Role</th>
                                <th>Nationality</th>
                            </tr>
                        </tfooter>
                        </table>
                        `;
                // Sisipkan komponen card ke dalam elemen dengan id #content
                document.getElementById("mainContent").innerHTML = teamsHTML;
                resolve(data);
            });
    });
}
// url= "https://api.football-data.org/v2/teams/57";
