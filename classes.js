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
}

//дочерний класс героя-рыцаря
class Knight extends Hero {
    //конструктор дочернего класса
    constructor(name, level, healthPoints, stats, isHorseTango, energy) {
        super(name, level, healthPoints, stats);
        this.isHorseTango = isHorseTango; // может танцевать танго на коне

        //показатель усталостии героя,
        // где 1 - герой не устал, gameParameters.MAX_STAT - герой устал и не может делиться защитой
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
}
