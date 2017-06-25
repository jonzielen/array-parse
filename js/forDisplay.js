var forDisplay = function(data, elem) {
  var hostElem = document.getElementById(elem),
      template = `<h4>Pages: ${data.pages}</h4>`;

  data.data.forEach(function(set) {
    template = template + `<h5>Items: ${set.length}</h5>`;

    template = template + `<ul>`;
    set.forEach(function(elem) {
      template = template + `<li>${elem.title}  ${elem.cardFormat}</li>`;
    });
    template = template + `</ul>`;
  });

  hostElem.innerHTML = template;
  console.log(data, hostElem);
};
