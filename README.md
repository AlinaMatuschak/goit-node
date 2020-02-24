# 04-auth

**_Робота заключається у змінні масива контактів за допомогою `mongoose`, `jwt`, `bcrypt`._**

**_Для перевірки використовувати [Postman](https://www.getpostman.com/)_**

**ІНСТУКЦІЯ:**

> Відображення усіх контактів:

```
@GET /contacts?page=`page`&limit=`limit`&sub=`sub`
```

Default: `page` = 1, `limit` = 5

> Створення нового контакта:

```
@POST /auth/register
```

-в `body` має бути прописано:

```
{
    "email": "example@example.com",
    "password": "examplepassword"
}
```

> Вхід в акаунт:

```
@POST /auth/login
```

-в `body` має бути прописано:

```
{
    "email": "example@example.com",
    "password": "examplepassword"
}
```

> Вихід з акаунта:

```
@POST /auth/logout
```

-в `Authorization` має бути прописано "Bearer token"

> Відображення поточного контакта по `token`:

```
@GET /auth/current
```

-в `Authorization` має бути прописано "Bearer token"

> Видалення контакта по `token`:

```
@DELETE /users
```

-в `Authorization` має бути прописано "Bearer token"

> Оновлення контакта по `token`:

```
@PATCH /users
```

-в `body` прописати поля, які хочеш змінити або добавити
