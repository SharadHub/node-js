function getData(endpoint) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", endpoint);

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject("Something went wrong");
        }
      }
    };

    setTimeout(
      () => {
        xhr.send();
      },
      Math.floor(Math.random() * 3000) + 1000,
    );
  });
}

getData("../05-callback-hell/movies.json")
.then((movies) => {
  console.log(movies);
  return getData('../05-callback-hell/actor.json')
})
.then((actors) => {
    console.log(actors);
    return getData('../05-callback-hell/director.json');
})
.then((directors) => {
    console.log(directors);
})
.catch((error) => console.log(error));
