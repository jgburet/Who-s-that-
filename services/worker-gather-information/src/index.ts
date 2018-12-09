import * as Consumers from "./consumers";

const LOOKUP_METHODS = process.env.LOOKUP_METHODS
  ? process.env.LOOKUP_METHODS.split(",")
  : [];

const ActivatedConsumers = LOOKUP_METHODS.length
  ? Object.values(Consumers).filter(C => LOOKUP_METHODS.includes(C.name))
  : Object.values(Consumers);

for (const ActivatedConsumer of ActivatedConsumers) {
  const consumer = new ActivatedConsumer();
  consumer.start();
}
