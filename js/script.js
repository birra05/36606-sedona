(function () {

  var spinners = document.querySelectorAll(".spinner");

  for (var i = 0; i < spinners.length; i++) {
    initSpinner(spinners[i]);
  }


  function initSpinner(container) {
    var input = container.querySelector(".input");
    var minus = container.querySelector(".spinner__minus");
    var plus = container.querySelector(".spinner__plus");

    minus.addEventListener("click", function () {
      changeNumber(false);
    });

    plus.addEventListener("click", function () {
      changeNumber(true);
    });

    input.addEventListener("keypress", function(event) {
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      var chr = getChar(event);
      if (chr == null) return;

        if (chr < '0' || chr > '9') {
          return false;
        }
    });

    function getChar(event) {
      if (event.which == null) { // IE
        if (event.keyCode < 32) return null; // спец. символ
        return String.fromCharCode(event.keyCode)
      }

      if (event.which != 0 && event.charCode != 0) { // все кроме IE
        if (event.which < 32) return null; // спец. символ
        return String.fromCharCode(event.which); // остальные
      }

      return null; // спец. символ
    }

    function changeNumber(operation) {
      var value = Number(input.value);
      var step = Number(input.step);
      var changed = false;

      if (isNaN(value)) {
        value = input.min;
      }

      if (isNaN(step) || (step === 0)) {
        step = 1;
      }

      if (operation) {
        value += step;

        if (value <= input.max) {
          input.value = value;
          changed = true;
        }

      } else {
        value -= step;

        if (value >= input.min) {
          input.value = value;
          changed = true;
        }
      }

      if (changed) {
        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            input.dispatchEvent(evt);
        }
        else
            input.fireEvent("onchange");

        }
      }
    }
})();
