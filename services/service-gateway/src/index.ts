import { GraphQLServer } from "graphql-yoga";
import tasksDic from "./task-dictionary";

const typeDefs = `
  scalar GeoIpResult
  scalar WhoisResult

  type Lookup {
    geoIp: GeoIpResult
    whois: WhoisResult
  }

  type Query {
    newIpLookup(ip: String!): Lookup!
    newDnLookup(dn: String!): Lookup!
  }
`;

interface IIpInput {
  ip: string;
}
interface IDnInput {
  dn: string;
}

type GeoIpResult = object;
type WhoisResult = object;

class Lookup {
  constructor(public param: IIpInput | IDnInput) {}

  public async geoIp(): Promise<GeoIpResult> {
    const taskName = "geoIp";
    const result = await tasksDic[taskName](this.param);
    return result;
  }

  public async whois(): Promise<WhoisResult> {
    const taskName = "geoIp";
    const result = await tasksDic[taskName](this.param);
    return result;
  }
}

const resolvers = {
  Query: {
    newIpLookup(_, param): Lookup {
      return new Lookup(param);
    },
    // Will become cleaner with coming "union input"
    newDnLookup(_, param): Lookup {
      return new Lookup(param);
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
