import * as Queue from "bee-queue";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

type QueueName = string;

abstract class QueueConsumer {
  public name: QueueName;
  protected handler;
  private queue;

  constructor(config?: any) {
    this.queue = new Queue(this.name, {
      ...(config || {
        redis: {
          host: REDIS_HOST,
          port: REDIS_PORT
        },
        removeOnSuccess: true
      }),
      isWorker: true
    });
  }

  public start(concurency: number = 1) {
    this.queue.process(concurency, this.handler);
  }
}

export default QueueConsumer;
