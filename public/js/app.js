const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    const url = '/weather?address=' + encodeURIComponent(location);

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = ' ';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error;
            }
            const message = data.forecast.summary + " It is currently " + 
                data.forecast.temperature + " degrees out. " +
                "There is a " + data.forecast.precipProbability*100 + "% chance of rain. " + 
                "The high today is " + data.forecast.temperatureHigh + " degrees with a low of " + 
                data.forecast.temperatureLow + " degrees.";
                
            messageOne.textContent = data.location;
            messageTwo.textContent = message;
            console.log(data.forecast);
        })
    })
})