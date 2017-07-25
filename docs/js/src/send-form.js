'use strict';

(function() {
  if(!('FormData' in window)) {
    return;
  };

  var form = document.querySelector('.review-form');
  var uploadBtn = form.querySelector('#review-img-upload');
  var area = document.querySelector('#review-gallery');
  var template = document.querySelector('#image-template').innerHTML;
  var pictures = [];
  var numberElements = document.querySelectorAll('.review-form-quantity');
  console.log(numberElements);

  for(var i = 0; i < numberElements.length; i++) {
    initNumberField(numberElements[i])
  };

  function initNumberField(parent) {
    var parent = numberElements[i];
    var input = parent.querySelector('input');
    var minus = parent.querySelector('.review-form-button__minus');
    var plus = parent.querySelector('.review-form-button__plus');

    minus.addEventListener('click', function(event) {
      event.preventDefault();
      changeNumber(false);
    });

    plus.addEventListener('click', function() {
      event.preventDefault();
      changeNumber(true);
    });

    function changeNumber(operation) {
      var value = Number(input.value);

      if(isNaN(value)) {
        value = 0;
      }

      if(operation) {
        input.value = value + 1;
      } else {
        input.value = value - 1;
      }

      if(input.value < 0) {
        input.value = 0;
      }
    };
  };

  function preview(file) {
    if(file.type.match(/image.*/)) {
      var reader = new FileReader();

      reader.addEventListener('load', function(event) {
        // var html = template.replace('{{image}}', event.target.result);
        // html.replace('{{name}}', file.name);
        // area.innerHTML += html;
        var html = Mustache.render(template, {
          'image': event.target.result,
          'name': file.name
        });
        var li = document.createElement('li');
        li.classList.add('review-gallery__item');
        li.innerHTML += html;

        area.appendChild(li);

        var deleteBtn = li.querySelector('.review-gallery__delete-btn');
        // console.log(deleteBtn);
        deleteBtn.addEventListener('click', function(event) {
          event.preventDefault();
          removePreview(li);
        });

        pictures.push({
          'file': file,
          'li': li
        });
        // console.log(pictures);
      });

      reader.readAsDataURL(file);
    };
  };

  function removePreview(li) {
    pictures = pictures.filter(function(element) {
      return element.li != li;
    });

    li.parentNode.removeChild(li);
    // console.log(pictures);
  };

  uploadBtn.addEventListener('change', function() {
    var files = this.files;

    for(var i = 0; i < files.length; i++) {
      preview(files[i]);
    }
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var data = new FormData(form);

    // // Adding pics
    pictures.forEach(function(element) {
      data.append('images', element.file);
    });

    var xhr = new XMLHttpRequest();

    xhr.open('post', 'https://echo.htmlacademy.ru/');
    xhr.addEventListener('readystatechange', function() {
      if(xhr.readyState == 4) {
        console.log(xhr.responseText);
      }
    });

    xhr.send(data);
  });

})();
