import * as Queue from "bee-queue";

const QUEUE_CONFIG = {
  isWorker: false,
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379
  }
};

interface IIpInput {
  ip: string;
}
interface IDnInput {
  dn: string;
}

function taskNameToQueueName(tn) {
  return `retrieve-${tn}`;
}

const tasks = ["geoIp", "whois"];

export default tasks.reduce((acc, tn) => {
  const queue = new Queue(taskNameToQueueName(tn), QUEUE_CONFIG);
  const task = async (param: IIpInput | IDnInput) => {
    const job = await queue
      .createJob(param)
      .timeout(3000)
      .save();
    return new Promise(res => {
      job.on("succeeded", result => res(result));
      job.on("failed", () => res(null));
    });
  };

  return {
    ...acc,
    [tn]: task
  };
}, {});
