// В Этом файле необходимо описать всю логику работы проекта в т.ч. все функции и переменные

// Объект с настройками игры
const gameParameters = {
    MAX_LEVEL: 10, //Максимальный уровень героя
    MAX_STAT: 99, //Максимальный уровень параметра героя
    MIN_STAT: 10, //Минимальный уровень параметра для умения
}

// Объект классов игры
const gameClasses = {
    Mage: "Маг",
    Knight: "Рыцарь",
    Hero: "Класс"
}

// Объявление героя игрока
let playerHero = null;

// Объявление героя оппонента
let enemyHero = null;

// ---------------------- Нахоим интерактивные кнопки

// Теперь найдём все интерактивные кнопки в проекте и сохраним их в переменные.
// Процесс тебе уже знаком: объявляем переменную и записываем в неё то, 
// что вернёт функция getElementById() с соответствующим id в виде строки.

//кнопка отправки на танцпол
// Добавление героя игрока на экран (ОТПРАВИТЬ НА ТАНЦПОЛ)
const sendToBattleButton = document.getElementById("sendToBattleButton");

// кнопка подбора противника в карточке Герой оппонента
// Вывод героя оппонента на экран (ПОЛУЧИТЬ ГЕРОЯ)
const getEnemyButton = document.getElementById("getEnemyButton");

// кнопка использования дополнительного умения персонажа в карточке Ваш герой
// Действие героя игрока (ДОПОЛНИТЕЛЬНОЕ УМЕНИЕ)
const doSkillButton = document.getElementById("doSkillButton");

//а кнопку НАЧАТЬ БАТТЛ! под карточками персонажей — так:
// Начало баттла
const startBattleButton = document.getElementById("startBattleButton");


// ---------------------- Установка слушателя события click

// Раньше мы бы написали с тобой так:
// function logClick() {
//     console.log("Произошёл click");
// }
// sendToBattleButton.onclick = logClick;

//Но сейчас мы тебе расскажем об очень крутой фишке в JS, которая позволит написать этот код короче
// и без использования отдельных функций как logClick()
// В коде на прошлых неделях можно было заметить стрелочные функции 
//(функции с особым синтаксисом), одна из них выглядела так:
// const makeSomeOtherThing = () => { /*Тело функции*/ } 


// ----------------------Собираем информацию о характеристиках, которые ввёл пользователь

// Получаем информацию о герое игрока
sendToBattleButton.onclick = () => {
    console.log("Произошёл click");     // убрать после тестирования
    const heroName = document.getElementById("name").value;
    if (heroName !== "") {
        const heroClass = document.querySelector('input[name="class"]:checked').value;
        const heroLevel = document.getElementById("level").value;
        const heroStats = {};

        // Если введённое значение параметра больше максимального, устанавливаем максимальное
        heroStats.str = Number(document.getElementById("strength").value);
        if (heroStats.str > gameParameters.MAX_STAT) {
            heroStats.str = gameParameters.MAX_STAT
        }
        heroStats.int = Number(document.getElementById("intelligence").value);
        if (heroStats.int > gameParameters.MAX_STAT) {
            heroStats.int = gameParameters.MAX_STAT
        }
        heroStats.agi = Number(document.getElementById("agility").value);
        if (heroStats.agi > gameParameters.MAX_STAT) {
            heroStats.agi = gameParameters.MAX_STAT
        }

        const additionalAbility = document.querySelector('input[name="additionalAbility"]:checked').value;
        const additionalStat = document.getElementById("additionalStat").value;

        if (heroClass === "Mage") {
            playerHero = new Mage(heroName, heroLevel, 100, heroStats, additionalAbility, additionalStat);
        } else if (heroClass === "Knight") {
            playerHero = new Knight(heroName, heroLevel, 100, heroStats, additionalAbility, additionalStat);
        } else {
            console.error("Упс! Произошла какая-то ошибка!")
            return;
        }

        displayPlayerHero(playerHero);

        function addImg() {
            const playerHeroClass = document.getElementById("playerHeroClass")
            if (heroClass === 'Mage') {
                playerHeroClass.innerHTML = "🔮 МАГ 🔮";
            }
            else if (heroClass === 'Knight') {
                playerHeroClass.innerHTML = "🗡 РЫЦАРЬ 🗡";
            }
        }

        //Запуск метода добавления тематических изображений в карточку
        addImg();

        // Снимаем блок с кнопок для дальнейшего взаимодействия 
        getEnemyButton.removeAttribute("disabled");
        doSkillButton.removeAttribute("disabled")
    } else {
        alert("Добавьте герою имя!")
    }

}


