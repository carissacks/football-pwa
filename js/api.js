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
                        var teamsHTML = '';
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
            // console.log(data);

            var teamsHTML = '';
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
                        <div class="row">
                            <div class="col s12 m6">
                                <img src="${url}" class="responsive-img" id="team_img"/>
                            </div>
                            <div class="col s12 m6">
                                <a href="${data.website}"><h4>${data.name}</h4></a>
                                <p>${data.address}</p>
                                <p>${data.venue}</p>
                                <p>Since ${data.founded}</p>
                        `;
                        if (data.phone != null)
                            teamsHTML += `
                                <p><a href="tel:${data.phone}"><i class="material-icons">call</i> ${data.phone}</a></p>
                                `;
                        if (data.email != null)
                            teamsHTML += `
                                <p><a href = "mailto: ${data.email}"><i class="material-icons">email</i> ${data.email}</a></p>
                                `;

                        teamsHTML += `
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <table class="highlight responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Nationality</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                        `;
                        data.squad.forEach(function (player) {
                            if (player.role === "PLAYER") {
                                teamsHTML += `
                                <tr>
                                    <td>${player.name}</td>
                                    <td>${player.position}</td>
                                    <td>${player.nationality}</td>
                                </tr>
                                `;
                            }
                        });

                        teamsHTML += `
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
                url = data.crestUrl.replace(/^http:\/\//i, 'https://');
                var teamsHTML = `
                        <div class="row">
                            <div class="col s12 m6">
                                <img src="${url}" class="responsive-img" id="team_img"/>
                            </div>
                            <div class="col s12 m6">
                                <a href="${data.website}"><h4>${data.name}</h4></a>
                                <p>${data.address}</p>
                                <p>${data.venue}</p>
                                <p>Since ${data.founded}</p>
                        `;
                if (data.phone != null)
                    teamsHTML += `
                                <p><a href="tel:${data.phone}"><i class="material-icons">call</i> ${data.phone}</a></p>
                                `;
                if (data.email != null)
                    teamsHTML += `
                                <p><a href = "mailto: ${data.email}"><i class="material-icons">email</i> ${data.email}</a></p>
                                `;

                teamsHTML += `
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <table class="highlight responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Nationality</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                        `;
                data.squad.forEach(function (player) {
                    if (player.role === "PLAYER") {
                        teamsHTML += `
                                <tr>
                                    <td>${player.name}</td>
                                    <td>${player.position}</td>
                                    <td>${player.nationality}</td>
                                </tr>
                                `;
                    }
                });

                teamsHTML += `
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        `;
                document.getElementById("mainContent").innerHTML = teamsHTML;
                resolve(data);
            });
    });
}

