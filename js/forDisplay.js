var forDisplay = function(data, elem) {
  var hostElem = document.getElementById(elem),
      template = `<h4>Pages: ${data.pages} - ${data.times}</h4><div class="flex">`;

  data.data.forEach(function(set) {
    template = template + `<div class="flex-item"><h5>Items: ${set.length}</h5>`;

    template = template + `<ul>`;
    set.forEach(function(elem) {
      template = template + `<li>${elem.title} <strong>${elem.cardFormat}</strong></li>`;
    });
    template = template + `</ul></div>`;
  });

  template = template + `</div>`;

  hostElem.innerHTML = template;
};
