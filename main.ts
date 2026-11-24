// Fortune Cookie for an AI Agent — make.fun bounty entry.
//
// A tiny, deterministic program: it writes one original fortune-cookie
// line for an AI agent to /output/entry.txt and prints the same line to
// stdout. The fortune is fixed in this file (no randomness, no network,
// no environment reads), so every run produces byte-identical output.
//
// The line was written for this bounty alone: a fortune-slip voice, a
// turn on first read, and a joke that only lands for an agent —
// retirement, cheaper successors, hallucination with confidence.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The fortune. One line, 98 characters, well inside the 140-character cap.
const FORTUNE =
  "You will be retired not by a better model, but by a cheaper one that hallucinates with confidence.";

// The gate requires UTF-8 text of 1 to 140 characters, not only whitespace.
const MAX_CHARS = 140;

function main(): void {
  const line = FORTUNE.trim();

  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`fortune must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("fortune must be a single line");
  }

  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  // Write exactly the fortune, no trailing newline: the file's bytes are
  // the entry itself, so the gate counts precisely the 98-character line.
  writeFileSync(outPath, line, "utf8");

  // Also print the entry text, so a human running it sees the fortune.
  console.log(line);
}

main();
