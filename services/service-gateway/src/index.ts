import { GraphQLServer } from "graphql-yoga";

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

  public geoIp(): GeoIpResult {
    return null;
  }

  public whois(): WhoisResult {
    return null;
  }
}

const resolvers = {
  Query: {
    newIpLookup(_, param): Lookup {
      return new Lookup(param);
    },
    newDnLookup(_, param): Lookup {
      return new Lookup(param);
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
