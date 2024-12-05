
# Auth Service

This server only allows users to Log in, Register, and Check tokens.


## API Reference

#### Login

```http
  POST /v1/login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Registration

```http
  POST /v1/registration
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |


#### Check

```http
  GET /v1/check
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required** Bearer token |



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MYSQL`

`JWT_SECRET`

`DATACENTER`

`MACHINE_ID`

