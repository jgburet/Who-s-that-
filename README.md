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
  --data '{ "query": "{ newDnLookup(dn: "github.com", methods: [echo]) }" }' \
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

Adjust the scale:
```bash
docker-compose up --scale worker-gather-information=4 -d
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
The `service-gateway` creates `tasks` into a `redis` server. Each lookup method has its own queue.  
The instances of `worker-gather-information` consumes those tasks, according to their configuration. Meaning, we can spawn new instances that will only deal with certain queues.


## Project structure
This is a monorepo. Each directory under `services/` is an independent part of the application we are building.

## TODO
- For now, the lookup methods available are hard coded, and their respective `Task` classes (cf `service-gateway`) are generated from that. It would be cool :sunglasses: to manage them dynamically, like, updating them according to a list broadcast-ed by the workers alive.
- Have some fun, look for dbs/websites/whatever-scrapper.
- Test. Sorry, too much back and forth for now, did not have time to do that :cry:

## Functionalities & examples
```
# available methods:
echo
geoIp
rdap
whois
```

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "{ newDnLookup(dn: "github.com", methods: [echo, geoIp]) }" }' \
  http://0.0.0.0:4000
```

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "{ newIpLookup(ip: "192.30.255.112", methods: [geoIp]) }" }' \
  http://0.0.0.0:4000
```
