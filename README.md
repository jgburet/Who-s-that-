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
The `service-gateway` creates `tasks` into a `redis` server. Each lookup method has its own queue.  
The instances of `worker-gather-information` consumes those tasks, according to their configuration. Meaning, we can spawn new instances that will only deal with certain queues.


## Project structure
This is a monorepo. Each directory under `services/` is an independent part of the application we are building.

## TODO
- For now, the lookup methods available are hard coded, and their respective `Task` classes (cf `service-gateway`) are generated from that. It would be cool :sunglasses: to manage them dynamically, like, updating them according to a list broadcast-ed by the workers alive.
- Define the scalar types in the `service-gateway` used, so we can actually have a real validation of our input (cc "Ip" & "DomainName").
- Actually implement lookup methods :joy: because that's kinda useless for now.
  - Have some fun, look for dbs, websites, whatever.
- Test. Sorry, too much back and forth for now, did not have time to do that :cry:
