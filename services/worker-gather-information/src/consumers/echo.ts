import AConsumer from "./aconsumer";

async function handler(param): Promise<any> {
  return param;
}

export default class Echo extends AConsumer {
  public static get method(): string {
    return "echo";
  }

  constructor() {
    super(Echo.method, handler);
  }
}
