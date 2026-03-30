const xhr = new XMLHttpRequest();

// xhr.open('GET', './movies.json');
xhr.open('GET', 'https://api.github.com/users/sharadhub/repos');
// xhr.open('GET', 'https://v2.jokeapi.dev/joke/Any');

// readyState has 5 possible values
// - 0: request not initialized
// - 1: server connection established
// - 2: request received
// - 3: processing request
// - 4: request finished and response is ready

xhr.onreadystatechange = function () {
    if(this.readyState === 4 && this.status ===200){
        const data = JSON.parse(this.responseText);

        // const jokesArray = data.jokes || [data];

// for fetching movie json replace repo by movie and uncomment the URL at the top

        data.forEach((repo) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${repo.name}</strong> - ${repo.description}`;
            document.querySelector('#results').appendChild(li);
        });
    }
};

xhr.send();