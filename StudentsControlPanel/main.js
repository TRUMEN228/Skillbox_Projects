// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.
(() => {
  let lastIndex;

  const studentsList = [
    // Добавьте сюда объекты студентов
    {
      surname: "Иванов",
      name: "Иван",
      middleName: "Иванович",
      birthDate: "01.01.2002",
      studyStartYear: "2020",
      faculty: "Информатика и вычислительная техника",
    },
    {
      surname: "Петров",
      name: "Петр",
      middleName: "Петрович",
      birthDate: "02.02.2001",
      studyStartYear: "2019",
      faculty: "Экономика и управление",
    },
    {
      surname: "Сергеев",
      name: "Сергей",
      middleName: "Сергеевич",
      birthDate: "03.01.1998",
      studyStartYear: "2016",
      faculty: "Радиотехника",
    },
  ];

  function transformDate(date) {
    return date < 10 ? "0" + date : date;
  }

  function transformMonth(month) {
    return month < 10 ? "0" + (month + 1) : month + 1;
  }

  function getStudentAge(birthDateStr) {
    const birthDateSplited = birthDateStr.split(".");
    const currentDate = new Date();
    const currentDateTyped = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const studentBirthDate = new Date(birthDateSplited[2], birthDateSplited[1], birthDateSplited[0]);
    const studentBirthDateThisYear = new Date(currentDateTyped.getFullYear(), studentBirthDate.getMonth(), studentBirthDate.getDate());

    let studentAge = currentDateTyped.getFullYear() - studentBirthDate.getFullYear();

    if (currentDateTyped < studentBirthDateThisYear) {
      studentAge = studentAge - 1;
    }

    return studentAge;
  }

  function yearInterpretation(studentAge) {
    if (studentAge % 10 === 1) {
      return `${studentAge} год`;
    } else if (studentAge % 10 === 2 || studentAge % 10 === 3 || studentAge % 10 === 4) {
      return `${studentAge} года`;
    } else {
      return `${studentAge} лет`;
    }
  }

  function getStudyingInterval(startYearStr) {
    const startYear = Number(startYearStr);
    const endYear = startYear + 4;

    const date = new Date();
    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endYearDate = new Date(endYear - 1, 8, 29);

    if (currentDate > endYearDate) {
      return `${startYear}-${endYear} (закончил)`;
    } else {
      return `${startYear}-${endYear} (${courseInterpretation(startYear)} курс)`;
    }
  }

  function courseInterpretation(startYear) {
    const currentDate = new Date();

    if (currentDate.getMonth() >= 8) {
      return currentDate.getFullYear() - startYear + 1;
    } else {
      return currentDate.getFullYear() - startYear;
    }
  }

  // Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

  function getStudentItem(studentObj) {
    const tableRow = document.createElement("tr");

    let studentInfoArray = [
      `${studentObj.surname} ${studentObj.name} ${studentObj.middleName}`,
      `${studentObj.birthDate} (${yearInterpretation(getStudentAge(studentObj.birthDate))})`,
      `${getStudyingInterval(studentObj.studyStartYear)}`,
      `${studentObj.faculty}`,
    ];

    for (let i = 0; i < 4; i++) {
      const tableCell = document.createElement("td");
      tableCell.id = `${lastIndex + 2}-${i + 1}-body-cell`;
      tableCell.textContent = studentInfoArray[i];
      tableRow.append(tableCell);
    }

    lastIndex++;

    return tableRow;
  }

  // Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

  function renderStudentsTable(studentsArray) {
    const studentsTableContainer = document.querySelector(".students-table");

    const table = document.createElement("table");
    table.classList.add("table-bordered");
    table.id = 'students-table-obj';
    table.style.width = "100%";
    table.cellSpacing = 2;
    table.cellPadding = 10;

    const tableHead = document.createElement("thead");
    const tableBody = document.createElement("tbody");
    const tableHeadRow = document.createElement("tr");

    for (let i = 0; i < 4; i++) {
      const tableHeadCell = document.createElement("th");
      tableHeadCell.id = `${i + 1}-head-cell`;
      tableHeadRow.append(tableHeadCell);
    }

    tableHead.append(tableHeadRow);

    table.append(tableHead);
    table.append(tableBody);

    studentsTableContainer.append(table);

    const headCells = {
      first: document.getElementById("1-head-cell"),
      second: document.getElementById("2-head-cell"),
      third: document.getElementById("3-head-cell"),
      fourth: document.getElementById("4-head-cell"),
    };

    headCells.first.textContent = "Ф.И.О.";
    headCells.second.textContent = "Дата рождения";
    headCells.third.textContent = "Год начала обучения";
    headCells.fourth.textContent = "Факультет";

    headCells.first.style.width = "34%";
    headCells.second.style.width = "23%";
    headCells.third.style.width = "23%";
    headCells.fourth.style.width = "20%";

    for (const index in studentsArray) {
      const tableBodyRow = document.createElement("tr");

      const studentInfoArray = [
        `${studentsArray[index].surname} ${studentsArray[index].name} ${studentsArray[index].middleName}`,
        `${studentsArray[index].birthDate} (${yearInterpretation(getStudentAge(studentsArray[index].birthDate))})`,
        `${getStudyingInterval(studentsArray[index].studyStartYear)}`,
        `${studentsArray[index].faculty}`,
      ];

      for (let i = 0; i < 4; i++) {
        const tableBodyCell = document.createElement("td");
        tableBodyCell.id = `${Number(index) + 1}-${i + 1}-body-cell`;
        tableBodyCell.textContent = studentInfoArray[i];
        tableBodyRow.append(tableBodyCell);
      }

      tableBody.append(tableBodyRow);

      lastIndex = Number(index);
    }

    addStudentsTableSortEvent();
  }

  function addStudentsTableSortEvent() {
    const studentsTable = document.querySelector('table');

    const headCells = {
      first: document.getElementById("1-head-cell"),
      second: document.getElementById("2-head-cell"),
      third: document.getElementById("3-head-cell"),
      fourth: document.getElementById("4-head-cell"),
    };

    headCells.first.addEventListener('click', () => {
      studentsTable.remove();
      renderStudentsTable(studentsArraySort(studentsList, 'fullName'));
    });

    headCells.second.addEventListener('click', () => {
      studentsTable.remove();
      renderStudentsTable(studentsArraySort(studentsList, 'birthDate'));
    });

    headCells.third.addEventListener('click', () => {
      studentsTable.remove();
      renderStudentsTable(studentsArraySort(studentsList, 'studyStartYear'));
    });

    headCells.fourth.addEventListener('click', () => {
      studentsTable.remove();
      renderStudentsTable(studentsArraySort(studentsList, 'faculty'));
    });
  }

  // Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

  function createStudentsTable() {
    let date = new Date();

    const birthDateInput = document.getElementById("birth-input");
    const studyYearInput = document.getElementById("study-input");

    birthDateInput.max = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    studyYearInput.max = `${Number(date.getFullYear())}`;

    renderStudentsTable(studentsList);

    const studentsForm = document.querySelector(".students-form");
    const studentsFormInputs = document.querySelectorAll(".input");
    const studentsFormDates = document.querySelectorAll('.date-input');

    studentsForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let isFormValid = true;

      for (const input of studentsFormInputs) {
        if (!input.value) {
          isFormValid = false;
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
        } else if (input.value < input.min) {
          isFormValid = false;
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
        } else {
          input.classList.add("is-valid");
          input.classList.remove("is-invalid");
        }
      }

      for (const input of studentsFormDates) {
        const errMessage = document.getElementById(`${input.id}-m`);
        if (!input.value) {
          isFormValid = false;
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
          errMessage.textContent = 'Не заполнено поле';
        } else if (input.value < input.min) {
          isFormValid = false;
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
          if (input === birthDateInput) {
            errMessage.textContent = 'Введите значение в пределах допустимых (минимальное значение: 01.01.1970)';
          } else if (input === studyYearInput) {
            errMessage.textContent = 'Введите значение в пределах допустимых (минимальное значение: 2020)';
          }
        } else {
          input.classList.add("is-valid");
          input.classList.remove("is-invalid");
        }
      }

      for (const input of studentsFormInputs) {
        input.addEventListener('input', () => {
          if (!input.value) {
            isFormValid = false;
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
          } else if (input.value < input.min) {
            isFormValid = false;
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
          } else {
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
          }
        });
      }

      if (isFormValid) {
        const studentsTableBody = document.querySelector("tbody");

        const formData = {
          surname: document.getElementById("surname-input").value,
          name: document.getElementById("name-input").value,
          middleName: document.getElementById("middlename-input").value,
          birthDate: document.getElementById("birth-input").valueAsDate,
          studyStartYear: document.getElementById("study-input").value,
          faculty: document.getElementById("faculty-input").value,
          clear() {
            document.getElementById("surname-input").value = "";
            document.getElementById("name-input").value = "";
            document.getElementById("middlename-input").value = "";
            document.getElementById("birth-input").value = "";
            document.getElementById("study-input").value = "";
            document.getElementById("faculty-input").value = "";

            for (const input of studentsFormInputs) {
              input.classList.remove("is-valid");
            }

            for (const input of studentsFormDates) {
              input.classList.remove('is-valid');
            }
          },
        };

        const currentStudent = {
          name: formData.name,
          surname: formData.surname,
          middleName: formData.middleName,
          birthDate: `${transformDate(formData.birthDate.getDate())}.${transformMonth(formData.birthDate.getMonth())}.${formData.birthDate.getFullYear()}`,
          studyStartYear: formData.studyStartYear,
          faculty: formData.faculty,
        };

        formData.clear();
        studentsList.push(currentStudent);

        const tableRow = getStudentItem(currentStudent);
        studentsTableBody.append(tableRow);
      }
    });

    const filterForm = document.querySelector('.students-filter-form');
    const filterCancelBtn = document.getElementById('filter-clear');

    filterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const studentsTable = document.querySelector('table');
      const filtersArray = getFilterData();

      if (filtersArray === 'none') {
        return;
      } else {
        if (studentsArrayFilter(studentsList, filtersArray).length === 0) {
          alert('Не найдено студентов с указанными данными');
          return;
        } else {
          studentsTable.remove();
          renderStudentsTable(studentsArrayFilter(studentsList, filtersArray));
        }
      }
    });

    filterCancelBtn.addEventListener('click', () => {
      const studentsTable = document.querySelector('table');
      studentsTable.remove();
      renderStudentsTable(studentsList);
    });
  }

  window.createStudentsTable = createStudentsTable;


  // Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

  function studentsArraySort(studentsArray, parameterStr) {
    let sortedArray = studentsArray;

    return sortedArray.sort((a, b) => {
      if (parameterStr === 'fullName') {
        if (a.surname > b.surname) {
          return 1;
        } else if (a.surname < b.surname) {
          return -1;
        }

        if (a.surname === b.surname) {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          }

          if (a.name === b.name) {
            if (a.middleName > b.middleName) {
              return 1;
            } else if (a.middleName < b.middleName) {
              return -1;
            }
          }
        }
      } else if (parameterStr === 'birthDate') {
        a = new Date(a.birthDate.split('.')[2], a.birthDate.split('.')[1], a.birthDate.split('.')[0]);
        b = new Date(b.birthDate.split('.')[2], b.birthDate.split('.')[1], b.birthDate.split('.')[0]);

        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        }
      } else if (parameterStr === 'studyStartYear') {
        a = Number(a.studyStartYear);
        b = Number(b.studyStartYear);

        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        }
      } else if (parameterStr === 'faculty') {
        if (a.faculty > b.faculty) {
          return 1;
        } else if (a.faculty < b.faculty) {
          return -1;
        }
      }

      return 0;
    });
  }

  // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

  function getFilterData() {
    const studentBirthDate = new Date();

    const filtersArr = [
      document.getElementById('surname-filter').value,
      document.getElementById('name-filter').value,
      document.getElementById('middlename-filter').value,
      document.getElementById('birth-filter').value,
      document.getElementById('study-filter').value,
      document.getElementById('faculty-filter').value
    ];

    if (filtersArr.every(filter => !filter)) {
      return 'none';
    }

    console.log(`filter date: ${filtersArr[3]}`);

    return filtersArr;
  }

  function studentsArrayFilter(studentsArray, filtersArr) {
    let filteredArray = studentsArray;
    let studentDateArr = [];

    // for (const student of filteredArray) {
    //   const birthDate = new Date(student.birthDate.split('.')[2], student.birthDate.split('.')[1], student.birthDate.split('.')[0]);
    //   studentDateArr.push(`${birthDate.getFullYear()}-${birthDate.getMonth()}-${birthDate.getDate()}`);
    // }

    const filtersDate = `${filtersArr[3].split('-')[2]}.${filtersArr[3].split('-')[1]}.${filtersArr[3].split('-')[0]}`;

    console.log(studentDateArr);

    const studentData = [
      'surname',
      'name',
      'middleName',
      'birthDate',
      'studyStartYear',
      'faculty'
    ];

    for (const index in filtersArr) {
      if (!filtersArr[index]) {
        continue;
      }

      if (studentData[index] === 'birthDate') {
        filteredArray = filteredArray.filter(student => student[studentData[index]] === filtersDate);
      } else if (studentData[index] === 'studyStartYear') {
        filteredArray = filteredArray.filter(student => student[studentData[index]] === filtersArr[index]);
      } else {
        filteredArray = filteredArray.filter(student => student[studentData[index]].startsWith(filtersArr[index]));
      }
    }

    return filteredArray;
  }
})();
