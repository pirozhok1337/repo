# shizoval

Discord: **солевой#4769**

## Использование

На выбор есть два способа игры с читом:

**1.** [Сайт со встроенным читом](https://shizoval-site.vercel.app/) (Преимущество - не нужно ничего устанавливать)

**2.** Установка скрипта (Преимущество - более стабильная работа)

## Установка

**1.** Установите [Tampermonkey](https://www.tampermonkey.net/)

**2.** Установите [скрипт](https://github.com/sheezzmee/shizoval/raw/main/release/shizoval.user.js)

## Клавиши

`INSERT`, `NumPad 0`, `/` - Открыть меню

## Кастомизация чита

  В версии **0.64.3** добавлена возможность кастомизации чита, а именно был открыт полный доступ к апи чита и всем внутреннем функциям.
  
  **Глобальные переменные созданные для вас**
  
      Мне лень объяснять, что да как, поэтому за меня это сделает твоя консоль браузера
      utils
      gameObjects
      storeOpener
      config
      removeMines
      airBreak
      cameraHack
      menu
      cImGui
      ImGui
      other
      stick
      clicker
      sync
      consoleLog
      wallhack
      filters
      packetControl
      striker
      
  ![](https://github.com/sheezzmee/shizoval/blob/main/img/exampleScript.jpg?raw=true)
 
  Пару примеров (эти скрипты вписывать в консоль или в конец скрипта): 
  
```js
/*  SHIZOVAL
*  Автор кода: sheezzmee
*  Название: Legit FPS hack
*  Описание: Удаление мин позиция, которых совпадает с другими
*  Активация: Digit0
*/
   
const checkMine = mine => {
    if (!mine.removeMine_0)
        return;

    const mines = gameObjects.world.triggers_0.triggers_0.array;
    
    for (const element of mines) {
        if (!element.removeMine_0 || element.id === mine.id)
            continue;
    
        if (element.position.distance_ry1qwf$(mine.position) <= 10)
            element.removeMine_0();
    }
}

document.addEventListener('keyup', (e) => {
    if (utils.isChatOpen() || e.code !== 'Digit0') 
        return;

    const mines = gameObjects.world?.triggers_0?.triggers_0?.array;

    if (!utils.isArrayValid(mines))
        return;

    for (const element of mines)
        checkMine(element);
})
```

```js
/*  SHIZOVAL
*  Автор кода: sheezzmee
*  Название: Box Teleport
*  Описание: Телепортирует танк на бонусные ящики
*  Активация: B (удержание)
*/

requestAnimationFrame(function boxTeleport() {
    requestAnimationFrame(boxTeleport);

    if (!utils.getKeyState('KeyB'))
        return;

    const world = gameObjects.world,
        tank = gameObjects.localTank,
        physics = tank?.['TankPhysicsComponent'];

    if (!world || !physics)
        return;

    const boxes = gameObjects.world?.triggers_0?.triggers_0?.array;

    if (!utils.isArrayValid(boxes))
        return;

    for (const box of boxes) {
        const object3d = box.bonus_0?.bonusMesh?.object3d;

        if (!object3d)
            continue;

        physics.body.state.position.init_ry1qwf$(object3d.aabb.center);
    }
})
```

Если вы хотите, чтобы я выставил ваш скрипт сюда (авторство будет указано), то присылайте его мне в дс (там выше)

## Клонирование проекта

```bash
# Клонирование репозитория
git clone https://github.com/sheezzmee/shizoval.git
# Перейти в папку с репозиторием
cd shizoval
# Установить зависимости
npm i
# Компиляция проекта
npx gulp
```

## Список изменений

* 0.64.3:

      - Вырезана функция: BoxTeleport, FlagTeleport, DeSync, Box WallHack, Anti-Crash, Gravity, No-Knockback
      
      - Улучшена функция AimBot
      
      - Добавлена функция Packet Control (только для кликера)
          * позволяет контролировать состояние сервера (если большой пинг, то скорость кликера уменьшается)
          * активация автоматическая
          
      - Добавлена функция PPS (Packets Per Second)
          * отображает кол-во пакетов отправляемых на сервер (включая пакеты отправляемые самой игрой)
          * активация автоматическая
      
      - Оптимизирован блок Sync 
      
      - Улучшен Rapid Update
          * пакеты не отправляются, если состояние танка не изменяется
          * пакеты не отправляются, если танк мертв или не заспавнен (входит в битву)

      - Отключена функция sendChassisControl (отправка пакетов передвижения)

      - Пофикшен фпс баг

      - Добавлена функция ConsoleLog
          * логирует сообщения, убийства, выходы, самоуничтожения в консоль
    ![](https://github.com/sheezzmee/shizoval/blob/main/img/consoleLog.jpg?raw=true)
       
      - Улучшен кликер
          * пакеты не отправляются, если танк мертв или не заспавнен (входит в битву)
          * пакеты не отправляются, если сервер не отвечает
          * изменен цикл на setInterval (более быстрая работа)
   
      - Добавлена возможность кастомизации чита
        
      - Отключен самоурон от страйкера

      - WallHack, Remove mines, Freeze tanks теперь активируется до того, как заспавнится локальный танк

      - Оптимизировано меню (меньше нагрузка)

      - Оптимизирован страйкер хак

      - Пофикшена функция GTA Camera

      - Пофикшен баг когда камера застывает на одном месте

      - Улучшена функция отключения коллизии
          * теперь танки полностью игнорируются (раньше коллизия башен танков не отключалась)