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
      Math.floor(Math.random() * 3000) + 1000);
  });
}

const moviesPromise = getData('../05-callback-hell/movies.json');
const actorsPromise = getData('../05-callback-hell/actor.json');
const directorsPromise = getData('../05-callback-hell/director.json');

const dummyPromise = new Promise((resolve, reject) => {
  resolve("Hello World");
})

Promise.all([moviesPromise, actorsPromise, directorsPromise])
.then((data) => {
    console.log(data);
})
.catch((error) => console.log(error));