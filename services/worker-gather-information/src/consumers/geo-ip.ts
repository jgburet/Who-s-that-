import * as request from "request-promise-native";

import AConsumer from "./aconsumer";

async function handler({ ip }): Promise<any>;
async function handler({ dn }): Promise<any>;
async function handler(param): Promise<any> {
  const baseUrl = "https://ipstack.com/ipstack_api.php";
  const queryString = `?ip=${param.ip || param.dn}`;
  const requestResult = await request.get({ uri: baseUrl + queryString });
  return JSON.parse(requestResult);
}

export default class GeoIp extends AConsumer {
  public static get method(): string {
    return "geoIp";
  }

  constructor() {
    super(GeoIp.method, handler);
  }
}
