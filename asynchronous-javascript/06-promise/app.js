const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async Task Completed");
        resolve();
    }, 3000);
});

// promise.then(() => {
//     console.log("Promise running");
    
// });

const getUser = new Promise((resolve, reject) => {
    setTimeout(() => {
        let error = false;

        if(!error){
            resolve({ name: "Bishal",age: 23 });
        } else {
            reject("error: Something went wrong");
        }
    }, 1000);
});
getUser
.then((user) => console.log(user))
.catch((error) => console.error(error))
.finally(() => console.log("The promise has been resolved or rejected"));

console.log("Hello from the outside");