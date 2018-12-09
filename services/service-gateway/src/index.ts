import { GraphQLServer } from "graphql-yoga";
import tasksDic from "./task-dictionary";

const LOOKUP_METHODS = process.env.LOOKUP_METHODS
  ? process.env.LOOKUP_METHODS.split(",")
  : ["geoIp", "whois"];

const typeDefs = `
  scalar DomainName
  scalar Ip
  scalar LookupResult

  enum LookupMethod {
    ${LOOKUP_METHODS.join("\n")}
  }

  type Lookup {
    ${LOOKUP_METHODS.map(lm => `${lm}: LookupResult`).join("\n")}
  }

  type Query {
    newIpLookup(ip: Ip!, methods: [LookupMethod]): Lookup!
    newDnLookup(dn: DomainName!, methods: [LookupMethod]): Lookup!
  }
`;

type DomainName = string;
type Ip = string;

const resolvers = {
  Query: {
    async newIpLookup(_, { ip, methods = LOOKUP_METHODS }) {
      const tasks = methods.map(m => [m, tasksDic[m](ip)]);
      const result = {};
      for (const [method, taskPromise] of tasks) {
        result[method] = await taskPromise;
      }
      return result;
    },
    async newDnLookup(_, { dn, methods = LOOKUP_METHODS }) {
      const tasks = methods.map(m => [m, tasksDic[m](dn)]);
      const result = {};
      for (const [method, taskPromise] of tasks) {
        result[method] = await taskPromise;
      }
      return result;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
