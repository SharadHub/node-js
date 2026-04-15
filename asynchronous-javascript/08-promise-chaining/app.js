const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    let error = true;

    if (!error) {
      resolve({ name: "Bishal", age: 23 });
    } else {
      reject("error: Something went wrong");
    }
  }, 1000);
});

promise
  .then((user) => {
    console.log(user);
    return user.name;
  })
  .then((user) => {
    console.log(name);
    return name.length;
  })
  .then((namelength) => {
    console.log(namelength);
  })
  .catch((error) => {
    console.error(error);
    return 123
  })
  .then((abcd) => console.log("this will run anyhow", abcd));
