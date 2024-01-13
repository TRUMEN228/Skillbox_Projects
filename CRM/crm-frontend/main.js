(() => {
  async function getClientList() {
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();
    return data;
  }

  async function addClient(clientObj) {
    const response = await fetch(`http://localhost:3000/api/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientObj)
    });
    const data = await response.json();
    return data;
  }

  async function getClient(clientId) {
    const response = await fetch(`http://localhost:3000/api/clients/${clientId}`);
    const data = await response.json();
    return data;
  }

  async function updateClient(clientObj) {
    const response = await fetch(`http://localhost:3000/api/clients/${clientObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientObj)
    });
    const data = await response.json();
    return data;
  }

  async function deleteClient(clientId) {
    await fetch(`http://localhost:3000/api/clients/${clientId}`, {
      method: 'DELETE'
    });
  }

  function isFormValidated(inputList, contactInputList) {
    // const typeList = {
    //   phone: /^\+\d{11,13}$/,
    //   email: /^[^\s@]+@[^\s@]+$/,
    //   vk: /^https:\/\/vk.com\/[^\s]+$/,
    //   facebook: /^https:\/\/www.facebook.com\/[^\s]+$/,
    //   twitter: /^https:\/\/www.twitter.com\/[^\s]+$/
    // };

    const typeList = {
      phone: {
        format: /^\+\d{11,13}$/,
        errorMsg: 'Телефон должен начинаться с "+" и содержать в себе от 11 до 13 цифр. Например: <u><b>+71234567890</b></u>'
      },
      email: {
        format: /^[^\s@]+@[^\s@]+$/,
        errorMsg: 'E-mail должен содержать "@". Например: <u><b>test@example.ru</b></u>'
      },
      vk: {
        format: /^https:\/\/vk.com\/[^\s]+$/,
        errorMsg: 'Ссылка на VK должна выглядеть так: <u><b>https://vk.com/<ваш id></u></b>'
      },
      facebook: {
        format: /^https:\/\/www.facebook.com\/[^\s]+$/,
        errorMsg: 'Ссылка на Facebook должна выглядеть так: <u><b>https://www.facebook.com/<ваш id></u></b>'
      },
      twitter: {
        format: /^https:\/\/www.twitter.com\/[^\s]+$/,
        errorMsg: 'Ссылка на Twitter должна выглядеть так: <u><b>https://www.twitter.com/<ваш id></u></b>'
      }
    };

    const errorMsgItem = document.getElementById('error-message');

    function areContactsValidated() {
      if (!contactInputList.length) {
        return true;
      }

      let inputCount = 0;

      for (const input of contactInputList) {
        if (typeList[input.inputs.contactInputSelect.value].format.test(input.inputs.contactInputInput.value)) {
          errorMsgItem.style.display = 'none';
          errorMsgItem.innerHTML = '';

          inputCount++
        } else {
          errorMsgItem.style.display = 'block';
          errorMsgItem.innerHTML = typeList[input.inputs.contactInputSelect.value].errorMsg;

          return false;
        }
      }

      return inputCount === contactInputList.length;
    }

    function isMainFormValidated() {
      let inputCount = 0;

      for (const input of inputList) {
        if (input.value) {
          inputCount++;
        }
      }

      return inputCount === inputList.length;
    }

    console.log(contactInputList);

    return {
      isValid: areContactsValidated() && isMainFormValidated(),
      isMainFormValidated,
      areContactsValidated
    };
  }

  // function isContactValidated(contactInput, type) {
  //   const typeList = {
  //     phone: {
  //       format: /^\+\d{11,13}$/,
  //       errorMsg: 'Телефон должен начинаться с "+" и содержать в себе от 11 до 13 цифр. Например: <u><b>+71234567890</b></u>'
  //     },
  //     email: {
  //       format: /^[^\s@]+@[^\s@]+$/,
  //       errorMsg: 'E-mail должен содержать "@". Например: <u><b>test@example.ru</b></u>'
  //     },
  //     vk: {
  //       format: /^https:\/\/vk.com\/[^\s]+$/,
  //       errorMsg: 'Ссылка на VK должна выглядеть так: <u><b>https://vk.com/<ваш id></u></b>'
  //     },
  //     facebook: {
  //       format: /^https:\/\/www.facebook.com\/[^\s]+$/,
  //       errorMsg: 'Ссылка на Facebook должна выглядеть так: <u><b>https://www.facebook.com/<ваш id></u></b>'
  //     },
  //     twitter: {
  //       format: /^https:\/\/www.twitter.com\/[^\s]+$/,
  //       errorMsg: 'Ссылка на Twitter должна выглядеть так: <u><b>https://www.twitter.com/<ваш id></u></b>'
  //     }
  //   };

  //   const errorMsgItem = document.getElementById('error-message');

  //   if (contactInput.value && typeList[type].format.test(contactInput.value)) {
  //     errorMsgItem.style.display = 'none';
  //     errorMsgItem.innerHTML = '';

  //     return true;
  //   } else {
  //     errorMsgItem.style.display = 'block';
  //     errorMsgItem.innerHTML = typeList[type].errorMsg;

  //     return false;
  //   }
  // }

  function formatName(str) {
    return `${str.substring(0, 1).toUpperCase()}${str.substring(1).toLowerCase()}`;
  }

  function formatDate(number) {
    return `${number < 10 ? '0' + number : number}`;
  }

  function splitDate(dateStr) {
    const date = new Date(dateStr);

    const dateDate = `${formatDate(date.getDate())}.${formatDate(date.getMonth() + 1)}.${date.getFullYear()}`;
    const dateTime = `${formatDate(date.getHours())}:${formatDate(date.getMinutes())}`;

    return {
      dateDate,
      dateTime
    };
  }

  function arraySort(array, param, sortDir = true) {
    const sotredArr = array;

    if (sortDir) {
      return sotredArr.sort((a, b) => {
        if (param === 'id') {
          return a.id >= b.id ? 1 : -1;
        } else if (param === 'fullName') {
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
              if (a.lastName > b.lastName) {
                return 1;
              } else if (a.lastName < b.lastName) {
                return -1;
              }
            }
          }
        } else if (param === 'createTime') {
          a = new Date(a.createdAt);
          b = new Date(b.createdAt);

          return a >= b ? 1 : -1;
        } else if (param === 'updateTime') {
          a = new Date(a.updatedAt);
          b = new Date(b.updatedAt);

          return a >= b ? 1 : -1;
        }
      });
    } else {
      return sotredArr.sort((a, b) => {
        if (param === 'id') {
          return a.id <= b.id ? 1 : -1;
        } else if (param === 'fullName') {
          if (a.surname < b.surname) {
            return 1;
          } else if (a.surname > b.surname) {
            return -1;
          }

          if (a.surname === b.surname) {
            if (a.name < b.name) {
              return 1;
            } else if (a.name > b.name) {
              return -1;
            }

            if (a.name === b.name) {
              if (a.lastName < b.lastName) {
                return 1;
              } else if (a.lastName > b.lastName) {
                return -1;
              }
            }
          }
        } else if (param === 'createTime') {
          a = new Date(a.createdAt);
          b = new Date(b.createdAt);

          return a <= b ? 1 : -1;
        } else if (param === 'updateTime') {
          a = new Date(a.updatedAt);
          b = new Date(b.updatedAt);

          return a <= b ? 1 : -1;
        }
      });
    }
  }

  function arrayFilter(array, param) {
    const containsParam = (client) => {
      for (const key in client) {
        if (client.hasOwnProperty(key)) {
          if (key === 'id') {
            if (client[key].includes(param)) {
              return true;
            }
          } else if (key === 'surname' || key === 'name' || key === 'lastName') {
            if (client[key].toLowerCase().includes(param.toLowerCase())) {
              return true;
            }
          } else if (key === 'createdAt' || key === 'updatedAt') {
            const date = splitDate(client[key]);

            if (date.dateDate.includes(param) || date.dateTime.includes(param)) {
              return true;
            }
          }
        }
      }

      return false;
    }

    const filteredArray = array.filter(client => containsParam(client));

    return filteredArray;
  }

  function createHeaderSection() {
    const appHeader = document.getElementById('crm-header');

    const logo = document.createElement('img');
    logo.src = 'sources/skb-logo.svg';
    logo.classList.add('header-logo');

    const link = document.createElement('a');
    link.classList.add('header-link');
    link.href = '';
    link.append(logo);

    const requestField = document.createElement('input');
    requestField.id = 'filter-input';
    requestField.type = 'text';
    requestField.placeholder = 'Введите запрос';
    requestField.classList.add('header-request-field');

    appHeader.append(link, requestField);
  }

  async function createMainSection() {
    const appMain = document.getElementById('crm-main');

    const title = document.createElement('h1');
    title.classList.add('main-title');
    title.textContent = 'Клиенты';

    const tableWrap = document.createElement('div');
    tableWrap.classList.add('table-wrap');

    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table__container');

    const table = document.createElement('table');
    table.id = 'table';
    table.style.display = 'none';
    table.classList.add('table');

    const tableHead = document.createElement('thead');
    tableHead.classList.add('table-head');
    const tableHeadRow = document.createElement('tr');
    tableHeadRow.classList.add('thead-row');

    const tableHeadList = [
      'ID',
      'Фамилия Имя Отчество',
      'Дата и время создания',
      'Последние изменения',
      'Контакты',
      'Действия'
    ];

    const tableHeadItems = [];

    for (const index in tableHeadList) {
      const tableHeadCell = document.createElement('th');
      tableHeadCell.id = `thead-cell-${Number(index) + 1}`;

      if (tableHeadList[index] === 'Фамилия Имя Отчество') {
        tableHeadCell.innerHTML = `${tableHeadList[index]} <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z" fill="var(--txt-firm)"/>
        </svg>`;

        const alphabetDir = document.createElement('span');
        alphabetDir.id = 'fullname-dir';
        alphabetDir.textContent = 'А-Я';
        alphabetDir.style.color = 'var(--txt-firm)';
        tableHeadCell.append(alphabetDir);

        tableHeadItems.push(tableHeadCell);
      } else if (tableHeadList[index] === 'Контакты' || tableHeadList[index] === 'Действия') {
        tableHeadCell.textContent = tableHeadList[index];
        tableHeadCell.style.cursor = 'default';
      } else {
        tableHeadCell.innerHTML = `${tableHeadList[index]} <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z" fill="var(--txt-firm)"/>
        </svg>`;
        tableHeadItems.push(tableHeadCell);
      }

      tableHeadCell.classList.add('thead-cell', 'table-cell', `thead-cell-${Number(index) + 1}`);

      tableHeadRow.append(tableHeadCell);
    }

    const tableLoadingScreen = document.createElement('div');
    tableLoadingScreen.id = 'table-loading';
    tableLoadingScreen.classList.add('table-loading-screen');

    const tableLoadingWheel = document.createElement('img');
    tableLoadingWheel.src = 'sources/table-loading.svg';
    tableLoadingWheel.classList.add('table-loading-wheel');

    tableLoadingScreen.append(tableLoadingWheel);
    tableHead.append(tableHeadRow);

    tableWrap.append(tableContainer);
    tableContainer.append(table);
    table.append(tableHead);
    appMain.append(title, tableLoadingScreen, tableWrap);

    if (await getClientList()) {
      const clientList = await getClientList();
      let tableBody = await createTableBody(arraySort(clientList, 'id', true));

      const filterInput = document.getElementById('filter-input');

      const currentSort = {
        param: 'id',
        direction: true
      };

      filterInput.addEventListener('input', async () => {
        tableBody.tableBody.remove();
        tableBody.addClientBtn.remove();

        if (!filterInput.value) {
          tableBody = await createTableBody(arraySort(clientList, currentSort.param, currentSort.direction));
        } else {
          tableBody = await createTableBody(arrayFilter(arraySort(clientList, currentSort.param, currentSort.direction), filterInput.value));
        }
      });

      const tableSortParams = [
        ['thead-cell-1', 'id', true],
        ['thead-cell-2', 'fullName', false],
        ['thead-cell-3', 'creationTime', false],
        ['thead-cell-4', 'updateTime', false]
      ];

      for (const param of tableSortParams) {
        const item = document.getElementById(param[0]);

        item.addEventListener('click', async () => {
          tableBody.tableBody.remove();
          tableBody.addClientBtn.remove();

          param[2] = !param[2];

          currentSort.param = param[1];
          currentSort.direction = param[2];

          tableBody = await createTableBody(arrayFilter(arraySort(clientList, param[1], param[2]), filterInput.value));

          if (param[2]) {
            item.firstElementChild.style.transform = 'rotate(180deg)';
            item.firstElementChild.firstElementChild.style.fill = 'var(--firm)';
            item.style.color = 'var(--firm)';

            if (param[0] === 'thead-cell-2') {
              document.getElementById('fullname-dir').textContent = 'А-Я';
              document.getElementById('fullname-dir').style.color = 'var(--firm)';
            }
          } else {
            item.firstElementChild.style.transform = 'rotate(0deg)';
            item.firstElementChild.firstElementChild.style.fill = 'var(--firm)';
            item.style.color = 'var(--firm)';

            if (param[0] === 'thead-cell-2') {
              document.getElementById('fullname-dir').textContent = 'Я-А';
              document.getElementById('fullname-dir').style.color = 'var(--firm)';
            }
          }

          for (const other of tableSortParams) {
            if (other[0] === param[0]) {
              continue;
            }

            const otherItem = document.getElementById(other[0]);
            otherItem.firstElementChild.style.transform = 'rotate(0deg)';
            otherItem.firstElementChild.firstElementChild.style.fill = 'var(--txt-firm)';
            otherItem.style.color = 'var(--txt-grey)';

            if (other[0] === 'thead-cell-2') {
              document.getElementById('fullname-dir').textContent = 'А-Я';
              document.getElementById('fullname-dir').style.color = 'var(--txt-firm)';
            }

            other[2] = false;
          }
        });
      }
    }
  }

  async function createTableBody(array) {
    const appMain = document.getElementById('crm-main');

    const table = document.getElementById('table');

    const tableBody = document.createElement('tbody');
    tableBody.classList.add('table-body');

    table.append(tableBody);

    for (const client of array) {
      const tableRow = document.createElement('tr');
      tableRow.classList.add('tbody-row');

      const idTableCell = document.createElement('td');
      idTableCell.textContent = client.id;
      idTableCell.classList.add('tbody-cell', 'table-cell', 'tbody-cell-1');

      const nameTableCell = document.createElement('td');
      nameTableCell.textContent = `${client.surname} ${client.name} ${client.lastName}`;
      nameTableCell.classList.add('tbody-cell', 'table-cell', 'tbody-cell-2');

      const creationTimeTableCell = document.createElement('td');
      creationTimeTableCell.classList.add('tbody-cell', 'table-cell', 'tbody-cell-3');

      const creationTimeContainer = document.createElement('div');
      creationTimeContainer.classList.add('tbody-cell__date-container');

      const creationTime = splitDate(client.createdAt);
      const creationTimeDate = document.createElement('span');
      creationTimeDate.textContent = creationTime.dateDate;
      creationTimeDate.classList.add('tbody-cell__date');
      const creationTimeTime = document.createElement('span');
      creationTimeTime.textContent = creationTime.dateTime;
      creationTimeTime.classList.add('tbody-cell__time');

      creationTimeContainer.append(creationTimeDate, creationTimeTime);
      creationTimeTableCell.append(creationTimeContainer);

      const updateTimeTableCell = document.createElement('td');
      updateTimeTableCell.classList.add('tbody-cell', 'table-cell', 'tbody-cell-4');

      const updateTimeContainer = document.createElement('div');
      updateTimeContainer.classList.add('tbody-cell__date-container');

      const updateTime = splitDate(client.updatedAt);
      const updateTimeDate = document.createElement('span');
      updateTimeDate.textContent = updateTime.dateDate;
      updateTimeDate.classList.add('tbody-cell__date');
      const updateTimeTime = document.createElement('span');
      updateTimeTime.textContent = updateTime.dateTime;
      updateTimeTime.classList.add('tbody-cell__time');

      updateTimeContainer.append(updateTimeDate, updateTimeTime);
      updateTimeTableCell.append(updateTimeContainer);

      const contactsTableCell = document.createElement('td');
      contactsTableCell.classList.add('tbody-cell', 'table-cell', 'tbody-cell-5');

      const contactsContainer = document.createElement('div');
      contactsContainer.classList.add('tbody-cell__contacts-container');

      const contactIconsList = {
        phone: [`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7">
        <circle cx="8" cy="8" r="8" fill="#9873FF"/>
        <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
        </g></svg>`, 'tel:'],
        email: [`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
        </svg>`, 'mailto:'],
        facebook: [`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
        </svg>`, ''],
        vk: [`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
        </svg>`, ''],
        twitter: [`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
        </svg>`, ''],
        other: [`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
        </svg>`, '']
      };

      if (client.contacts.length <= 4) {
        for (const contact of client.contacts) {
          const contactIcon = document.createElement('a');
          contactIcon.classList.add('tbody-cell__contact');

          const tooltip = document.createElement('div');
          tooltip.textContent = contact.value;
          tooltip.classList.add('contact-tooltip');

          contactIcon.innerHTML = contactIconsList[contact.type][0];
          contactIcon.href = `${contactIconsList[contact.type][1]}${contact.value}`;
          contactIcon.target = '_blank';

          contactIcon.append(tooltip);
          contactsContainer.append(contactIcon)
          contactsTableCell.append(contactsContainer);
        }
      } else {
        for (const contact of client.contacts) {
          if (client.contacts.indexOf(contact) === 4) {
            break;
          }

          const contactIcon = document.createElement('a');
          contactIcon.classList.add('tbody-cell__contact');

          const tooltip = document.createElement('div');
          tooltip.textContent = contact.value;
          tooltip.classList.add('contact-tooltip');

          contactIcon.innerHTML = contactIconsList[contact.type][0];
          contactIcon.href = `${contactIconsList[contact.type][1]}${contact.value}`;
          contactIcon.target = '_blank';

          contactIcon.append(tooltip);
          contactsContainer.append(contactIcon)
          contactsTableCell.append(contactsContainer);
        }

        const moreIcon = document.createElement('div');
        moreIcon.textContent = `+${client.contacts.length - 4}`;
        moreIcon.classList.add('tbody-cell__contact', 'tbody-cell__contact-more');

        const otherContacts = [];

        for (let i = 4; i < client.contacts.length; i++) {
          otherContacts.push(client.contacts[i]);
        }

        moreIcon.addEventListener('click', () => {
          moreIcon.remove();

          for (const contact of otherContacts) {
            const contactIcon = document.createElement('a');
            contactIcon.classList.add('tbody-cell__contact');

            const tooltip = document.createElement('div');
            tooltip.textContent = contact.value;
            tooltip.classList.add('contact-tooltip');

            contactIcon.innerHTML = contactIconsList[contact.type][0];
            contactIcon.href = `${contactIconsList[contact.type][1]}${contact.value}`;
            contactIcon.target = '_blank';

            contactIcon.append(tooltip);
            contactsContainer.append(contactIcon)
            contactsTableCell.append(contactsContainer);
          }
        })

        contactsContainer.append(moreIcon);
      }

      const actionsTableCell = document.createElement('td');
      actionsTableCell.classList.add('tbody-cell', 'table-cell', 'tbody-cell-6');

      const actionsContainer = document.createElement('div');
      actionsContainer.classList.add('tbody-cell__actions-container');

      const editBtn = document.createElement('div');
      editBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 9.49996V12H2.5L9.87333 4.62662L7.37333 2.12662L0 9.49996ZM11.8067 2.69329C12.0667 2.43329 12.0667 2.01329 11.8067 1.75329L10.2467 0.193291C9.98667 -0.066709 9.56667 -0.066709 9.30667 0.193291L8.08667 1.41329L10.5867 3.91329L11.8067 2.69329Z" fill="#9873FF"/>
      </svg>Изменить`;
      editBtn.classList.add('tbody-cell__edit-btn');
      const removeBtn = document.createElement('div');
      removeBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#F06A4D"/>
      </svg>Удалить`;
      removeBtn.classList.add('tbody-cell__remove-btn');

      editBtn.addEventListener('click', async () => {
        editBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg>Изменить`;
        editBtn.firstElementChild.classList.add('tbody-cell__edit-loading');

        if (await getClient(client.id)) {
          createModalWindow('edit', client.id);
          editBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 9.49996V12H2.5L9.87333 4.62662L7.37333 2.12662L0 9.49996ZM11.8067 2.69329C12.0667 2.43329 12.0667 2.01329 11.8067 1.75329L10.2467 0.193291C9.98667 -0.066709 9.56667 -0.066709 9.30667 0.193291L8.08667 1.41329L10.5867 3.91329L11.8067 2.69329Z" fill="#9873FF"/>
          </svg>Изменить`;
          editBtn.firstElementChild.classList.remove('tbody-cell__edit-loading');
        }
      });

      removeBtn.addEventListener('click', async () => {
        createModalWindow('remove', client.id);
      });


      actionsContainer.append(editBtn, removeBtn);
      actionsTableCell.append(actionsContainer);

      tableBody.append(tableRow);
      tableRow.append(idTableCell, nameTableCell, creationTimeTableCell, updateTimeTableCell, contactsTableCell, actionsTableCell);
    }

    const tableLoadingScreen = document.getElementById('table-loading');

    if (await getClientList()) {
      tableLoadingScreen.style.display = 'none';
      table.style.display = 'table';
    }

    const addClientBtn = document.createElement('button');
    addClientBtn.innerHTML = `<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z" fill="#9873FF"/>
    </svg>Добавить клиента`;
    addClientBtn.classList.add('add-client-btn', 'btn-reset');

    addClientBtn.addEventListener('click', () => {
      createModalWindow('add');
    });

    appMain.append(addClientBtn);

    return {
      tableBody,
      addClientBtn
    };
  }

  function createAddContactInput() {
    const contactInputItem = document.createElement('li');
    contactInputItem.classList.add('contact-input__item');

    const contactInputContainer = document.createElement('div');
    contactInputContainer.classList.add('contact-input__container');
    contactInputItem.append(contactInputContainer);

    const contactInputSelect = document.createElement('select');
    contactInputSelect.classList.add('contact-input__select');

    const contactTypeList = [
      ['Телефон', 'phone'],
      ['Другой телефон', 'phone'],
      ['E-mail', 'email'],
      ['Facebook', 'facebook'],
      ['VK', 'vk'],
      ['Twitter', 'twitter'],
    ];

    for (const type of contactTypeList) {
      const contactInputSelectOption = document.createElement('option');
      contactInputSelectOption.textContent = type[0];
      contactInputSelectOption.value = type[1];
      contactInputSelectOption.classList.add('contact-input__select-option');
      contactInputSelect.append(contactInputSelectOption);
    }

    const contactInputInput = document.createElement('input');
    contactInputInput.placeholder = 'Введите данные контакта';
    contactInputInput.classList.add('contact-input__input');

    const contactInputRemoveBtn = document.createElement('div');
    contactInputRemoveBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0"/>
    </svg>`;
    contactInputRemoveBtn.classList.add('contact-input__remove-btn');

    contactInputInput.addEventListener('input', (e) => {
      if (!e.target.value) {
        contactInputRemoveBtn.remove();
      } else {
        contactInputContainer.append(contactInputRemoveBtn);
      }

      // const saveBtn = document.getElementById('form-btn');

      // if (isContactValidated(contactInputInput, contactInputSelect.value)) {
      //   saveBtn.removeAttribute('disabled');
      // } else {
      //   saveBtn.disabled = true;
      // }
    });

    contactInputContainer.append(contactInputSelect, contactInputInput);
    contactInputItem.append(contactInputContainer);

    return {
      item: contactInputItem,
      inputs: {
        contactInputSelect,
        contactInputInput
      },
      container: contactInputContainer,
      remove: contactInputRemoveBtn,
    };
  }

  function createAddForm() {
    const modalWindow = document.getElementById('modal-window');

    const modalAddForm = document.createElement('form');

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Новый клиент';
    formTitle.classList.add('add-form__title');

    const formSurnameInput = document.createElement('input');
    formSurnameInput.type = 'text';
    formSurnameInput.placeholder = 'Фамилия*';
    formSurnameInput.classList.add('add-form__input');

    const formNameInput = document.createElement('input');
    formNameInput.type = 'text';
    formNameInput.placeholder = 'Имя*';
    formNameInput.classList.add('add-form__input');

    const formLastnameInput = document.createElement('input');
    formLastnameInput.type = 'text';
    formLastnameInput.placeholder = 'Отчество';
    formLastnameInput.classList.add('add-form__input');

    const inputList = [
      formSurnameInput,
      formNameInput,
    ];

    const addContactsContainer = document.createElement('div');
    addContactsContainer.classList.add('add-form__contacts-container');

    const contactInputsList = document.createElement('ul');
    contactInputsList.classList.add('contact__inputs-list', 'list-reset');
    contactInputsList.style.marginBottom = '25px';
    contactInputsList.style.display = 'none';

    const addContactsBtn = document.createElement('div');
    addContactsBtn.classList.add('add-form__contacts-btn');
    addContactsBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.99998 3.66659C6.63331 3.66659 6.33331 3.96659 6.33331 4.33325V6.33325H4.33331C3.96665 6.33325 3.66665 6.63325 3.66665 6.99992C3.66665 7.36659 3.96665 7.66659 4.33331 7.66659H6.33331V9.66659C6.33331 10.0333 6.63331 10.3333 6.99998 10.3333C7.36665 10.3333 7.66665 10.0333 7.66665 9.66659V7.66659H9.66665C10.0333 7.66659 10.3333 7.36659 10.3333 6.99992C10.3333 6.63325 10.0333 6.33325 9.66665 6.33325H7.66665V4.33325C7.66665 3.96659 7.36665 3.66659 6.99998 3.66659ZM6.99998 0.333252C3.31998 0.333252 0.333313 3.31992 0.333313 6.99992C0.333313 10.6799 3.31998 13.6666 6.99998 13.6666C10.68 13.6666 13.6666 10.6799 13.6666 6.99992C13.6666 3.31992 10.68 0.333252 6.99998 0.333252ZM6.99998 12.3333C4.05998 12.3333 1.66665 9.93992 1.66665 6.99992C1.66665 4.05992 4.05998 1.66659 6.99998 1.66659C9.93998 1.66659 12.3333 4.05992 12.3333 6.99992C12.3333 9.93992 9.93998 12.3333 6.99998 12.3333Z" fill="#9873FF"/>
    </svg>Добавить контакт`;

    const errorMessage = document.createElement('p');
    errorMessage.style.display = 'none';
    errorMessage.id = 'error-message';
    errorMessage.classList.add('add-form__error');

    const saveBtn = document.createElement('button');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Отправить';
    saveBtn.id = 'form-btn';
    saveBtn.classList.add('add-form__save-btn', 'btn-reset');

    const cancelBtn = document.createElement('div');
    cancelBtn.textContent = 'Отмена';
    cancelBtn.classList.add('add-form__cancel-btn');

    const contactItems = [];

    addContactsBtn.addEventListener('click', () => {
      contactInputsList.style.display = 'flex';
      if (document.documentElement.clientWidth >= 767) {
        addContactsContainer.style.padding = '25px 30px';
      } else {
        addContactsContainer.style.padding = '25px 15px';
      }

      saveBtn.disabled = true;

      const contactInput = createAddContactInput();
      contactInputsList.append(contactInput.item);

      contactItems.push(contactInput);

      contactInput.inputs.contactInputInput.addEventListener('input', () => {
        const formValid = isFormValidated(inputList, contactItems);

        if (formValid.isValid) {
          saveBtn.removeAttribute('disabled');
        } else {
          saveBtn.disabled = true;
        }
      })

      if (contactItems.length === 10) {
        addContactsBtn.style.display = 'none';
        contactInputsList.style.marginBottom = '0';
      }

      contactInput.remove.addEventListener('click', () => {
        contactInput.item.remove();

        contactItems.splice(contactItems.indexOf(contactInput), 1);

        const formValid = isFormValidated(inputList, contactItems);

        if (formValid.isValid) {
          saveBtn.removeAttribute('disabled');
        } else {
          saveBtn.disabled = true;
        }

        errorMessage.style.display = 'none';

        if (contactItems.length < 10) {
          addContactsBtn.style.display = 'block';
          contactInputsList.style.marginBottom = '25px';
        }

        if (!contactItems.length) {
          contactInputsList.style.display = 'none';
          addContactsContainer.style.padding = null;
        }
      });
    });

    cancelBtn.addEventListener('click', () => {
      document.getElementById('crm-modal').style.display = 'none';
      document.getElementById('modal-window').remove();
    });

    addContactsContainer.append(contactInputsList, addContactsBtn);

    formSurnameInput.addEventListener('input', () => {
      if (isFormValidated(inputList, contactItems).isValid) {
        saveBtn.removeAttribute('disabled');
      } else {
        saveBtn.disabled = true;
      }
    });

    formNameInput.addEventListener('input', () => {
      if (isFormValidated(inputList, contactItems).isValid) {
        saveBtn.removeAttribute('disabled');
      } else {
        saveBtn.disabled = true;
      }
    });

    modalAddForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const contactList = [];

      for (const item of contactItems) {
        contactList.push({
          type: item.inputs.contactInputSelect.value,
          value: item.inputs.contactInputInput.value.trim()
        });
      }

      const clientObj = {
        name: formatName(formNameInput.value.trim()),
        surname: formatName(formSurnameInput.value.trim()),
        lastName: formatName(formLastnameInput.value.trim()),
        contacts: contactList
      };

      await addClient(clientObj);

      document.getElementById('crm-modal').style.display = 'none';
      document.getElementById('modal-window').remove();
      document.getElementById('crm-main').innerHTML = '';
      createMainSection();
    });

    modalAddForm.append(formTitle, formSurnameInput, formNameInput, formLastnameInput, addContactsContainer, errorMessage, saveBtn, cancelBtn);
    modalWindow.append(modalAddForm);
  }

  async function createEditForm(clientId) {
    const currentClientObj = await getClient(clientId);
    const contactList = currentClientObj.contacts.length ? currentClientObj.contacts : [];

    const modalWindow = document.getElementById('modal-window');

    const modalAddForm = document.createElement('form');

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Изменение данных';
    formTitle.classList.add('edit-form__title');

    const formTitleId = document.createElement('span');
    formTitleId.textContent = `ID: ${currentClientObj.id}`;
    formTitleId.classList.add('edit-form__title-id');

    const formSurnameInputLabel = document.createElement('label');
    formSurnameInputLabel.innerHTML = 'Фамилия<span class="label-star">*</span>';
    formSurnameInputLabel.for = 'surname-input';
    formSurnameInputLabel.classList.add('edit-form__input-label');

    const formSurnameInput = document.createElement('input');
    formSurnameInput.id = 'surname-input';
    formSurnameInput.type = 'text';
    formSurnameInput.value = currentClientObj.surname;
    formSurnameInput.classList.add('edit-form__input');

    const formNameInputLabel = document.createElement('label');
    formNameInputLabel.innerHTML = 'Имя<span class="label-star">*</span>';
    formNameInputLabel.for = 'name-input';
    formNameInputLabel.classList.add('edit-form__input-label');

    const formNameInput = document.createElement('input');
    formNameInput.id = 'name-input';
    formNameInput.type = 'text';
    formNameInput.value = currentClientObj.name;
    formNameInput.classList.add('edit-form__input');

    const formLastnameInputLabel = document.createElement('label');
    formLastnameInputLabel.innerHTML = 'Отчество';
    formLastnameInputLabel.for = 'lastname-input';
    formLastnameInputLabel.classList.add('edit-form__input-label');

    const formLastnameInput = document.createElement('input');
    formLastnameInput.id = 'lastname-input';
    formLastnameInput.type = 'text';
    formLastnameInput.value = currentClientObj.lastName;
    formLastnameInput.classList.add('edit-form__input');

    const inputList = [
      formSurnameInput,
      formNameInput,
    ];

    const addContactsContainer = document.createElement('div');
    addContactsContainer.classList.add('edit-form__contacts-container');

    const contactInputsList = document.createElement('ul');
    contactInputsList.classList.add('contact__inputs-list', 'list-reset');
    contactInputsList.style.marginBottom = '25px';
    contactInputsList.style.display = 'none';

    const addContactsBtn = document.createElement('div');
    addContactsBtn.classList.add('edit-form__contacts-btn');
    addContactsBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.99998 3.66659C6.63331 3.66659 6.33331 3.96659 6.33331 4.33325V6.33325H4.33331C3.96665 6.33325 3.66665 6.63325 3.66665 6.99992C3.66665 7.36659 3.96665 7.66659 4.33331 7.66659H6.33331V9.66659C6.33331 10.0333 6.63331 10.3333 6.99998 10.3333C7.36665 10.3333 7.66665 10.0333 7.66665 9.66659V7.66659H9.66665C10.0333 7.66659 10.3333 7.36659 10.3333 6.99992C10.3333 6.63325 10.0333 6.33325 9.66665 6.33325H7.66665V4.33325C7.66665 3.96659 7.36665 3.66659 6.99998 3.66659ZM6.99998 0.333252C3.31998 0.333252 0.333313 3.31992 0.333313 6.99992C0.333313 10.6799 3.31998 13.6666 6.99998 13.6666C10.68 13.6666 13.6666 10.6799 13.6666 6.99992C13.6666 3.31992 10.68 0.333252 6.99998 0.333252ZM6.99998 12.3333C4.05998 12.3333 1.66665 9.93992 1.66665 6.99992C1.66665 4.05992 4.05998 1.66659 6.99998 1.66659C9.93998 1.66659 12.3333 4.05992 12.3333 6.99992C12.3333 9.93992 9.93998 12.3333 6.99998 12.3333Z" fill="#9873FF"/>
    </svg>Добавить контакт`;

    const contactItems = [];

    if (contactList.length) {
      contactInputsList.style.display = 'flex';
      if (document.documentElement.clientWidth >= 767) {
        addContactsContainer.style.padding = '25px 30px';
      } else {
        addContactsContainer.style.padding = '25px 15px';
      }

      for (const contact of contactList) {
        const contactInput = createAddContactInput();
        contactInput.inputs.contactInputSelect.value = contact.type;
        contactInput.inputs.contactInputInput.value = contact.value;
        contactInput.container.append(contactInput.remove);
        contactInputsList.append(contactInput.item);

        contactItems.push(contactInput);

        if (contactItems.length === 10) {
          addContactsBtn.style.display = 'none';
          contactInputsList.style.marginBottom = '0';
        }

        contactInput.remove.addEventListener('click', () => {
          contactInput.item.remove();

          contactItems.splice(contactItems.indexOf(contactInput), 1);

          if (contactItems.length < 10) {
            addContactsBtn.style.display = 'block';
            contactInputsList.style.marginBottom = '25px';
          }

          if (!contactItems.length) {
            contactInputsList.style.display = 'none';
            addContactsContainer.style.padding = null;
          }
        });
      }

      contactList.splice(0, contactList.length);
    }

    addContactsBtn.addEventListener('click', () => {
      contactInputsList.style.display = 'flex';
      if (document.documentElement.clientWidth >= 767) {
        addContactsContainer.style.padding = '25px 30px';
      } else {
        addContactsContainer.style.padding = '25px 15px';
      }

      saveBtn.disabled = true;

      const contactInput = createAddContactInput();
      contactInputsList.append(contactInput.item);

      contactItems.push(contactInput);

      contactInput.inputs.contactInputInput.addEventListener('input', () => {
        const formValid = isFormValidated(inputList, contactItems);

        if (formValid.isValid) {
          saveBtn.removeAttribute('disabled');
        } else {
          saveBtn.disabled = true;
        }
      })

      if (contactItems.length === 10) {
        addContactsBtn.style.display = 'none';
        contactInputsList.style.marginBottom = '0';
      }

      contactInput.remove.addEventListener('click', () => {
        contactInput.item.remove();

        contactItems.splice(contactItems.indexOf(contactInput), 1);

        const formValid = isFormValidated(inputList, contactItems);

        if (formValid.isValid) {
          saveBtn.removeAttribute('disabled');
        } else {
          saveBtn.disabled = true;
        }

        errorMessage.style.display = 'none';

        if (contactItems.length < 10) {
          addContactsBtn.style.display = 'block';
          contactInputsList.style.marginBottom = '25px';
        }

        if (!contactItems.length) {
          contactInputsList.style.display = 'none';
          addContactsContainer.style.padding = null;
        }
      });
    });

    const errorMessage = document.createElement('p');
    errorMessage.style.display = 'none';
    errorMessage.id = 'error-message';
    errorMessage.classList.add('edit-form__error');

    const saveBtn = document.createElement('button');
    saveBtn.id = 'form-btn';
    saveBtn.textContent = 'Сохранить';
    saveBtn.classList.add('edit-form__save-btn', 'btn-reset');

    const deleteBtn = document.createElement('div');
    deleteBtn.textContent = 'Удалить клиента';
    deleteBtn.classList.add('edit-form__delete-btn');

    deleteBtn.addEventListener('click', async () => {
      await deleteClient(currentClientObj.id);

      document.getElementById('crm-modal').style.display = 'none';
      document.getElementById('modal-window').remove();

      document.getElementById('crm-main').innerHTML = '';
      createMainSection();
    });

    addContactsContainer.append(contactInputsList, addContactsBtn);

    formSurnameInput.addEventListener('input', () => {
      if (isFormValidated(inputList, contactItems).isValid) {
        saveBtn.removeAttribute('disabled');
      } else {
        saveBtn.disabled = true;
      }
    });

    formNameInput.addEventListener('input', () => {
      if (isFormValidated(inputList, contactItems).isValid) {
        saveBtn.removeAttribute('disabled');
      } else {
        saveBtn.disabled = true;
      }
    });

    modalAddForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      saveBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.00008 6.03996C1.00008 8.82344 3.2566 11.08 6.04008 11.08C8.82356 11.08 11.0801 8.82344 11.0801 6.03996C11.0801 3.25648 8.82356 0.999956 6.04008 0.999956C5.38922 0.999956 4.7672 1.1233 4.196 1.348" stroke="#B89EFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
      </svg>Сохранить`;

      for (const item of contactItems) {
        contactList.push({
          type: item.inputs.contactInputSelect.value,
          value: item.inputs.contactInputInput.value.trim()
        });
      }

      const clientObj = {
        ...currentClientObj,
        name: formatName(formNameInput.value.trim()),
        surname: formatName(formSurnameInput.value.trim()),
        lastName: formatName(formLastnameInput.value.trim()),
        contacts: contactList
      };

      if (await getClient(clientObj.id)) {
        await updateClient(clientObj)

        document.getElementById('crm-modal').style.display = 'none';
        document.getElementById('modal-window').remove();

        document.getElementById('crm-main').innerHTML = '';
        createMainSection();
      };
    });

    modalAddForm.append(formTitle, formTitleId, formSurnameInputLabel, formSurnameInput, formNameInputLabel, formNameInput, formLastnameInputLabel, formLastnameInput, addContactsContainer, errorMessage, saveBtn, deleteBtn);
    modalWindow.append(modalAddForm);
  }

  function createDeleteConfirm(clientId) {
    const appModal = document.getElementById('crm-modal');
    const modalWindow = document.getElementById('modal-window');

    const title = document.createElement('h2');
    title.textContent = 'Удалить клиента';
    title.classList.add('delete-confirm__title');

    const description = document.createElement('p');
    description.textContent = 'Вы действительно хотите удалить данного клиента?';
    description.classList.add('delete-confirm__descr');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.classList.add('delete-confirm__delete-btn', 'btn-reset');

    deleteBtn.addEventListener('click', async () => {
      await deleteClient(clientId);

      appModal.style.display = 'none';
      modalWindow.remove();

      document.getElementById('crm-main').innerHTML = '';
      createMainSection();
    });

    const cancelBtn = document.createElement('div');
    cancelBtn.textContent = 'Отмена';
    cancelBtn.classList.add('delete-confirm__cancel-btn');

    cancelBtn.addEventListener('click', () => {
      appModal.style.display = 'none';
      modalWindow.remove();
    });

    modalWindow.append(title, description, deleteBtn, cancelBtn);
  }

  function createModalWindow(action, clientId) {
    const appModal = document.getElementById('crm-modal');
    appModal.style.display = 'block';

    const modalWindow = document.createElement('div');
    modalWindow.id = 'modal-window';
    modalWindow.classList.add('modal-window');
    modalWindow.classList.remove('modal-window__delete')

    const closeBtn = document.createElement('img');
    closeBtn.src = 'sources/modal-close.svg';
    closeBtn.classList.add('modal-close-btn');

    appModal.addEventListener('click', (e) => {
      if (e.target === appModal) {
        appModal.style.display = 'none';
        modalWindow.remove();
      }
    });

    closeBtn.addEventListener('click', () => {
      appModal.style.display = 'none';
      modalWindow.remove();
    });

    modalWindow.append(closeBtn);
    appModal.append(modalWindow);

    if (action === 'add') {
      createAddForm();
    } else if (action === 'edit') {
      createEditForm(clientId);
    } else if (action === 'remove') {
      createDeleteConfirm(clientId);
      modalWindow.classList.add('modal-window__delete');
    }
  }

  async function createCRMApp() {
    createHeaderSection();
    createMainSection();
  }

  window.createCRMApp = createCRMApp;
})()
