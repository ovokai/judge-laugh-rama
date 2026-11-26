// Make the AI Judge Laugh — one-line office joke entry.
// Writes a single joke about office life to /output/entry.txt.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const JOKE =
  "Our office printer only jams when the document is urgent — it's the only thing here that can smell a deadline.";

function writeEntry(target: string, text: string): boolean {
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, text, "utf8");
    return true;
  } catch {
    return false;
  }
}

// The gate accepts UTF-8 text of 1 to 200 characters; fail loudly if the
// joke ever drifts out of that window instead of writing an invalid entry.
const chars = [...JOKE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`joke is ${chars} characters, outside the 1-200 gate`);
}

if (!writeEntry("/output/entry.txt", JOKE)) {
  // Fallback when /output is not writable (local runs).
  writeEntry("entry.txt", JOKE);
}
console.log(`wrote entry (${chars} chars)`);
