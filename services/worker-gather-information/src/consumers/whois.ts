import { promisify } from "util";
import { lookup } from "whois";

import AConsumer from "./aconsumer";

const whois = promisify(lookup);

function handler(param): Promise<any> {
  return whois(param.dn);
}

export default class Whois extends AConsumer {
  public static get method(): string {
    return "whois";
  }

  constructor() {
    super(Whois.method, handler);
  }
}
