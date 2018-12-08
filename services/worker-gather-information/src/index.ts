import { GatherersDispatcher } from "./queue-consumers";

const dispatcher = new GatherersDispatcher();
dispatcher.start();