function getSavedTeams() {
    getAll().then(function (teams) {
        console.log("dari saved");
        var teamsHTML = "";
        if(teams.length!=0){
            teams.forEach(function (team) {
                url = team.crestUrl.replace(/^http:\/\//i, 'https://');
                teamsHTML += `
                    <div class="card col s12 m4 hoverable">
                        <a href="./teams.html?id=${team.id}&saved=true">
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
        }
        else{
            teamsHTML="<h2>List favorit masih kosong</h2>";
        }
        document.getElementById("teams").innerHTML = teamsHTML;
    });
}

function getSavedTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    getById(idParam).then(function (data) {
        url = data.crestUrl.replace(/^http:\/\//i, 'https://');
        var teamsHTML = `
            <div class="row">
                <div class="col s12 m6">
                    <img src="${url}" class="responsive-img" id="team_img"/>
                </div>
                <div class="col s12 m6">
                    <a href="${data.website}"><h4>${data.name}</h4></a>
                    <p>${data.address}</p>
                    <p>${data.venue}</p>
                    <p>Since ${data.founded}</p>
            `;
        if (data.phone != null)
            teamsHTML += `
                <p><a href="tel:${data.phone}"><i class="material-icons">call</i> ${data.phone}</a></p>
                `;
        if (data.email != null)
            teamsHTML += `
                <p><a href = "mailto: ${data.email}"><i class="material-icons">email</i> ${data.email}</a></p>
                `;

        teamsHTML += `
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <table class="highlight responsive-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Nationality</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
        data.squad.forEach(function (player) {
            if (player.role === "PLAYER") {
                teamsHTML += `
                            <tr>
                                <td>${player.name}</td>
                                <td>${player.position}</td>
                                <td>${player.nationality}</td>
                            </tr>
                            `;
            }
        });

        teamsHTML += `
                        </tbody>
                    </table>
                </div>
            </div>
            `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("mainContent").innerHTML = teamsHTML;
    })
}

function getLeague() {
    if ("caches" in window) {
        caches.match(base_url + "v2/competitions/2021").then(
            function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log("masuk ke getLeague dari cache " + data);
                        var startDate = new Date(data.currentSeason.startDate).toDateString();
                        var endDate = new Date(data.currentSeason.endDate).toDateString();
                        var homeHTML = `
                            <div class="row">
                                <h3>Current Season</h3>
                                <p>Start : ${startDate}</p>
                                <p>End : ${endDate}</p>
                            </div>
                        `;
                        document.getElementById("home").innerHTML = homeHTML;
                    });
                }
            }
        );
    }

    fetch(base_url + "v2/competitions/2021", {
            headers: header
        })
        .then(status)
        .then(json)
        .then(function (data) {
            console.log("masuk ke getLeague dari url " + data);
            var startDate = new Date(data.currentSeason.startDate).toDateString();
            var endDate = new Date(data.currentSeason.endDate).toDateString();
            var homeHTML = `
                <div class="row">
                    <h3>Current Season</h3>
                    <p>Start : ${startDate}</p>
                    <p>End : ${endDate}</p>
                </div>
            `;
            document.getElementById("home").innerHTML = homeHTML;
        }).catch(error);
}

