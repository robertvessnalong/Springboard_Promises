let numPromises = [];
function getNumberFact(numArr) {
  return new Promise((resolve, reject) => {
    try {
      numArr.forEach((num) => {
        numPromises.push(axios.get(`http://numbersapi.com/${num}`));
        resolve();
      });
    } catch {
      reject();
    }
  });
}

getNumberFact([30, 22, 11]);

Promise.all(numPromises).then((res) => {
  res.forEach((item) => {
    resContainer = document.querySelector('.response-items');
    li = document.createElement('li');
    li.append(`${item.data}`);
    resContainer.append(li);
  });
});

function deckOfCards() {
  axios
    .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then((res) => {
      document.querySelector('button').addEventListener('click', () => {
        axios
          .get(
            `https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`
          )
          .then((res) => {
            if (res.data.remaining == 0) {
              document.querySelector('button').style.display = 'none';
            } else {
              if ('content' in document.createElement('template')) {
                const container = document.querySelector('.playingCards');
                const temp = document.querySelector('.card-template');
                let clone = temp.content.cloneNode(true);
                let img = clone.querySelector('img');
                img.src = `${res.data.cards[0].image}`;
                container.appendChild(clone);
              }
            }
          })
          .catch((err) => console.log(err));
      });
    });
}

window.onload = function () {
  deckOfCards();
};
