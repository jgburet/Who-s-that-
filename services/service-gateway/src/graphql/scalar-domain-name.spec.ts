import { GraphQLScalarType } from "graphql";

import DomainName, { isValid } from "./scalar-domain-name";

describe("scalar DomainName", () => {
  it("extends GraphQLScalarType", () => {
    expect(DomainName).toBeInstanceOf(GraphQLScalarType);
  });

  describe("isValid", () => {
    it("is a function", () => {
      expect(isValid).toBeInstanceOf(Function);
    });

    context("with a valid domain name", () => {
      it("returns true", () => {
        expect(isValid("google.com")).toBe(true);
      });

      context("when a sub domain is present", () => {
        it("returns true", () => {
          expect(isValid("sub.google.com")).toBe(true);
        });
      });

      context("when two or more sub domains are present", () => {
        it("returns false", () => {
          expect(isValid("sub2.sub1.google.com")).toBe(false);
        });
      });
    });

    context("with something invalid", () => {
      it("returns false", () => {
        expect(isValid(42)).toBe(false);
        expect(isValid({})).toBe(false);
        expect(isValid([])).toBe(false);
      });
    });
  });
});
