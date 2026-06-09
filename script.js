const menuData = {
  cards: ['Stoat', 'Bullfrog', 'Wolf', 'Elk', 'Coyote'],
  sigils: ['Mighty Leap', 'Hoarder', 'Fecundity', 'Airborne'],
  characters: ['Luke Carder', 'Leshy', 'P03', 'Grimora', 'Magnificus'],
  items: ['Pliers', 'Squirrel in a Bottle', 'Boulder in a Bottle', 'Scissors'],
  locations: ['The Cabin', 'Leshy\'s Territory', 'P03\'s Factory']
};

const listContainer = document.querySelector('.catalogue-menu');

// 1. Сохраняем начальный HTML главного меню в переменную при первой загрузке страницы
const mainMenuHTML = listContainer.innerHTML;

listContainer.addEventListener('click', (event) => {
  // Находим кнопку, по которой кликнули (или её родителя <a>)
  const clickedBtn = event.target.closest('.catalogue-menu-button');
  if (!clickedBtn) return;

  // Проверяем, кликнули ли по кнопке "Back" или по категории из объекта menuData
  const isBackBtn = clickedBtn.id === 'back-btn';
  const isCategoryBtn = menuData[clickedBtn.id];

  // Если это не "Back" и не категория из списка (например, подпункт вроде 'Stoat'), ничего не делаем
  if (!isBackBtn && !isCategoryBtn) return;

  // Применяем ваши стили для контейнера
  cataloguebox = document.querySelector('.catalogue');
  cataloguemenu = document.querySelector('.catalogue-menu');

  cataloguebox.style = 'margin-top: 0px; gap: 10px';
  cataloguemenu.style = 'height: 400px';


  const items = document.querySelectorAll('.catalogue-menu-button');
  
  // 2. Анимация исчезновения текущих элементов: снизу вверх
  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('none');
    }, (items.length - 1 - index) * 100);
  });

  const totalFadeOutTime = (items.length * 100) + 400; 

  // 3. Смена содержимого (после полного исчезновения старого)
  setTimeout(() => {
    listContainer.innerHTML = ''; // Полностью очищаем список

    if (isBackBtn) {
      cataloguebox.style = 'gap: 50px';
      cataloguemenu.style = 'height: 240px';

      // --- ВОЗВРАТ В ГЛАВНОЕ МЕНЮ ---
      // Временно вставляем скрытый дефолтный HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = mainMenuHTML;
      
      const defaultButtons = tempDiv.querySelectorAll('.catalogue-menu-button');
      
      defaultButtons.forEach((btn, index) => {
        btn.classList.add('none'); // Изначально скрываем для анимации
        
        setTimeout(() => {
          listContainer.appendChild(btn);
          requestAnimationFrame(() => {
            btn.classList.remove('none');
          });
        }, index * 100); // Появление сверху вниз
      });

    } else {
      // --- ПЕРЕХОД В ПОДМЕНЮ (Cards, Sigils...) ---
      const currentId = clickedBtn.id;
      const newItems = menuData[currentId];

      // Сначала создаем и добавляем кнопку "Back" на самый верх
      const backBtn = document.createElement('a');
      backBtn.id = 'back-btn';
      backBtn.className = 'catalogue-menu-button plaintext backlist none';
      backBtn.innerHTML = `
        <p class="plaintext">← Back</p>
      `;
      
      setTimeout(() => {
        listContainer.appendChild(backBtn);
        requestAnimationFrame(() => { backBtn.classList.remove('none'); });
      }, 0); // Появляется первой

      // Затем создаем и анимируем остальные пункты подкатегории
      newItems.forEach((text, index) => {
        const a = document.createElement('a');
        a.className = `catalogue-menu-button yellowbox plaintext ${currentId}list none`; 
        a.innerHTML = `
          <img class="list-icon" src="img/${text}.webp">
          <p class="plaintext">${text}</p>
        `;
        
        // Индекс + 1, чтобы дать задержку после кнопки "Back"
        setTimeout(() => {
          listContainer.appendChild(a);
          requestAnimationFrame(() => {
            a.classList.remove('none');
          });
        }, (index + 1) * 100); // Появление сверху вниз вслед за "Back"
      });
    }

  }, totalFadeOutTime); 
});