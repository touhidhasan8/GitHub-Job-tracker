 document
        .getElementById("login-btn")
        .addEventListener("click", function () {
          const number = document.getElementById("input-number");
          const inputNumber = number.value;

          const pin = document.getElementById("pin");
          const inputPin = pin.value;

          if (inputNumber == "admin" && inputPin == "admin123") {

            console.log("login successFully")
            alert("login Successfully ✅ ");
            window.location.assign('./home.html')
          } else {
            alert("invalid Number And Pin Number");
          }
        });