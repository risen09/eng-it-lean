# Цель урока

Изучение структуры документации программы с блоком кода.

## Лексика

### Базовая лексика:

- Documentation – документация
- Code block – блок кода
- Description – описание
- Function – функция
- Variable – переменная
- Comment – комментарий

### Расширенная лексика:

- API – интерфейс прикладного программирования
- Method – метод
- Class – класс
- Library – библиотека
- Framework – фреймворк

## Грамматический фокус

Правило: Структура документации программы должна включать краткое описание, блок кода и примеры использования.

Пример:

Documentation for a program typically includes the following sections:

1. **Description**: A brief overview of what the program does and its purpose.
2. **Code Block**: The actual code that implements the functionality described in the first section.
3. **Examples**: One or more examples demonstrating how to use the features described in the documentation.

Типичные ошибки и как их избежать: Ошибки могут возникнуть из-за недостаточного описания функционала или неправильного форматирования кода. Чтобы избежать этого, важно тщательно проработать каждый раздел документации и убедиться, что все примеры корректны и понятны.

## Контекстуализация

Текст для анализа:

**Description**: This is a simple Python script that calculates the average value of a list of numbers.

**Code Block**:

```python
def calculate_average(numbers):
    """Calculate the average value of a list of numbers"""
    return sum(numbers)/len(numbers)
```

Примеры использования:

```python
# Example usage
numbers = [10, 20, 30]
average = calculate_average(numbers)
print("The average value of the list", numbers, "is", average)
```

## Упражнения

Письменное задание: Написать документацию для простой функции на языке Python, которая принимает список чисел и возвращает среднее значение. Включить описание, код блока и пример использования.

Устная практика: Ролевой диалог между разработчиком и техническим писателем о структуре и содержании документации программы.

Аналитическое задание: Проанализировать существующую документацию программы и найти ошибки или неясности. Предложить улучшения.

## Домашнее задание

Текстовые задачи:

- Написать документацию для другой функции на языке Python, используя правильную структуру.
- Исправить ошибки в существующей документации программы.
- Перевести фрагмент документации на русский язык, сохраняя точность и стиль.
