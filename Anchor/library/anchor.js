function createHeaderFooter() {

  /* =========================
     NAVIGATION
  ========================= */
  var nav = document.createElement("nav");

  var logo = document.createElement("img");
  logo.src = "../images/headerlogo.png";
  logo.alt = "logo";

  var ul = document.createElement("ul");

  var links = [
    ["counseling.html", "Counseling"],
    ["wildernessRetreats.html", "Wilderness Retreats"],
    ["about.html", "About"],
    ["contact.html", "Contact"]
  ];

  links.forEach(([href, text]) => {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    li.appendChild(a);
    ul.appendChild(li);
  });

  var logoLink = document.createElement("a");
  logoLink.href = "home.html"; // or "../home.html" depending on folder structure

  var logo = document.createElement("img");
  logo.src = "../images/headerlogo.png";
  logo.alt = "logo";

  logoLink.appendChild(logo);
  nav.appendChild(logoLink);
  nav.appendChild(ul);

  document.body.insertBefore(nav, document.body.firstChild);

  /* =========================
     FOOTER
  ========================= */
  var footer = document.createElement("footer");

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

  var office = document.createElement("div");
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

  footer.appendChild(fLogo);
  footer.appendChild(map);
  footer.appendChild(office);
  footer.appendChild(contact);

  document.body.appendChild(footer);
}