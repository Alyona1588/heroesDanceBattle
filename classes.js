// В Этом файле необходимо описать все классы которые будут использоваться в проекте

//базовый класс героя
class Hero {
    //конструктор базового класса
    constructor(name, level, healthPoints, stats) {
        this.name = name; //имя
        this.level = level; //уровень
        this.healthPoints = healthPoints; //жизненные силы
        this.stats = stats; //параметры
    }

    //метод, отвечающий за вывод информации о герое в консоль
    displayHero() {
        const heroInfo =
            `Имя: ${this.name}` +
            `\nУровень: ${this.level}` +
            `\nЖизненные силы: ${this.healthPoints}` +
            `\nСила: ${this.stats.str}` +
            `\nИнтеллект: ${this.stats.int}` +
            `\nЛовкость: ${this.stats.agi}`;

        console.log(heroInfo);
    }
}


//дочерний класс героя-мага
class Mage extends Hero {
    //конструктор дочернего класса
    constructor(name, level, healthPoints, stats, hasTectonicPotion, mana) {
        super(name, level, healthPoints, stats);
        this.hasTectonicPotion = hasTectonicPotion; // зелье для тектоника
        this.mana = mana; // мана мага
    }

    //метод, расширяющий метод базового класса
    displayHero() {
        super.displayHero();

        console.log(`Мана: ${this.mana}`);

        if (this.hasTectonicPotion === "true") {
            console.log("Есть зелье для тектоника");
        }
    }
    // Метод лечения героя у класса Mage
    healHero(hero) {
        if (this.mana > gameParameters.MIN_STAT) {
            // Значение лечения рассчитывается относительно уровня
            const healAmount = this.mana * 10;

            hero.healthPoints += healAmount;
            console.log("Маг продлевает танец " + hero.name + " на " + healAmount + " единиц.");

            // Трата маны пропорционально уровню героя
            this.mana = 0;
        } else {
            alert("Недостаточно маны...");
        }
    }
}

//дочерний класс героя-рыцаря
class Knight extends Hero {
    //конструктор дочернего класса
    constructor(name, level, healthPoints, stats, isHorseTango, energy) {
        super(name, level, healthPoints, stats);
        this.isHorseTango = isHorseTango; // может танцевать танго на коне

        //показатель усталостии героя,
        // где 1 - герой устал и не может делиться защитой, gameParameters.MAX_STAT - герой не устал,
        this.energy = energy;
    }

    //вариативный метод, расширяющий метод базового класса
    displayHero() {
        super.displayHero();

        console.log(`Энергия: ${this.energy}`);

        if (this.isHorseTango === "true") {
            console.log("Этот герой может танцевать танго на коне");
        }
    }

    // Метод увеличения ловкости героя у класса Knight
    gainAgility(hero) {
        if (this.energy > gameParameters.MIN_STAT) {
            // Количество увеличения ловкости
            const gainAmount = (this.level * this.energy) / 30;

            // Если при увеличении значение ловкости не превысит максимальное,
            // увеличиваем ловкость, иначе устанавливаем максимальное значение

            if (hero.stats.agi + gainAmount < gameParameters.MAX_STAT) {
                hero.stats.agi += gainAmount;
                console.log(this.name + " увеличивает ловкость " + hero.name + " на " + gainAmount + " единиц.");
            } else {
                hero.stats.agi = gameParameters.MAX_STAT;
            }

            // Уменьшение энергии пропорционально уровню героя
            const energyAmount = (gainAmount * 10) / this.level;
            if (this.energy - energyAmount > gameParameters.MIN_STAT) {
                this.energy -= energyAmount;
            } else {
                this.energy = gameParameters.MIN_STAT;
            }

            displayPlayerHero(playerHero);
        } else {
            alert("Недостаточно энергии...");
        }
    }

}
