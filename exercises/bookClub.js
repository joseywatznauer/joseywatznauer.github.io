/**********************************************
* bookClub.js
* Josey Watznauer
*
* This file implements a BookMeeting class, a list of
* BookMeeting objects, and a function which adds
* BookMeeting objects to the list.
**********************************************/

class BookMeeting {
  #author;   // book author
  #title;    // book title
  #date;     // book club meeting date

  constructor(author, title, date) {
    this.#author = author;
    this.#title = title;
    this.#date = date;
  } // end constructor

  //*************************************************

  getDate() {
    return this.#date;
  } // end getDate

  //*************************************************

  // Return information for one book meeting row in meeting schedule.

  bookMtgEntry() {
    return "<span>" + this.#date.toDateString() + ":</span>" +
      "<span>" + this.#author + ", <cite>" + this.#title + "</cite></span>";
  } // end bookMtgEntry
} // end class BookMeeting

//*********************************************

var bookMtgList = new Array();

// Add a book club meeting to the list.

function addMtg(form) {
  var author;  // book author
  var title;   // book title
  var date;    // book club meeting date

  if (!form.checkValidity()) {
    document.getElementById("error").style.display = "block";
  }
  else {
    document.getElementById("error").style.display = "none";
    document.getElementById("mtgHeader").style.display = "block";
    author = form.elements["author"].value;
    title = form.elements["title"].value;
    date = new Date(`${form.elements["date"].value}T00:00`);

    bookMtgList.push(new BookMeeting(author, title, date));
    bookMtgList.sort(
      function (a, b) {
        if (a.getDate() < b.getDate()) {
          return -1;
        }
        else if (a.getDate() > b.getDate()) {
          return 1;
        }
        else {
          return 0;
        }
      });
    displayList();
  } // end else
} // end addMtg

//*********************************************

// Display the list of book club meetings.

function displayList() {
  var listContent = ""; // The contents of the list of book meetings

  for (let i = 0; i < bookMtgList.length; i++) {
    listContent += "<span>" +
      bookMtgList[i].getDate().toDateString() +
      ":</span>";

    listContent += "<span>" +
      bookMtgList[i].bookMtgEntry().split("</span>")[1] +
      " <button onclick='deleteMtg(" + i + ")'>Delete</button>" +
      "</span>";
  }

  document.getElementById("list").innerHTML = listContent;
} // end displayList

//*********************************************

// Delete the meeting from the array

function deleteMtg(index) {
  bookMtgList.splice(index, 1); // remove the selected meeting
  displayList(); // refresh the displayed list
} // end deleteMtg
