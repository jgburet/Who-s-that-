# Who's that?
Gather info for a given IP or domain name.

## TL;DR
```bash
docker-compose up
```

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "{ hello }" }' \
  http://0.0.0.0:4000
```

... or `http://0.0.0.0:4000`


## Usage
### Using docker
#### Requirements
- docker 17.12.0+
- docker-compose

```bash
docker-compose up
```

### Not using docker
#### Requirements
- Node 10.14.1
- yarn 1.12
- redis 5.0.2

```bash
cd services/service-gateway && yarn start
```

```bash
cd services/worker-gather-information && yarn start
```


## How it works
Does nothing yet :upside_down_face:

## Project structure
Monorepo  
Code is under services/  
