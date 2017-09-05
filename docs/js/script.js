
'use strict';

(function() {
  var buttonMenu = document.querySelector('#button-menu');
  var menuList = document.querySelector('#menu-list');

  function toggleMenu() {
    if(!menuList.classList.contains('open-menu')) {
      menuList.classList.add('open-menu');
      this.classList.add('icon-close');
    } else {
      menuList.classList.remove('open-menu');
      this.classList.remove('icon-close');
    }
  };

  buttonMenu.addEventListener('click', toggleMenu);
})();

'use strict';

(function() {
  if(!('FormData' in window) || !('FileReader' in window)) {
    return;
  };

  var form = document.querySelector('#form');
  var uploadBtn = form.querySelector('#review-img-upload');
  var picturesArea = document.querySelector('#review-gallery');
  var travelersArea = document.querySelector('#review-travelers');
  var picturesTemplate = document.querySelector('#image-template').innerHTML;
  var travelersTemplate = document.querySelector('#traveler-template').innerHTML;
  var pictures = [];
  // var travelers = [];
  var datesTravel = document.querySelectorAll('.js-dates-travel');
  var numberTravelers = document.querySelectorAll('.js-travelers');
  var start = $('#date-arrival');
  var end = $('#date-departure');
  // console.log(travelersArea);

  start.datepicker({
    closeText: 'Закрыть',
  	prevText: '&#x3C;Предыдущий',
  	nextText: 'Следующий&#x3E;',
  	currentText: 'Сегодня',
  	monthNames: [ 'Январь','Февраль','Март','Апрель','Май','Июнь',
  	'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь' ],
  	monthNamesShort: [ 'января','февраля','марта','апреля','мая','июня',
  	'июля','августа','сентября','октября','ноября','декабря' ],
  	dayNames: [ 'воскресенье','понедельник','вторник','среда','четверг','пятница','суббота' ],
  	dayNamesShort: [ 'вск','пнд','втр','срд','чтв','птн','сбт' ],
  	dayNamesMin: [ 'Вс','Пн','Вт','Ср','Чт','Пт','Сб' ],
  	weekHeader: 'Нед',
  	dateFormat: 'd M yy',
  	firstDay: 1,
  	isRTL: false,
  	showMonthAfterYear: false,
  	yearSuffix: '',
    minDate: -365,
    maxDate: -2,
    onSelect: function() {
      var startDate = start.datepicker('getDate');
      var endDate = end.datepicker('getDate');
      var parsedDate = new Date(Date.parse(startDate));
      parsedDate.setDate(parsedDate.getDate() + 1);
      var newDate = parsedDate.toDateString();
      newDate = new Date(Date.parse(newDate));
      end.datepicker('option', {minDate: newDate});
      var duration = document.querySelector('#duration');
      if(endDate === null) {
        duration.value = 1;
        end.datepicker('setDate', newDate);
        start.datepicker('option', {maxDate: startDate});
        return;
      }
      duration.value = daysBetween(startDate, endDate);
      // console.log('startDate on START', startDate, 'endDate on START', endDate);
    }
  });

  end.datepicker({
    closeText: 'Закрыть',
  	prevText: '&#x3C;Предыдущий',
  	nextText: 'Следующий&#x3E;',
  	currentText: 'Сегодня',
  	monthNames: [ 'Январь','Февраль','Март','Апрель','Май','Июнь',
  	'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь' ],
  	monthNamesShort: [ 'января','февраля','марта','апреля','мая','июня',
  	'июля','августа','сентября','октября','ноября','декабря' ],
  	dayNames: [ 'воскресенье','понедельник','вторник','среда','четверг','пятница','суббота' ],
  	dayNamesShort: [ 'вск','пнд','втр','срд','чтв','птн','сбт' ],
  	dayNamesMin: [ 'Вс','Пн','Вт','Ср','Чт','Пт','Сб' ],
  	weekHeader: 'Нед',
  	dateFormat: 'd M yy',
  	firstDay: 1,
  	isRTL: false,
  	showMonthAfterYear: false,
  	yearSuffix: '',
    maxDate: -1,
    onSelect: function() {
      var startDate = start.datepicker('getDate');
      var endDate = end.datepicker('getDate');
      var parsedDate = new Date(Date.parse(endDate));
      parsedDate.setDate(parsedDate.getDate() - 1);
      var newDate = parsedDate.toDateString();
      newDate = new Date(Date.parse(newDate));
      start.datepicker('option', {maxDate: newDate});

      var duration = document.querySelector('#duration');
      if(startDate === null) {
        duration.value = 1;
        start.datepicker('setDate', newDate);
        end.datepicker('option', {minDate: newDate});
        return;
      }
      duration.value = daysBetween(startDate, endDate);
      // console.log('startDate on END', startDate, 'endDate on END', endDate);
    }
  });

  for(var i = 0; i < datesTravel.length; i++) {
    initDatesTravelField(datesTravel[i]);
    initTravelersField(numberTravelers[i]);
  };

  function initDatesTravelField(parent) {
    var parent = datesTravel[i];
    var input = parent.querySelector('#duration');
    var minus = parent.querySelector('#dates-travel-minus');
    var plus = parent.querySelector('#dates-travel-plus');

    minus.addEventListener('click', function(event) {
      event.preventDefault();
      changeNumber(false);
    });

    plus.addEventListener('click', function(event) {
      event.preventDefault();
      changeNumber(true);
    });

    function changeNumber(operation) {
      var value = Number(input.value);
      var startDate = start.datepicker('getDate');
      var endDate = end.datepicker('getDate');

      function startDateReturn() {
        console.log(startDate);
        return startDate;
      };

      if(isNaN(value)) {
        value = 0;
      }

      if(operation) {
        input.value = value + 1;
        // console.log(startDate, 'startDate changeNumber true');

        var parsedDate = new Date(Date.parse(startDate));
        parsedDate.setDate(parsedDate.getDate() + Number(input.value));
        var newDate = parsedDate.toDateString();
        newDate = new Date(Date.parse(newDate));
        end.datepicker('setDate', newDate);
      } else if(value > 1){
        input.value = value - 1;
        // console.log(startDate, 'startDate changeNumber false');

        var parsedDate = new Date(Date.parse(endDate));
        parsedDate.setDate(parsedDate.getDate() - 1);
        var newDate = parsedDate.toDateString();
        newDate = new Date(Date.parse(newDate));
        end.datepicker('setDate', newDate);
      }
    };
  };

  function initTravelersField(parent) {
    var parent = numberTravelers[i];
    var input = parent.querySelector('#quantity');
    var minus = parent.querySelector('#travelers-minus');
    var plus = parent.querySelector('#travelers-plus');

    minus.addEventListener('click', function() {
      event.preventDefault();
      changeTravelNumber(false);
    });

    plus.addEventListener('click', function() {
      event.preventDefault();
      changeTravelNumber(true);
    });

    function changeTravelNumber(operation) {
      var value = Number(input.value);

      if(isNaN(value)) {
        value = 0;
      }

      if(operation) {
        input.value = value + 1;
        addTraveler();
      } else if(value > 1){
        input.value = value - 1;
        removeTraveler();
      }
    };

    function addTraveler() {
      var html = Mustache.render(travelersTemplate, {
        'number': input.value
      });
      var li = document.createElement('li');
      li.classList.add('review-form__traveler');
      li.innerHTML += html;

      travelersArea.appendChild(li);
    };

    function removeTraveler() {
      travelersArea.removeChild(travelersArea.lastChild);
    };
  };

  function daysBetween(date1, date2) {
    var ONE_DAY = 24 * 60 * 60 * 1000;
    if(date1 == null || date2 == null) {

    }
    var firstDate = date1.getTime();
    var secondDate = date2.getTime();

    var difference = secondDate - firstDate;
    return Math.round(difference/ONE_DAY);
  };

  function preview(file) {
    if(file.type.match(/image.*/)) {
      var reader = new FileReader();

      reader.addEventListener('load', function(event) {
        var html = Mustache.render(picturesTemplate, {
          'image': event.target.result,
          'name': file.name
        });
        var li = document.createElement('li');
        li.classList.add('review-gallery__item');
        li.innerHTML += html;

        picturesArea.appendChild(li);

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

        console.log(pictures);
      });

      reader.readAsDataURL(file);
    };
  };

  function removePreview(li) {
    pictures = pictures.filter(function(element) {
      return element.li != li;
    });

    li.parentNode.removeChild(li);
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

    // Adding pics
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
