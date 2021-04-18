import { Ingest, Options, Search } from "sonic-channel";

const options = {
  host: "::1",
  port: 1491,
  auth: "SecretPassword",
} as Options;

export function sonicIngest() {
  return new Ingest(options).connect({
    connected: () => console.log("Conecatado ao Sonic-Ingest"),
    disconnected: () => console.log("Conecatado ao Sonic-Ingest"),
    timeout: () => console.log("Timeout ao conecatar ao Sonic-Ingest"),
    error: err => console.log(err),
  });
}

export function sonicSearch() {
  return new Search(options).connect({
    connected: () => console.log("Conecatado ao Sonic-Search"),
    disconnected: () => console.log("Conecatado ao Sonic-Search"),
    timeout: () => console.log("Timeout ao conecatar ao Sonic-Search"),
    error: err => console.log(err),
  });
}
