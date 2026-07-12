
# HeatherSanders_ASL
## (Week 2) HTTP CRUD with Docker

### Updated an existing ExpressJS CRUD project by:
- Updating naming conventions
- Implementing RESTful CRUD endpoints
- Adding filtering, sorting, and pagination
- Containerizing the application with Docker

## Running the Application

### Open terminal from the Contacts folder

```bash
docker compose build
docker compose up
```
- hit d to get a terminal prompt back

```bash
docker exec -it contacts bash

```

### at new /app prompt
```bash
jest
```

## (Week 1) Docker Commands (That worked for me)

### c++ Project, open terminal from CPlusPlus_Example Folder
```bash
 docker build -t  cpptest .
 docker run cpptest
```



### GO Lang, open terminal from GO_Example

```bash
 docker build -t gotest .
 docker run gotest
```
### LUA scripting language, open terminal from LUA_Example

```bash
docker build -t luatest .
docker run luatest
```

### Output of each run command should be the greeting string and the current date&time