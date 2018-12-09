import * as Queue from "bee-queue";

const UNTRIGGERED_JOB_TIMEOUT = 2 * 1000;
const QUEUE_CONFIG = {
  isWorker: false,
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379
  }
};

function taskNameToQueueName(tn) {
  return `retrieve-${tn}`;
}

const queuesDic = {};

export default abstract class ATask {
  protected param;
  private queue;

  constructor(protected name: string, queueConfig: any = QUEUE_CONFIG) {
    const queueName = taskNameToQueueName(this.name);
    if (!queuesDic[queueName]) {
      queuesDic[queueName] = new Queue(queueName, queueConfig);
    }

    this.queue = queuesDic[queueName];
  }

  /*
   * `#run` handles failures by returning `null`.
   * It also handles timeouts coming from the external services we query
   * and returns `null`.
   * It rejects if there is no consumer or if they are too busy (so we know
   * about it).
   */
  public async run({ timeout } = { timeout: 3000 }) {
    const job = await this.queue
      .createJob(this.param)
      .timeout(timeout)
      .save();
    return new Promise((res, rej) => {
      const jobExpirationTimeout = setTimeout(
        () => rej("Job did not start in time"),
        UNTRIGGERED_JOB_TIMEOUT
      ); // Meh, our fault.

      job.on("progress", () => clearTimeout(jobExpirationTimeout));
      job.on("succeeded", res);
      job.on("failed", () => res(null)); // we are not liable for it, let's silent it
    });
  }
}
