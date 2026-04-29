/**************************************************************************
* anchor.js
* Josey Watznauer
*
* This file contains functions to create the navigation bar and footer,
* to initiate the email-sending service, and to send the email
**************************************************************************/

// This function generates the navigation bar and footer for each page

function createNavFooter() {

  // Creating the nativation bar

  var nav = document.createElement("nav");

  var logo = document.createElement("img");
  logo.src = "../images/headerlogo.png";
  logo.alt = "logo";

  var ul = document.createElement("ul");

  // Array of the text and links for the navigation bar
  var links = [
    ["counseling.html", "Counseling"],
    ["wildernessRetreats.html", "Wilderness Retreats"],
    ["about.html", "About"],
    ["contact.html", "Contact"]
  ];

  // forEach loop to condencse the big chunk of code we saw in the case study
  links.forEach(([href, text]) => {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    li.appendChild(a);
    ul.appendChild(li);
  }); // end loop

  var logoLink = document.createElement("a");
  logoLink.href = "home.html"; 

  var logo = document.createElement("img");
  logo.src = "../images/headerlogo.png";
  logo.alt = "logo";

  logoLink.appendChild(logo);
  nav.appendChild(logoLink);
  nav.appendChild(ul);

  document.body.insertBefore(nav, document.body.firstChild); // inserts nav before anything else in the body

  // Creating the footer

  var footer = document.createElement("footer");

  var fLogoLink = document.createElement("a");
  fLogoLink.href = "home.html"; 

  var fLogo = document.createElement("img");
  fLogo.src = "../images/footerlogo.png";
  fLogo.alt = "footer logo";

  var map = document.createElement("div");
  map.className = "map";
  map.innerHTML = `
    <iframe
      width="100%"
      height="150"
      style="border:0;"
      loading="lazy"
      src="https://www.google.com/maps?q=39.693115,-91.476062&output=embed">
    </iframe>
  `;

  var office = document.createElement("div"); // uses strong (requirement)
  office.className = "office";
  office.innerHTML = `
    <strong>Office</strong><br> 
    7918 Hwy MM<br>
    Hannibal, MO 63401
  `;

  var contact = document.createElement("div");
  contact.className = "contact";
  contact.innerHTML = `
    <strong>Contact</strong><br>
    (660) 349-7395<br>
    stevenvoss@gmail.com
  `;

  fLogoLink.appendChild(fLogo);
  footer.appendChild(fLogoLink);
  footer.appendChild(map);
  footer.appendChild(office);
  footer.appendChild(contact);

  document.body.appendChild(footer); // creates footer
} // end createNavFooter

// This function intiates EmailJS

(function(){
  emailjs.init("GUFOzohK_HJYzAa5Q");
})(); // end function

// This function sends the email with the information from the form

function sendForm() {

  // Collect inputs into array
  var fields = ["first", "last", "email", "phone", "subject", "message"];
  var data = {};
  var valid = true;

  // Loop for validation
  for (var i = 0; i < fields.length; i++) {
    var value = document.getElementById(fields[i]).value.trim();

    if (value === "") {
      alert("Please fill out the " + fields[i] + " field.");
      valid = false;
      break;
    }

    data[fields[i]] = value;
  } // end loop

  if (!valid) return;

  // Email validation
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email)) {
    alert("Please enter a valid email.");
    return;
  } // end if

  // Send via EmailJS
  emailjs.send("anchorcounseling", "anchorcounselingtemplate", {
    first_name: data.first,
    last_name: data.last,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message
  })
  .then(function(response) {

    // Replace form with success message; DOM manipulation
    var formContainer = document.querySelector(".form form");

    formContainer.innerHTML = `
      <div style="
        background-color:#d5ad37;
        padding:60px;
        text-align:center;
        font-size:1.5em;
        color:#281e00;
      ">
        Your message was sent successfully.<br>
        We will be in contact with you shortly.
      </div>
    `;

  }, function(error) {
    alert("Something went wrong. Please try again.");
  });
} // end sendForm
