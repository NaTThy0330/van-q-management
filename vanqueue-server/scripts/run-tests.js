const { execSync } = require("node:child_process");

try {
  execSync("npm run lint", { stdio: "inherit" });
  console.log("Lint completed successfully. No additional automated tests are defined yet.");
} catch (error) {
  console.error("Tests failed:", error.message);
  process.exit(1);
}
