function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem('scores')) || [];

    highscores.sort(function (a, b) {
        return b.score - a.score;
    })

    for (var i = 0; i < highscores.length; i += 1) {
        var liTag = document.createElement('li');
        liTag.textContent = highscores[i].score + ' ' + highscores[i].initials;

        var olEl = document.getElementById('highscores')
        olEl.appendChild(liTag);
    }
}


function clearHighscores() {
    window.localStorage.removeItem('scores');
    window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

printHighscores();
