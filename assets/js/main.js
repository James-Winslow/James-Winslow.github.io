document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll("header nav a");
  const content = document.getElementById("content");

  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      fetch(link.href)
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");
          const newContent = doc.getElementById("content").innerHTML;
          content.innerHTML = newContent;
          history.pushState(null, "", link.href);
        });
    });
  });

  window.onpopstate = function() {
    fetch(location.href)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const newContent = doc.getElementById("content").innerHTML;
        content.innerHTML = newContent;
      });
  };
});