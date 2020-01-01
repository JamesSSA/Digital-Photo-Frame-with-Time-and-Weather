//Global Array
_global = {};
_global["images"] = "";
_global["changes"] = "";
_global["length"] = "";

/**
* Includes HTML from another page.
* @Note Copied from https://www.w3schools.com/howto/howto_html_include.asp
*/
// function includeHTML() {
//   let z, i, elmnt, file, xhttp;
//   /* Loop through a collection of all HTML elements: */
//   z = document.getElementsByTagName("*");
//   for (i = 0; i < z.length; i++) {
//     elmnt = z[i];
//     /*search for elements with a certain atrribute:*/
//     file = elmnt.getAttribute("w3-include-html");
//     if (file) {
//       /* Make an HTTP request using the attribute value as the file name: */
//       xhttp = new XMLHttpRequest();
//       xhttp.onreadystatechange = function() {
//         if (this.readyState == 4) {
//           if (this.status == 200) {elmnt.innerHTML = this.responseText;}
//           if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
//           /* Remove the attribute, and call this function once more: */
//           elmnt.removeAttribute("w3-include-html");
//           includeHTML();
//         }
//       }
//       xhttp.open("GET", file, true);
//       xhttp.send();
//       return;
//     }
//   }
// }

function loadDoc() {
  console.log("load");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 200 || this.status == 0)) {
      _global["images"] = JSON.parse(this.responseText);
      _global["changes"] = 0;
      _global["length"] = _global["images"].length;
      setInterval(rotate_photos, 20000);
    }
  };
  // xhttp.open("GET", "photos.py", true);
  xhttp.open("GET", "images.json", true);
  xhttp.send();
}

/**
* Updates the photo to the next one in the directory or start from the begining.
*/
function rotate_photos(){
  console.log("Rotating changes = " + _global["changes"]);
  if (_global["changes"] !== ""){
    console.log("Rotating: in if");
    let index = _global["changes"];
    console.log(index + " = index; changes = " + _global["changes"]);
    if (index >= _global["length"]) {
      _global["changes"] = 0;
      index = 0;
    }
    let next_img = _global["images"][index];
    document.getElementById("image").src = next_img;
    console.log("Next image = " + document.getElementById("image").src);
    ++_global["changes"];
  }
}

/**
* Sets the clock time.
*/
function setTime() {
  let secondsOn = false;
  let today = new Date();
  let hour = addLeadingZero(today.getHours());
  let minute = addLeadingZero(today.getMinutes());

  let time;
  if (secondsOn === true){
    let second = addLeadingZero(today.getSeconds());
    time = hour + ":" + minute + ":" + second;
  } else {
    time = hour + ":" + minute;
  }
  document.getElementById("time").innerHTML = time;
}

/**
* Sets the clock date.
*/
function setDate() {
  let today = new Date();
  let date = addLeadingZero(today.getDate());
  let day = today.getDay();
  let month = today.getMonth();

  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  day = days[day];
  month = months[month];

  let formattedDate = day + " - " + month + " " + date;
  document.getElementById("date").innerHTML = formattedDate;
}

/**
* Add zero to time element if it is below 10.
* @param time - number: time element to be formated.
*/
function addLeadingZero(time){
  if (time < 10){
    time = "0" + time;
  }
  return time;
}

//Onload
loadDoc();
setInterval(setTime, 1000);
setDate();
