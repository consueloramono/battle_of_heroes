// Enum для типів героїв
enum HeroType {
    Warrior = "WARRIOR",
    Mage = "MAGE",
    Archer = "ARCHER"
}

// Enum для типів атак
enum AttackType {
    Physical = "PHYSICAL",
    Magical = "MAGICAL",
    Ranged = "RANGED"
}

// Interface для характеристик героя
interface HeroStats {
    health: number;
    attack: number;
    defense: number;
    speed: number;
}

// Interface для героя
interface Hero {
    id: number;
    name: string;
    type: HeroType;
    attackType: AttackType;
    stats: HeroStats;
    isAlive: boolean;
}

// Type для результату атаки
type AttackResult = {
    damage: number;
    isCritical: boolean;
    remainingHealth: number;
}

// Лічильник для унікальних ідентифікаторів героїв
let heroIdCounter = 1;

// Функція створення нового героя
function createHero(name: string, type: HeroType): Hero {
    // Встановлюємо базові характеристики залежно від типу героя
    let stats: HeroStats;
    let attackType: AttackType;

    switch (type) {
        case HeroType.Warrior:
            stats = { health: 120, attack: 30, defense: 20, speed: 10 };
            attackType = AttackType.Physical;
            break;
        case HeroType.Mage:
            stats = { health: 80, attack: 40, defense: 10, speed: 15 };
            attackType = AttackType.Magical;
            break;
        case HeroType.Archer:
            stats = { health: 100, attack: 35, defense: 15, speed: 20 };
            attackType = AttackType.Ranged;
            break;
        default:
            throw new Error("Unknown hero type");
    }

    return {
        id: heroIdCounter++,
        name,
        type,
        attackType,
        stats,
        isAlive: true
    };
}

// Функція розрахунку пошкодження
function calculateDamage(attacker: Hero, defender: Hero): AttackResult {
    // Базове пошкодження з урахуванням атаки та захисту
    let damage = attacker.stats.attack - defender.stats.defense;
    if (damage < 0) damage = 0;

    // Шанс критичного удару (20%)
    const isCritical = Math.random() < 0.2;
    if (isCritical) {
        damage *= 2;
    }

    // Зменшуємо здоров'я захисника
    defender.stats.health -= damage;
    if (defender.stats.health <= 0) {
        defender.isAlive = false;
        defender.stats.health = 0;
    }

    return {
        damage,
        isCritical,
        remainingHealth: defender.stats.health
    };
}

// Generic функція для пошуку героя в масиві
function findHeroByProperty<T extends keyof Hero>(
    heroes: Hero[],
    property: T,
    value: Hero[T]
): Hero | undefined {
    return heroes.find(hero => hero[property] === value);
}

// Функція проведення раунду бою між героями
function battleRound(hero1: Hero, hero2: Hero): string {
    if (!hero1.isAlive || !hero2.isAlive) {
        return "Один з героїв не може битися.";
    }

    // Визначаємо порядок атаки за швидкістю
    const first = hero1.stats.speed >= hero2.stats.speed ? hero1 : hero2;
    const second = first === hero1 ? hero2 : hero1;

    // Перший герой атакує
    const attackResult1 = calculateDamage(first, second);
    let result = `${first.name} атакував ${second.name} і наніс ${attackResult1.damage} пошкоджень${attackResult1.isCritical ? " (Критичний удар!)" : ""}. У ${second.name} залишилось ${attackResult1.remainingHealth} здоров'я.\n`;

    // Якщо другий герой ще живий, він атакує
    if (second.isAlive) {
        const attackResult2 = calculateDamage(second, first);
        result += `${second.name} атакував ${first.name} і наніс ${attackResult2.damage} пошкоджень${attackResult2.isCritical ? " (Критичний удар!)" : ""}. У ${first.name} залишилось ${attackResult2.remainingHealth} здоров'я.\n`;
    } else {
        result += `${second.name} був переможений.`;
    }

    return result;
}

// Створюємо масив героїв
const heroes: Hero[] = [
    createHero("Дмитро", HeroType.Warrior),
    createHero("Мерлін", HeroType.Mage),
    createHero("Робін", HeroType.Archer)
];

// Приклад використання

// Проведення раунду бою між двома героями
console.log(battleRound(heroes[0], heroes[1]));

// Пошук героя за властивістю
const foundHero = findHeroByProperty(heroes, "type", HeroType.Archer);
if (foundHero) {
    console.log(`Знайдено героя: ${foundHero.name}`);
}

// Проведення кількох раундів бою
while (heroes[0].isAlive && heroes[1].isAlive) {
    console.log(battleRound(heroes[0], heroes[1]));
}

// Виведення статистики боїв
heroes.forEach(hero => {
    console.log(`Герой ${hero.name} ${hero.isAlive ? "вижив" : "загинув"}. Залишок здоров'я: ${hero.stats.health}`);
});