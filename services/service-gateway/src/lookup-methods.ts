const LOOKUP_METHODS = process.env.LOOKUP_METHODS
  ? process.env.LOOKUP_METHODS.split(",")
  : ["echo", "geoIp", "whois"];

export default LOOKUP_METHODS;
