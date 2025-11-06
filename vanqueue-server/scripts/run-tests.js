const { execSync } = require("node:child_process");

try {
  const commands = ["npm run lint", "node --test tests/auth.test.js"];

  for (const command of commands) {
    execSync(command, { stdio: "inherit" });
  }
  console.log("All checks passed.");
} catch (error) {
  console.error("Tests failed:", error.message);
  process.exit(1);
}