function getSchedules() {
    var date = new Date();
    // var startDate = date.setDate(date.getDate() - 7);
    startDate = date.toISOString().substring(0, 10);
    var endDate = date.setDate(date.getDate() + 7);
    endDate = date.toISOString().substring(0, 10);

    if ("caches" in window) {
        caches.match(base_url + "v2/competitions/2021/matches?dateTo=" + endDate + "&dateFrom=" + startDate).then(
            function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log("masuk ke getSchedule dari cache " + data);
                        if (data.matches.length != 0) {
                            var scheduleHTML = `
                            <div class="row">
                                <h3>Schedules</h3>
                                <p>For the next 7 days</p>
                                <table class="highlight responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Home</th>
                                            <th>Away</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                            `;
                            data.matches.forEach(function (match) {
                                var date = new Date(match.utcDate).toDateString();
                                scheduleHTML += `
                                <tr>
                                    <td>${date}</td>
                                    <td><a href="./teams.html?id=${match.homeTeam.id}">${match.homeTeam.name}</a></td>
                                    <td><a href="./teams.html?id=${match.awayTeam.id}">${match.awayTeam.name}</a></td>
                                </tr>
                                `;
                            });

                            scheduleHTML += `
                                </tbody>
                            </table>
                        </div>`;
                            document.getElementById("schedules").innerHTML = scheduleHTML;
                        }
                    });
                }
            }
        );
    }

    fetch(base_url + "v2/competitions/2021/matches?dateTo=" + endDate + "&dateFrom=" + startDate, {
            headers: header
        })
        .then(status)
        .then(json)
        .then(function (data) {
            console.log("masuk ke getSchedule dari url " + data);

            if (data.matches.length != 0) {
                var scheduleHTML = `
                <div class="row">
                    <h3>Schedules</h3>
                    <p>For the next 7 days</p>
                    <table class="highlight responsive-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Home</th>
                                <th>Away</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                data.matches.forEach(function (match) {
                    var date = new Date(match.utcDate).toDateString();
                    scheduleHTML += `
                    <tr>
                        <td>${date}</td>
                        <td><a href="./teams.html?id=${match.homeTeam.id}">${match.homeTeam.name}</a></td>
                        <td><a href="./teams.html?id=${match.awayTeam.id}">${match.awayTeam.name}</a></td>
                    </tr>
                    `;
                });

                scheduleHTML += `
                    </tbody>
                </table>
            </div>`;
                document.getElementById("schedules").innerHTML = scheduleHTML;
            }
        }).catch(error);
}

function getStandings() {
    if ("caches" in window) {
        caches.match(base_url + "v2/competitions/2021/standings?standingType=TOTAL").then(
            function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log("masuk ke getStanding dari cache " + data);
                        var standingHTML = `
                                <div class="row">
                                    <h3>Standings</h3>
                                    <table class="highlight responsive-table">
                                        <thead>
                                            <tr>
                                                <th>#Rank</th>
                                                <th>Teams</th>
                                                <th>MP</th>
                                                <th>W</th>
                                                <th>D</th>
                                                <th>L</th>
                                                <th>GF</th>
                                                <th>GA</th>
                                                <th>GD</th>
                                                <th>Pts</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                `;
                        data.standings[0].table.forEach(function (position) {
                            url = position.team.crestUrl.replace(/^http:\/\//i, 'https://');

                            standingHTML += `
                                            <tr>
                                            <td>${position.position}</td>
                                            <td class="row">
                                                <div class="col s1 hide-on-small-only">
                                                    <img src="${url}" class="responsive-img" id="positionLogo"/>
                                                </div>
                                                <a href="./teams.html?id=${position.team.id}">${position.team.name}</a>
                                            </td>
                                            <td>${position.playedGames}</td>
                                            <td>${position.won}</td>
                                            <td>${position.draw}</td>
                                            <td>${position.lost}</td>
                                            <td>${position.goalsFor}</td>
                                            <td>${position.goalsAgainst}</td>
                                            <td>${position.goalDifference}</td>
                                            <td>${position.points}</td>
                                            </tr>
                                            `;
                        });

                        standingHTML += `
                                        </tbody>
                                    </table>
                                </div>`;
                        document.getElementById("standings").innerHTML = standingHTML;

                    });
                }
            }
        )
    };

    fetch(base_url + "v2/competitions/2021/standings?standingType=TOTAL", {
            headers: header
        })
        .then(status)
        .then(json)
        .then(function (data) {
            console.log("masuk ke getStanding dari url " + data);
            var standingHTML = `
                <div class="row">
                    <h3>Standings</h3>
                    <table class="highlight responsive-table">
                        <thead>
                            <tr>
                                <th>#Rank</th>
                                <th>Teams</th>
                                <th>MP</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>GF</th>
                                <th>GA</th>
                                <th>GD</th>
                                <th>Pts</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            data.standings[0].table.forEach(function (position) {
                url = position.team.crestUrl.replace(/^http:\/\//i, 'https://');

                standingHTML += `
                            <tr>
                            <td>${position.position}</td>
                            <td class="row">
                                <div class="col s1 hide-on-small-only">
                                    <img src="${url}" class="responsive-img" id="positionLogo"/>
                                </div>
                                <a href="./teams.html?id=${position.team.id}">${position.team.name}</a>
                            </td>
                            <td>${position.playedGames}</td>
                            <td>${position.won}</td>
                            <td>${position.draw}</td>
                            <td>${position.lost}</td>
                            <td>${position.goalsFor}</td>
                            <td>${position.goalsAgainst}</td>
                            <td>${position.goalDifference}</td>
                            <td>${position.points}</td>
                            </tr>
                `;
            });

            standingHTML += `
                        </tbody>
                    </table>
                </div>`;
            document.getElementById("standings").innerHTML = standingHTML;
        }).catch(error);
}

function getMatches() {

}

function deleteTeam(){
    var urlParams = new URLSearchParams(window.location.search);
    var idTeams = urlParams.get("id");
    deleteFromFav(idTeams);
}