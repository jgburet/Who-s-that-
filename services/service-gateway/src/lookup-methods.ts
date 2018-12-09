const LOOKUP_METHODS = process.env.LOOKUP_METHODS
  ? process.env.LOOKUP_METHODS.split(",")
  : ["geoIp", "whois"];

export default LOOKUP_METHODS;