// Выводим героя игрока на экран
function displayPlayerHero(hero) {
    document.getElementById("playerHeroClass").innerHTML = gameClasses[hero.constructor.name];
    document.getElementById("playerHeroName").innerHTML = hero.name;
    document.getElementById("playerHeroLevel").innerHTML = hero.level;
    document.getElementById("playerHeroHp").innerHTML = hero.healthPoints;
    document.getElementById("playerHeroStrength").innerHTML = hero.stats.str;
    document.getElementById("playerHeroIntelligence").innerHTML = hero.stats.int;
    document.getElementById("playerHeroAgility").innerHTML = hero.stats.agi;



    hero.displayHero();
}

// ---------------------------ОПОНЕНТ---------------------------------
// По аналогии напишем анонимную функцию для получения оппонента
getEnemyButton.onclick = () => {
    // Получаем героя оппонента с сервера
    fetch(`https://api-code.practicum-team.ru/heroes`)
        // Обрабатываем ответ сервера
        .then((response) => response.json())
        .then((data) => {
            // Смотрим на данные в консоли
            console.log(data);
            // Получаем случайного героя оппонента
            let randomEnemy = data[Math.floor(Math.random() * data.length)];
            // Выводим героя оппонента в консоль
            console.log(randomEnemy);

            // Создаём экземпляр класса героя оппонента 
            // и сохраняем его в переменную enemyHero
            enemyHero = new Hero(
                // Имя героя
                randomEnemy.title,
                // Уровень героя
                Math.floor(Math.random() * 10) + 1,
                // Запас сил героя
                randomEnemy.hp,
                // Параметры героя
                {
                    str: randomEnemy.str,
                    int: randomEnemy.int,
                    agi: randomEnemy.agi,
                }
            );

            // Заполняем карточку героя оппонента
            displayEnemyHero(enemyHero);

            // Если есть два участника, снимаем блок с кнопки
            if (playerHero) {
                startBattleButton.removeAttribute("disabled");
            }

        })
        // В случае ошибки запроса выводим сообщение об ошибке в консоль 
        .catch((error) => console.error("Ошибка:", error));
};



function displayEnemyHero(hero) {
    document.getElementById("enemyHeroClass").innerHTML = gameClasses[hero.constructor.name];
    document.getElementById("enemyHeroName").innerHTML = hero.name;
    document.getElementById("enemyHeroLevel").innerHTML = hero.level;
    document.getElementById("enemyHeroHp").innerHTML = hero.healthPoints;
    document.getElementById("enemyHeroStrength").innerHTML = hero.stats.str;
    document.getElementById("enemyHeroIntelligence").innerHTML = hero.stats.int;
    document.getElementById("enemyHeroAgility").innerHTML = hero.stats.agi;

    hero.displayHero();
}


// ------------------------------Определяем победителя

//Подсчёт характеристик
function countStatsSum(hero) {
    let statsSum = 0;
    // Последовательно прибавляем в переменную statsSum значения характеристик из объекта hero
    statsSum += hero.stats.str;
    statsSum += hero.stats.int;
    statsSum += hero.stats.agi;
    statsSum += hero.healthPoints;

    return statsSum;
}


// Определяем участников


function arena(firstHero, secondHero) {
    console.log(`Да начнётся танцевальный баттл между ${firstHero.name} и ${secondHero.name}!`);
    alert(`Да начнётся танцевальный баттл между ${firstHero.name} и ${secondHero.name}!`);

    let winner = null;

    let fistHeroSum = countStatsSum(firstHero);
    let secondHeroSum = countStatsSum(secondHero);

    console.log("Сумма значений параметров первого героя: ", fistHeroSum);
    console.log("Сумма значений параметров второго героя: ", secondHeroSum);

    alert(`Сумма значений ${firstHero.name}: ${fistHeroSum}, а сумма значений ${secondHero.name}: ${secondHeroSum}!`);

    if (fistHeroSum > secondHeroSum) {
        winner = firstHero;

    } else if (fistHeroSum < secondHeroSum) {
        winner = secondHero;
    }

    if (winner) {
        console.log(`Ритмично чествуем победителя: ${winner.name}`);
        alert(`Ритмично чествуем победителя: ${winner.name}`);
    } else {
        console.log("В танцевальном баттле победила дружба!");
        alert("В танцевальном баттле победила дружба!");
    }
}

startBattleButton.onclick = () => {
    arena(playerHero, enemyHero);
};



// ------------------------------Доп.способности--------------------
doSkillButton.onclick = () => {
    if (playerHero) {
        if (playerHero.constructor.name === "Mage") {
            playerHero.healHero(playerHero);
        } else if (playerHero.constructor.name === "Knight") {
            playerHero.gainAgility(playerHero);
        } else {
            console.log("Упс! Произошла какая-то ошибка!");
        }
    } else {
        alert("Сначала добавьте игрока!");
    }
    displayPlayerHero(playerHero);
};



// Мусор

//Функция добавления в карточку героя пиктограммы героя

//       const dataHeroes = document.querySelector('[data-heroes="my"]');



// const card = document.querySelector('.card');
// console.log(card)

