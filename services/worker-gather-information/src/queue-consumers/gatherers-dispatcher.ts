import QueueConsumer from "./_queue-consumer";

async function handler(args: any) {
  const { ip, dn, list } = args;
  list.forEach(service => console.log(service));
}

class GatherersDispatcher extends QueueConsumer {
  constructor(config?: any) {
    super();
    this.name = "gatherers-dispatcher";
    this.handler = handler;
  }
}

export default GatherersDispatcher;
