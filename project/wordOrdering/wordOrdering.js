/**********************************************
* wordOrdering.js
* Josey Watznauer
*
* This file makes a WordList class,
* a list of words, and functions to reorder
* and display the list.
**********************************************/

class WordList {

  constructor(words) {
    this.words = words;
  }

  // Sorts the words array alphabetically
  alphabetical() {
    var list = this.words.slice(); // slice gets rid of whitespaces, per Google

    list.sort(function(a, b) { // sort method references bookClub.js
      if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
      }
      else if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
      }
      else {
        return 0;
      } // end if
    });

    return list;
  } // end alphabetical

  // Sorts the words array reverse alphabetically
  reverseAlphabetical() {
    var list = this.words.slice();

    list.sort(function(a, b) {
      if (a.toLowerCase() > b.toLowerCase()) {
        return -1;
      }
      else if (a.toLowerCase() < b.toLowerCase()) {
        return 1;
      }
      else {
        return 0;
      }
    });

    return list;
  } // end reverseAlphabetical

  // Sorts the words array randomly
  random() {
    var list = this.words.slice();
    var i;
    var j;
    var temp;

    for (i = list.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1)); // Random uses a decimal, floor rounds it

      // Reorders the words based on the random indices
      temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }

    return list;
  } // end random

} // end WordList class

//*********************************************

// Creates the array, performs input validation,
// calls the alphabetical method, prints the sorted words
function alphabetical(form) {
  var input;
  var words;
  var i;
  var wordList;
  var result;
  var stringWords = "";

  input = form.elements["wordList"].value;

  if (input.trim() === "") {
    document.getElementById("printedList").innerHTML =
      "The word list box is empty. You must enter words in it.";
    return;
  } // end if

  words = input.split(/\s+/); // creates the array

  // Verifies that it only contains letters
  for (i = 0; i < words.length; i++) {
    if (!/^[a-zA-Z]+$/.test(words[i])) {
      document.getElementById("printedList").innerHTML =
        "The input is invalid. You must enter valid words in the word list box.";
      return;
    } // end if
  }

  wordList = new WordList(words);
  result = wordList.alphabetical();
  
  // uses the method from the slides to print the array without commas
  for (let i=0; i<result.length; i++) { 
    stringWords += result[i] + " ";
  }

  document.getElementById("printedList").innerHTML = stringWords;
} // end alphabetical

//*********************************************

// Creates the array, performs input validation,
// calls the reverse alphabetical method, prints the sorted words
function reverseAlphabetical(form) {
  var input;
  var words;
  var i;
  var wordList;
  var result;
  var stringWords = "";

  input = form.elements["wordList"].value;

  if (input.trim() === "") { // Gets rid of whitespace, per ch.10
    document.getElementById("printedList").innerHTML =
      "The word list box is empty. You must enter words in it.";
    return;
  } // end if

  words = input.split(/\s+/); // creates the array

  for (i = 0; i < words.length; i++) {
    if (!/^[a-zA-Z]+$/.test(words[i])) {
      document.getElementById("printedList").innerHTML =
        "The input is invalid. You must enter valid words in the word list box.";
      return;
    } // end if
  }

  wordList = new WordList(words);
  result = wordList.reverseAlphabetical();

  for (let i=0; i<result.length; i++) {
      stringWords += result[i] + " ";
  }

  document.getElementById("printedList").innerHTML = stringWords;
} // end reverseAlphabetical

//*********************************************

// Creates the array, performs input validation,
// calls the random method, prints the shuffled words
function random(form) {
  var input;
  var words;
  var i;
  var wordList;
  var result;
  var stringWords = "";

  input = form.elements["wordList"].value;

  if (input.trim() === "") { 
    document.getElementById("printedList").innerHTML =
      "The word list box is empty. You must enter words in it.";
    return;
  } // end if

  words = input.split(/\s+/); // creates the array

  for (i = 0; i < words.length; i++) {
    if (!/^[a-zA-Z]+$/.test(words[i])) {
      document.getElementById("printedList").innerHTML =
        "The input is invalid. You must enter valid words in the word list box.";
      return;
    } // end if
  }

  wordList = new WordList(words);
  result = wordList.random();

  for (let i=0; i<result.length; i++) {
    stringWords += result[i] + " ";
  }

  document.getElementById("printedList").innerHTML = stringWords;
} // end random