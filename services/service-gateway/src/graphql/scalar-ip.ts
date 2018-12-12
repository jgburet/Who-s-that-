import { GraphQLScalarType } from "graphql";
import { GraphQLError } from "graphql/error";
import { Kind } from "graphql/language";

export function isValid(ip) {
  return (
    typeof ip === "string" &&
    !!ip.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/) &&
    ip
      .split(".")
      .map(Number)
      .every(n => 0 <= n && n <= 255)
  );
}

export default new GraphQLScalarType({
  description: "Matches IP v4",
  name: "Ip",

  serialize(value) {
    if (typeof value !== "string") {
      throw new TypeError(`Value is not string: ${value}`);
    }

    if (!isValid(value)) {
      throw new TypeError(`Value is not a valid IP: ${value}`);
    }

    return value;
  },

  parseValue(value) {
    if (typeof value !== "string") {
      throw new TypeError(`Value is not string: ${value}`);
    }

    if (!isValid(value)) {
      throw new TypeError(`Value is not a valid IP: ${value}`);
    }

    return value;
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as IP but got a: ${ast.kind}`
      );
    }

    if (!isValid(ast.value)) {
      throw new TypeError(`Value is not a valid IP: ${ast.value}`);
    }

    return ast.value;
  }
});
