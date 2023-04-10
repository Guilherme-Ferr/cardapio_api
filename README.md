## Instalação

```bash
$ npm install
```

## Rodando o servidor

```bash
$ npm run start:dev
```


<br />

# Rotas da API
## Autenticação de Usuario (Login)

### `Metodo:` POST

### `End Point:` auth/login

### `Body:`

| Chave    | Descrição        | Tipo |
| -------- | ---------------- | ------------- |
| username | Nome de Usuario  | string        |
| password | Senha de Usuario | string        |
### `Exemplo:`

```
{
  "username": "usuario.sobrenome",
  "password": "123456789"
}
```
<br />

## Listagem de Categorias de Produtos

### `Metodo:` GET

### `End Point:` category

### `Header:` token: `string`

### `Retorno:`

```
{
    "categories": [
        {
            "_id": "643023d9baad54d93729bc42",
            "name": "Bebidas"
        },
        {
            "_id": "643441cbf94f171e3afaad2a",
            "name": "Comidas"
        }
    ]
}
```
<br />

## Listagem de Produtos

### `Metodo:` GET

### `End Point:` product

### `Header:` token: `string`

### `Retorno:`

```
{
    "products": [
        {
            "_id": "64302735baad54d93729bc43",
            "name": "Coca-cola",
            "qty": 12,
            "price": 5.50,
            "categoriesIds": [
                "643023d9baad54d93729bc42",
                "643441cbf94f171e3afaad2a"
            ]
        },
        {
            "_id": "643478b92246cccface351fa",
            "name": "Pepsi",
            "qty": 10,
            "price": 3.90,
            "categoriesIds": [
                "643023d9baad54d93729bc42",
                "643441cbf94f171e3afaad2a"
            ]
        }
    ]
}
```
<br />

## Localizar um Produto

### `Metodo:` GET

### `End Point:` product/<id_do_produto>

### `Header:` token: `string`

### `Retorno:`
```
{
    "product": {
        "_id": "643478b92246cccface351fa",
        "name": "Coca-cola",
        "qty": 12,
        "price": 5.50,
        "categories": [
            "Bebidas",
            "Gelados"
        ]
    }
}
```

<br />

# Criar um Produto

### `Metodo:` POST

### `End Point:` product

### `Header:` token: `string`

### `Body:`

| Chave   | Descrição           | Tipo  |
| ------- | ------------------- | ------------- |
| name    | Nome do Produto     | string        |
| qty     | Quantidade do Produto  | number     |
| price   | Preço do Produto     | decimal      |
| categoriesIds | Ids das Categorias  | string  |
### `Exemplo:`

```
{
    "name": "Produto",
    "qty": 10,
    "price": 50.90,
    "categoriesIds": ["643023d9baad54d93729bc42", "643441cbf94f171e3afaad2a"]
}
```
<br />

# Alterar um Produto

### `Metodo:` PATCH

### `End Point:` product/<id_do_produto>

### `Header:` token: `string`

### `Body:`



| Chave   | Descrição           | Tipo |
| ------- | ------------------- | ------------- |
| name    | Nome do Produto     | string        |
| qty     | Quantidade do Produto  | number     |
| price   | Preço do Produto     | decimal      |
| categoriesIds | Ids das Categorias  | string  |

### `Exemplo:`
```
{
    "name": "Produto",
    "qty": 10,
    "price": 50.90,
    "categoriesIds": ["643023d9baad54d93729bc42", "643441cbf94f171e3afaad2a"]
}
```
### `Retorno:` status code 200

<br />

# Excluir um Produto

### `Metodo:` DELETE

### `End Point:` product/<id_do_produto>

### `Header:` token: `string`

### `Retorno:` status code 204
