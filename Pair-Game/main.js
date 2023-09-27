(() => {
  // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]. count - количество пар.
  function createNumbersArray(count) {
    let numbersArray = [];

    for (let i = 0; i < count; i++) {
      numbersArray[i * 2] = i + 1;
      numbersArray[i * 2 + 1] = i + 1;
    }

    return numbersArray;
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
  function shuffle(arr) {
    for (let i in arr) {
      let j = Math.round(Math.random() * (arr.length - 1));

      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
  function startGame(count) {
    let cardNumbers = createNumbersArray(count);
    cardNumbers = shuffle(cardNumbers);

    const cardGame = document.querySelector(".pair-card-game");

    const cardList = document.createElement("ul");
    cardList.classList.add("card-list");
    cardGame.append(cardList);

    let cardStorage = [];

    for (let number in cardNumbers) {
      const card = document.createElement("li");
      card.classList.add("card", "default-card-state");
      card.id = number;
      cardList.append(card);

      const cardDescr = {
        id: number,
        number: cardNumbers[number],
      };
      cardStorage.push(cardDescr);
    }

    return {
      cardList,
      cardStorage,
    };
  }

  function createCardGame() {
    const cardGame = document.querySelector(".pair-card-game");

    const gameTitle = document.createElement("h1");
    gameTitle.classList.add("game-title");
    gameTitle.textContent = "Игра в Пары";

    const gameForm = document.createElement("form");
    gameForm.classList.add("game-form");

    const gameSettings = document.createElement("input");
    gameSettings.classList.add("game-input");
    gameSettings.placeholder = "Количество карточек по вертикали/горизонтали";

    const gameButton = document.createElement("button");
    gameButton.classList.add("btn", "game-btn");
    gameButton.textContent = "Начать игру";

    const stopButton = document.createElement("button");
    stopButton.classList.add("btn", "stop-btn");
    stopButton.textContent = "Завершить";
    stopButton.disabled = true;

    gameForm.append(gameSettings);
    gameForm.append(gameButton);

    const timerBlock = document.createElement("div");
    timerBlock.classList.add("game-timer-block");
    const timerText = document.createElement("div");
    timerText.classList.add("game-timer-text");
    timerText.textContent = "Оставшееся время:";
    const timerTime = document.createElement("div");
    timerTime.classList.add("game-timer-time");
    timerTime.textContent = "00:00";

    timerBlock.append(timerText);
    timerBlock.append(timerTime);

    cardGame.append(gameTitle);
    cardGame.append(gameForm);
    cardGame.append(stopButton);
    cardGame.append(timerBlock);

    const GAME_TIME = 60;

    let gameTimeout;
    let timer;

    gameForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (gameSettings.value % 2 === 0 && gameSettings.value >= 2 && gameSettings.value <= 10) {
        const fieldSize = gameSettings.value;
        const pairCounter = fieldSize ** 2 / 2;
        const gameStart = startGame(pairCounter);
        const gameField = gameStart.cardList;
        gameField.style.gridTemplateColumns = `repeat(${fieldSize}, 100px)`;
        gameField.style.gridTemplateRows = `repeat(${fieldSize}, 100px)`;

        cardGame.append(gameField);
        gameButton.disabled = true;
        gameButton.style.cursor = "default";
        stopButton.disabled = false;
        stopButton.style.cursor = "pointer";
        gameSettings.value = "";

        let cardSelected = false;
        let rightCard = false;
        let rightCardsCounter = 0;

        let gameMinutes = Math.floor(GAME_TIME / 60) < 10 ? "0" + Math.floor(GAME_TIME / 60) : Math.floor(GAME_TIME / 60);
        let gameSeconds = (GAME_TIME - Math.floor(GAME_TIME / 60) * 60) < 10 ? "0" + (GAME_TIME - Math.floor(GAME_TIME / 60) * 60) : (GAME_TIME - Math.floor(GAME_TIME / 60) * 60);
        timerTime.textContent = `${gameMinutes}:${gameSeconds}`;
        let startTime = new Date();
        let stopTime = startTime.setSeconds(startTime.getSeconds() + (GAME_TIME + 1));

        timer = setInterval(() => {
          let currentTime = new Date().getTime();
          let remainTime = stopTime - currentTime;

          let minutes = Math.floor((remainTime % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((remainTime % (1000 * 60)) / 1000);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 11 ? "0" + seconds : seconds;

          timerTime.textContent = `${minutes}:${seconds}`;

          if (remainTime < 0) {
            clearInterval(timer);
            timerTime.textContent = "00:00";
          }
        }, 1000);

        clearTimeout(gameTimeout);
        gameTimeout = setTimeout(() => {
          alert("Время вышло. К сожалению, вы проиграли :(");
          gameField.remove();
          gameButton.disabled = false;
          gameButton.style.cursor = "pointer";
          stopButton.disabled = true;
          stopButton.style.cursor = "default";
          clearInterval(timer);
          timerTime.textContent = "00:00";
        }, GAME_TIME * 1000 + 1000);

        let currentId;

        for (let id in gameStart.cardStorage) {
          const card = document.getElementById(id);
          card.addEventListener("click", () => {
            card.classList.add("active-card-state");
            card.textContent = gameStart.cardStorage[id].number;

            if (cardSelected) {
              const currentCard = document.getElementById(currentId);

              if (gameStart.cardStorage[currentId].number === gameStart.cardStorage[id].number && gameStart.cardStorage[currentId].id !== gameStart.cardStorage[id].id) {
                rightCard = true;
                rightCardsCounter++;

                currentCard.classList.remove("wrong-card-state");
                card.classList.remove("wrong-card-state");

                currentCard.classList.add("right-card-state");
                card.classList.add("right-card-state");

                let timeout;
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                  currentCard.classList.add("hidden-card-state");
                  card.classList.add("hidden-card-state");
                }, 1000);
              } else {
                currentCard.classList.remove("right-card-state");
                card.classList.remove("right-card-state");

                currentCard.classList.add("wrong-card-state");
                card.classList.add("wrong-card-state");

                let timeout;
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                  currentCard.classList.remove("wrong-card-state");
                  card.classList.remove("wrong-card-state");
                  currentCard.textContent = "";
                  card.textContent = "";
                }, 400);
              }

              cardSelected = false;
              rightCard = false;

              currentCard.classList.remove("active-card-state");
              card.classList.remove("active-card-state");

              if (rightCardsCounter === pairCounter) {
                clearTimeout(gameTimeout);
                clearInterval(timer);
                let timeout;
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                  alert("Поздравляем! Вы выиграли! :)");
                  gameField.remove();
                  gameButton.disabled = false;
                  gameButton.style.cursor = "pointer";
                  stopButton.disabled = true;
                  stopButton.style.cursor = "default";
                  timerTime.textContent = "00:00";
                }, 2000);
              }
            } else {
              cardSelected = true;
              currentId = id;
            }
          });
        }
      } else {
        alert("Можно вводить четные числа от 2 до 10");
      }
    });

    stopButton.addEventListener("click", () => {
      if (confirm("Вы уверены?")) {
        const gameField = document.querySelector(".card-list");
        gameField.remove();
        gameButton.disabled = false;
        gameButton.style.cursor = "pointer";
        stopButton.disabled = true;
        stopButton.style.cursor = "default";
        clearTimeout(gameTimeout);
        clearInterval(timer);
        timerTime.textContent = "00:00";
      }
    });
  }

  window.createCardGame = createCardGame;
})();
