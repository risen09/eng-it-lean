import { jest } from '@jest/globals';
import { unitService } from '../../../../service/unit';
import { GetUnitResponse } from '../../../../service/unit/types';

export const spyedGetUnit = jest.spyOn(unitService, 'getUnit');

export const mockGetUnit = (data?: GetUnitResponse) => {
  spyedGetUnit.mockResolvedValueOnce(
    data ?? {
      content:
        '# Цель урока\n\nИзучение структуры документации программы с блоком кода.\n\n## Лексика\n\n### Базовая лексика:\n\n- Documentation – документация\n- Code block – блок кода\n- Description – описание\n- Function – функция\n- Variable – переменная\n- Comment – комментарий\n\n### Расширенная лексика:\n\n- API – интерфейс прикладного программирования\n- Method – метод\n- Class – класс\n- Library – библиотека\n- Framework – фреймворк\n\n## Грамматический фокус\n\nПравило: Структура документации программы должна включать краткое описание, блок кода и примеры использования.\n\nПример:\n\nDocumentation for a program typically includes the following sections:\n\n1. **Description**: A brief overview of what the program does and its purpose.\n2. **Code Block**: The actual code that implements the functionality described in the first section.\n3. **Examples**: One or more examples demonstrating how to use the features described in the documentation.\n\nТипичные ошибки и как их избежать: Ошибки могут возникнуть из-за недостаточного описания функционала или неправильного форматирования кода. Чтобы избежать этого, важно тщательно проработать каждый раздел документации и убедиться, что все примеры корректны и понятны.\n\n## Контекстуализация\n\nТекст для анализа:\n\n**Description**: This is a simple Python script that calculates the average value of a list of numbers.\n\n**Code Block**: \n```python\ndef calculate_average(numbers):\n    """Calculate the average value of a list of numbers"""\n    return sum(numbers)/len(numbers)\n```\n\nПримеры использования:\n\n```python\n# Example usage\nnumbers = [10, 20, 30]\naverage = calculate_average(numbers)\nprint("The average value of the list", numbers, "is", average)\n```\n\n## Упражнения\n\nПисьменное задание: Написать документацию для простой функции на языке Python, которая принимает список чисел и возвращает среднее значение. Включить описание, код блока и пример использования.\n\nУстная практика: Ролевой диалог между разработчиком и техническим писателем о структуре и содержании документации программы.\n\nАналитическое задание: Проанализировать существующую документацию программы и найти ошибки или неясности. Предложить улучшения.\n\n## Домашнее задание\n\nТекстовые задачи:\n\n- Написать документацию для другой функции на языке Python, используя правильную структуру.\n- Исправить ошибки в существующей документации программы.\n- Перевести фрагмент документации на русский язык, сохраняя точность и стиль.\n',
      id: 2,
      fileName: 'unit-2',
      name: 'Документация программы'
    }
  );

  return spyedGetUnit;
};
