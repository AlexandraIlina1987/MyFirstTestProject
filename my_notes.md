## Angular.json

    "builder": "@angular/build:application", // builder для сборки приложенияVite

    "browser": "src/main.ts", // точка входа в приложение

## Начало работы- создание проекта

-- установить ангуляр глобально один раз
npm i @angular/cli@21.2.21 https://www.npmjs.com/package/@angular/cli/v/21.2.21
*** sudo npm install -g @angular/cli@21.2.21

-- создать проект
ng new --directory ./ https://v21.angular.dev/cli/new

-- запуск проекта
ng serve (scripts in package.json)

-- kill $(lsof -t -i:4200)

## создание компонента

на нужной папке Open in integrated terminal чтобы перепеститься в нужную папку
в терминале: ng g c НазваниеКомпонента

Сейчас (новая версия Angular CLI):

- app.ts — код корневого компонента;
- app.html — его шаблон;
- app.scss — стили;
- app.spec.ts — тесты.

Раньше те же файлы назывались:

- app.component.ts;
- app.component.html;
- app.component.scss;
- app.component.spec.ts.
