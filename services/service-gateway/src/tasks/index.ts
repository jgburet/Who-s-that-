import ATask from "./atask";

import LOOKUP_METHODS from "../lookup-methods";

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
