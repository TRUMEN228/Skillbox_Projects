(function () {
  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  // создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    button.disabled = true;

    input.addEventListener("input", function () {
      if (!input.value) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    });

    return {
      form,
      input,
      button,
    };
  }

  // создаем и возвращаем список дел
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  // создаем и возвращаем дело
  function createTodoItem(work) {
    let item = document.createElement("li");

    // кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    // устанавливаем стили для элементов списка, а также для размещения кнопок
    // в его правой части с помощью flex
    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    item.textContent = work.name;
    item.id = work.id;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  // создаем и возвращаем случайный id для дела и проверяем на наличие таких же у других объектов в массиве дел
  function addIdToWork(works) {
    let randomId = Math.round(Math.random() * 100);

    if (works.length > 0) {
      for (let work in works) {
        while (works[work] === randomId) {
          randomId = Math.round(Math.random() * 100);
        }
      }
    }

    return randomId;
  }

  // функция для записи данных в LocalStorage
  function writeItemToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // функция для выборки данны из LocalStorage
  function getItemFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  // создаем и возвращаем сам контейнер с заголовком
  function createTodoApp(container, title = "Список дел", listName) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemForm.button.disabled = true;

    let works = getItemFromStorage(listName) ? getItemFromStorage(listName) : [];

    if (works.length !== 0) {
      for (let i in works) {
        let todoItemStorage = createTodoItem(works[i]);

        if (works[i].done) {
          todoItemStorage.item.classList.add("list-group-item-success");
        }

        // добавляем обработчики на кнопки
        todoItemStorage.doneButton.addEventListener("click", function () {
          todoItemStorage.item.classList.toggle("list-group-item-success");
          for (let i in works) {
            if (Number(todoItemStorage.item.id) === works[i].id) {
              works[i].done ? (works[i].done = false) : (works[i].done = true);
              break;
            }
          }
          writeItemToStorage(listName, works);
        });

        todoItemStorage.deleteButton.addEventListener("click", function () {
          if (confirm("Вы уверены?")) {
            for (let i in works) {
              if (Number(todoItemStorage.item.id) === works[i].id) {
                works.splice(i, 1);
                break;
              }
            }
            writeItemToStorage(listName, works);
            todoItemStorage.item.remove();
          }
        });

        todoList.append(todoItemStorage.item);
      }
    }

    // браузер создает событие submit на форме по нажатию Enter или на кнопку создания дела
    todoItemForm.form.addEventListener("submit", function (e) {
      // эта строчка необходима, чтобы предотвратить стандартные действия браузера
      // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
      e.preventDefault();

      // игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      let work = {
        id: addIdToWork(works),
        name: todoItemForm.input.value,
        done: false,
      };

      works.push(work);
      writeItemToStorage(listName, works);

      console.log(works);

      let todoItem = createTodoItem(work);

      // добавляем обработчики на кнопки
      todoItem.doneButton.addEventListener("click", function () {
        todoItem.item.classList.toggle("list-group-item-success");
        for (let i in works) {
          if (Number(todoItem.item.id) === works[i].id) {
            works[i].done ? (works[i].done = false) : (works[i].done = true);
            break;
          }
        }
        writeItemToStorage(listName, works);
      });

      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          for (let i in works) {
            if (Number(todoItem.item.id) === works[i].id) {
              works.splice(i, 1);
              break;
            }
          }
          writeItemToStorage(listName, works);
          todoItem.item.remove();
        }
      });

      // создаем и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItem.item);

      // обнуляем значение в поле ввода, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = "";

      // делаем состояние кнопки добавления дела disabled
      todoItemForm.button.disabled = true;
    });
  }

  // добавляем в глобальный объект одноименную функцию для создания контейнера
  window.createTodoApp = createTodoApp;
})();
