import pkg from "../package.json" with { type: "json" };

const Version = pkg.version;

export default Version;
