# json-server


## Usage
Pass it to JSON Server CLI

```shell
$ npx json-server db.json
```

Get a REST API

```shell
$ curl http://localhost:3000/posts/1
{
  "id": "1",
  "title": "a title"
}
```

Run `json-server --help` for a list of options

## Routes

Based on the example `db.json`, you'll get the following routes:

```
GET    /posts
GET    /posts/:id
POST   /posts
PUT    /posts/:id
PATCH  /posts/:id
DELETE /posts/:id

# Same for comments
```

```
GET   /profile
PUT   /profile
PATCH /profile
```

## Params

### Conditions

- ` ` → `==`
- `lt` → `<`
- `lte` → `<=`
- `gt` → `>`
- `gte` → `>=`
- `ne` → `!=`

```
GET /posts?views_gt=9000
```

### Range

- `start`
- `end`
- `limit`

```
GET /posts?_start=10&_end=20
GET /posts?_start=10&_limit=10
```

### Paginate

- `page`
- `per_page` (default = 10)

```
GET /posts?_page=1&_per_page=25
```

### Sort

- `_sort=f1,f2`

```
GET /posts?_sort=id,-views
```

### Nested and array fields

- `x.y.z...`
- `x.y.z[i]...`

```
GET /posts?author.name=foo
GET /posts?author.email=foo
GET /posts?tags[0]=foo
```

### Embed

```
GET /posts?_embed=comments
GET /comments?_embed=post
```

## Delete

```
DELETE /posts/1
DELETE /posts/1?_embed=comments
```