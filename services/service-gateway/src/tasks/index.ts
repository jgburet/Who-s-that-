import ATask from "./atask";

import LOOKUP_METHODS from "../lookup-methods";

/*
 * Here we extend `ATask` for every lookup method we know about.
 * It maps those dynamic classes to the actual name of the method,
 * so later the code can retrieve the class it needs easily.
 */

const taskClasses = LOOKUP_METHODS.reduce((acc, method) => {
  class Task extends ATask {
    constructor(protected param: any) {
      super(method);
    }
  }

  return {
    ...acc,
    [method]: Task
  };
}, {});

export default taskClasses;
