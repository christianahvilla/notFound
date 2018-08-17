(function() {
    'use strict';
    var app = {
        users: [],
        names: ['misael93','JoseATP', 'baltaITIC','adjaf','lgruelas','daniboygs','christianahvilla','Diego2218'],
        container: document.querySelector('.cards'),
        articleTemplate: document.querySelector('.friend'),
    };


    app.displayFriens = function() {
        // remove current news
        app.container.innerText = "";
        console.log('Aqui');
        app.users.forEach(function(item) {
            var article = app.articleTemplate.cloneNode(true);
            console.log('Aqui2');
            article.querySelector('.avatar').src = item.avatar_url || '';
            article.querySelector('.name').textContent = item.name;
            article.querySelector('.bio').textContent = item.bio;
            article.removeAttribute('hidden');
            app.container.appendChild(article);
        });

        document.body.classList.remove("loading");
    }

    app.loadFriends = function() {
        document.body.classList.add("loading");
        app.users = [];
        console.log('Antes');
        console.log(app.users);
        for(var j=0; j< app.names.length; j++){
          var url = 'https://api.github.com/users/'+app.names[j];

          if ('caches' in window) {
              caches.match(url).then(function(response) {
                  if (response) {
                      response.json().then(function updateFromCache(json) {
                          app.users.push(json);
                      });
                  }
              });
          }
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                  app.users.push(JSON.parse(this.response));
              }
          };
          xhttp.open("GET", url, true);
          xhttp.send();
        };
        console.log('Despues');
        console.log(app.users);
        app.displayFriens();
    }

    app.init = function() {
        app.loadFriends();
    }

    document.getElementById('reload-git-btn').addEventListener('click', function() {
        app.loadFriends();
    })
    // start app
    app.init();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function(registration) {
                console.log('Service Worker Registered', registration.scope);
            });
    }

})();
