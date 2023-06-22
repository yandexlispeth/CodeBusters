**Структура директории `./src` клиентской части**

```
/src
├──/api — Сервисы api
|   ├──/Base
|   └──index.ts
├──/assets  — Файлы статики
|   ├──/fonts
|   ├──/icons
|   ├──/images
|   └──/sprites
├──/components — Повторно используемые базовые компоненты
|   ├──/Button
|   └──index.ts
├──/layouts — Лайауты для для страниц
|   ├──/Main
|   └──index.ts
├──/pages — Страницы приложения
|   ├──/Home
|   └──index.ts
├──/router — Роутер приложения и его конфиг
|   ├──/Home
|   └──index.ts
├──/store — Модули хранилища для redux
|   └──index.ts
├──/theme — Общие файлы стилей, тем и глобальных настроек
|   └──index.scss
|   └──index.ts
├──/utils — Общие утилиты, использующие сторонние библиотеки или WebApi
|   └──index.ts
├──/helpers — Общие вспомогательные чистые функции
|   └──index.ts
├── App.tsx — Главный компонент приложения
├── App.test.tsx — Файл для тестов главного компонета приложения
├── client.d.ts — Файл декларирования ts для клиентской части
└── main.tsx — Точка подключния ReactDOM
```