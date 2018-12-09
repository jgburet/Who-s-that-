import * as Queue from "bee-queue";

const QUEUE_CONFIG = {
  isWorker: true,
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379
  },
  removeOnSuccess: true
};

function taskNameToQueueName(tn) {
  return `retrieve-${tn}`;
}

export default abstract class AConsumer {
  private queue;
  private concurency = 0;

  constructor(
    protected name: string,
    protected handler,
    queueConfig: any = QUEUE_CONFIG
  ) {
    this.queue = new Queue(taskNameToQueueName(name), queueConfig);
  }

  public start(concurency: number = 1) {
    if (this.concurency) {
      throw new Error("Just don't");
    }

    this.queue.process(concurency, job => {
      console.log(`Working on a new job from queue '${this.name}'`);
      job.reportProgress(0); // Informing we started the job

      return this.handler(job.data);
    });

    console.log(`Waiting for tasks from queue '${this.name}'`);
    this.concurency += concurency;
  }
}
