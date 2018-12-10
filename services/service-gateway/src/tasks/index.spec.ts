import Tasks from ".";
import lookupMethods from "../lookup-methods";
import * as ATask from "./atask";

describe("Tasks", () => {
  it("has an entry for every lookup method", () => {
    expect(Object.keys(Tasks).sort()).toEqual(lookupMethods.sort());
  });
});
