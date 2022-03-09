console.log("Client JavaScript");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const clima = document.getElementById("clima");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const lugar = search.value;

  if (lugar) {
    fetch(`/weather?address=${lugar}`).then((res) => {
      res.json().then((data) => {
        let text;
        if (data.error) {
          text = data.error;
        } else {
          text = `<strong>${data.location}</strong><br />
            Temperatura: ${data.temperature}<br />
            Probabilidad de  precipitación: ${data.precipitation}%<br />
            `;
        }

        clima.innerHTML = text;
      });
    });
  }

  console.log(lugar);
});
