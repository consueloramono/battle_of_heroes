# Битва Героїв

Проста карткова гра, де герої змагаються між собою. Проект реалізований на TypeScript.

## Опис

"Битва Героїв" - це консольна гра, в якій можна створювати героїв різних типів, проводити між ними бої та виводити статистику. Проект демонструє використання TypeScript, зокрема типізації, enum, інтерфейсів та generic функцій.

## Вимоги

- **Node.js** та **npm** встановлені на вашому комп'ютері.
- Глобально встановлений **TypeScript** компілятор.

## Встановлення

1. **Клонуйте репозиторій** або завантажте його як ZIP-архів.

   ```bash
   git clone [https://github.com/consueloramono/battle_of_heroes]
   ```

2. **Перейдіть** до теки проекту.

   ```bash
   cd battle_of_heroes
   ```
## Запуск

1. **Скомпілюйте** TypeScript код у JavaScript.

   ```bash
   tsc
   ```

2. **Запустіть** програму.

   ```bash
   node dist/index.js
   ```

## Використання

- **Створення героїв** різних типів: Воїн, Маг, Лучник.
- **Пошук героїв** за властивостями за допомогою функції 

findHeroByProperty

.- **Проведення боїв** між героями за допомогою функції 

battleRound

.- **Виведення статистики** після бою.

## Приклад

```typescript
// Створюємо героїв
const warrior = createHero("Дмитро", HeroType.Warrior);
const mage = createHero("Мерлін", HeroType.Mage);
const archer = createHero("Робін", HeroType.Archer);

// Проводимо бій
console.log(battleRound(warrior, mage));

// Шукаємо героя
const foundHero = findHeroByProperty(heroes, "name", "Робін");
if (foundHero) {
    console.log(`Знайдено героя: ${foundHero.name}`);
}
```

## Структура проекту

- src
    - файли TypeScript.
- dist
    - скомпільовані файли JavaScript.
- tsconfig.json
- конфігурація компілятора TypeScript.
- .gitignore
- файли та теки, що ігноруються Git.
- `README.md` - цей файл.
