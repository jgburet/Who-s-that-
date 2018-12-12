import { GraphQLScalarType } from "graphql";

import Ip, { isValid } from "./scalar-ip";

describe("scalar Ip", () => {
  it("extends GraphQLScalarType", () => {
    expect(Ip).toBeInstanceOf(GraphQLScalarType);
  });

  describe("isValid", () => {
    it("is a function", () => {
      expect(isValid).toBeInstanceOf(Function);
    });

    context("with a valid ip v4", () => {
      it("returns true", () => {
        expect(isValid("0.0.0.0")).toBe(true);
        expect(isValid("192.168.0.1")).toBe(true);
        expect(isValid("255.8.8.8")).toBe(true);
      });
    });

    context("with something invalid", () => {
      it("returns false", () => {
        expect(isValid("google.com")).toBe(false);
        expect(isValid("0.0.0.256")).toBe(false);
        expect(isValid("...")).toBe(false);
        expect(isValid(42)).toBe(false);
      });
    });
  });
});
