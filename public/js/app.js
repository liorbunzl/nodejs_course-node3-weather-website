const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    const location = search.value

    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          messageOne.textContent = "";
          messageTwo.textContent = data.error;
        } else {
            console.log(data)

            messageOne.textContent = 'Weather for ' + data.location + ':'
            
            messageTwo.textContent =
              "Temperature: " +
              data.temperature +
              " " +
              "Feels like: " +
              data.feelsLike;

          console.log();
        }
      });
    });
})