//Global Array
_global = {};

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
      console.log("Ready ");
      console.log(this.responseText);
      _global["images"] = JSON.parse(this.responseText);
      _global["changes"] = 0;
      _global["length"] = _global["images"].length;
      console.log("images = " + _global["images"][0]);
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
  // console.log(_global["changes"]);
  if (_global["changes"]){
    let index = _global["changes"];
    if (index >= _global["length"]) {
      _global["changes"] = 0;
    }
    let next_img = _global["images"][index];
    console.log("/digitalFrame/photos/" + next_img);
    document.getElementById("image").src = "/digitalFrame/photos/" + next_img; // TODO: Update so path can be changed at any point once.
    console.log("Next image = " + document.getElementById("image").src);
    ++_global["changes"];
  }
  setInterval(rotate_photos, 3000);
}

/**
* Sets the clock time.
*/
function setTime() {
  let today = new Date();
  let hour = addLeadingZero(today.getHours());
  let minute = addLeadingZero(today.getMinutes());
  // let second = addLeadingZero(today.getSeconds());

  // let time = hour + ":" + minute + ":" + second;
  let time = hour + ":" + minute;
  document.getElementById("time").innerHTML = time;
  setInterval(setTime, 1000);
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
setTime();
setDate();
rotate_photos();
