document.getElementById("clickMe").onclick = function () { 

    const request = new XMLHttpRequest();
    request.addEventListener("load", reqListener);
    request.addEventListener("error", transferFailed);
    request.open("GET", "http://localhost:3000/api");
    request.send();                                        
};

const reqListener = (event) => {
    let quote = JSON.parse(event.target.response).quote;
    document.getElementById("quote").innerHTML = `"quote":  "${quote}"`;
    document.getElementById("tweet").href=`https://twitter.com/intent/tweet?text=${`"${quote}"`+" -Dr.Seuss"}`
}

const transferFailed = (err) => {
    document.getElementById("quote").innerHTML = 
        `“And will you succeed? Yes you will indeed! (98 and 3/4 percent guaranteed.)" ~ Dr.Seuss,
        unfortunately we've encountered an error please try again later`
}

