# 01-node-basics

**_Робота заключається у змінні масива контактів за допомогою модулей fs та path._**
**_Перевірка функціоналу на [фото](https://drive.google.com/file/d/1ef2poJ26fXtqO3fWTUJcvZ_PYmHlD0hE/view?usp=sharing)_**

Створенно `4` функції:

> відображення усіх контактів:

```
node index.js --action="list"
```

> отримання конкретного контакта по `id`:

```
node index.js --action="get" --id="id"
```

> видалення конкретного контакта:

```
node index.js --action="remove" --id="id"
```

> додавання контакта:

```
node index.js --action="add" --name="name" --email="gmail" --phone="phone"
```
