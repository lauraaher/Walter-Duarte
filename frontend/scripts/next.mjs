import { spawn } from "node:child_process";
process.env.NEXT_TELEMETRY_DISABLED = "1";
const mode = process.argv[2] || "dev";
const child = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    mode,
    ...(mode === "build" ? [] : ["--hostname", "127.0.0.1"]),
    ...process.argv.slice(3),
  ],
  { stdio: "inherit", env: process.env },
);
child.on("exit", (code) => process.exit(code ?? 1));
