# 02-express

**_Робота заключається у змінні масива контактів за допомогою пакетів express, morgan і cors._**

**_Для перевірки використовувати [Postman](https://www.getpostman.com/)_**

**ІНСТУКЦІЯ:**

> Відображення усіх контактів по рауту:

```
@GET /api/contacts
```

> Отримання конкретного контакта по `id`:

```
@GET /api/contacts/:contactId
```

> Видалення конкретного контакта:

```
@DELETE /api/contacts/:contactId
```

> Додавання контакта:

```
@PATCH /api/contacts/:contactId
```

-в `body` має бути прописано:

```
{
    "name": yourName,
    "email": yourEmail,
    "phone": yourPhone
}
```

> Оновлення контакта по `id`:

```
@PATCH /api/contacts/:contactId
```

-в `body` прописати поля, які хочеш змінити або добавити
