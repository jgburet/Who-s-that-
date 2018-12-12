import { GraphQLScalarType } from "graphql";
import { GraphQLError } from "graphql/error";
import { Kind } from "graphql/language";

export function isValid(dn): boolean {
  // https://stackoverflow.com/a/26987741/3037415
  return (
    typeof dn === "string" &&
    !!dn.match(
      /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/
    )
  );
}

export default new GraphQLScalarType({
  description: "Check is a strin gis a valid domain name",
  name: "DomainName",

  serialize(value) {
    if (typeof value !== "string") {
      throw new TypeError(`Value is not string: ${value}`);
    }

    if (!isValid(value)) {
      throw new TypeError(`Value is not a valid domain name: ${value}`);
    }

    return value;
  },

  parseValue(value) {
    if (typeof value !== "string") {
      throw new TypeError(`Value is not string: ${value}`);
    }

    if (!isValid(value)) {
      throw new TypeError(`Value is not a valid domain name: ${value}`);
    }

    return value;
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as domain name but got a: ${ast.kind}`
      );
    }

    if (!isValid(ast.value)) {
      throw new TypeError(`Value is not a valid domain name: ${ast.value}`);
    }

    return ast.value;
  }
});
