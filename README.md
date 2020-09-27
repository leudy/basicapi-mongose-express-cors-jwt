# basicapi-mongose-express-cors-jwt
this is a basic api, apply user authentication and token validator
### Auth
[/auth/login]()
[/auth/register]()
[/auth/renew]()

### Events
[/api/events/]()
[POST]()
``` 
Body
{
    "title":" Trabajos pendientes 2",
    "end" :100000,
    "start":1,
    "notes":"here goes a notes"
}
```
[GET]()
```
this method use the token for return all events by user
Response:
{
    "ok": true,
    "eventos": []
}
```
[PUT]()
```
/api/events//5f6fb2b2e655c38f00576bbb
Body
{
"title":"up app in react-js native 3.0",
"start":16000,
"end":30000 ,
"notes":"this gonna update the notes"
}
```
[DELETE]()
```
/api/events/5f710cd464d472a3b084dff0

```

