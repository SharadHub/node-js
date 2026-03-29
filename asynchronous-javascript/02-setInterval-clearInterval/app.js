let intervalID = null; // id created

// setting interval of changing color
function startChange(){
    if(!intervalID){
        intervalID = setInterval(randomColorChange, 1000);
    }
}

// function that changes background color from black to white and vice versa same logic for text color too
/*
function colorChange(){
    if(document.body.style.backgroundColor !== 'black'){
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
    }
}
    */

function randomColorChange(){
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = `#${randomColor}`;
}

// function to stop interval
function stopChange(){
    clearInterval(intervalID);
    intervalID = null; // necessary to reset id after all work done
}

document.getElementById("start").addEventListener("click", startChange);//adding event listener in button
document.getElementById("stop").addEventListener("click", stopChange);