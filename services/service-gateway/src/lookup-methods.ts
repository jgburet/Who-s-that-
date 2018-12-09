const LOOKUP_METHODS = process.env.LOOKUP_METHODS
  ? process.env.LOOKUP_METHODS.split(",")
  : ["echo", "geoIp", "rdap"];

export default LOOKUP_METHODS;
