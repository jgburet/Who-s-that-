import * as request from "request-promise-native";

import AConsumer from "./aconsumer";

async function handler({ ip }): Promise<any>;
async function handler({ dn }): Promise<any>;
async function handler(param): Promise<any> {
  const uri = param.ip
    ? `https://www.rdap.net/ip/${param.ip}`
    : `https://www.rdap.net/domain/${param.dn}`;
  const requestResult = await request.get({ uri });
  return JSON.parse(requestResult);
}

export default class Rdap extends AConsumer {
  public static get method(): string {
    return "rdap";
  }

  constructor() {
    super(Rdap.method, handler);
  }
}
