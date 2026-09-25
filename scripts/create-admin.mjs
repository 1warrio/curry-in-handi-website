// Developer-only script to create an admin account for the private
// /admin dashboard. There is no public signup route — this is the only
// way administrator accounts get created.
//
// Usage:
//   npm run create-admin
//
// Reads DATABASE_URL from .env.local (same as the rest of the app).
// Never hard-code credentials here or print the password back out.

import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import readline from "node:readline";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: ".env.local" });

const scrypt = promisify(scryptCallback);

// Must match src/lib/auth/password.ts exactly so the app can verify
// passwords created by this script.
const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function hashPassword(password) {
  const salt = randomBytes(SALT_LENGTH);
  const derivedKey = await scrypt(password.normalize("NFKC"), salt, KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });
  return `scrypt:${SCRYPT_N}:${SCRYPT_R}:${SCRYPT_P}:${salt.toString("hex")}:${derivedKey.toString("hex")}`;
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, (answer) => resolve(answer)));
}

// Prompts for a password without echoing it to the terminal.
function askHidden(question) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    process.stdout.write(question);

    let input = "";
    const onData = (char) => {
      const str = char.toString("utf8");

      if (str === "\n" || str === "\r" || str === "\u0004") {
        stdin.removeListener("data", onData);
        stdin.setRawMode?.(false);
        stdin.pause();
        process.stdout.write("\n");
        resolve(input);
        return;
      }

      if (str === "\u0003") {
        // Ctrl+C
        process.stdout.write("\n");
        process.exit(1);
      }

      if (str === "\u007f" || str === "\b") {
        input = input.slice(0, -1);
        return;
      }

      input += str;
    };

    stdin.setRawMode?.(true);
    stdin.resume();
    stdin.on("data", onData);
  });
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error(
      "\nDATABASE_URL is not set. Add it to .env.local (see .env.example) before running this script.\n",
    );
    process.exitCode = 1;
    return;
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("\nCreate an admin account for the Curry In Handi dashboard.\n");

  const name = (await ask(rl, "Admin name: ")).trim();
  const emailRaw = (await ask(rl, "Admin email: ")).trim();
  const email = emailRaw.toLowerCase();

  if (!name) {
    console.error("\nA name is required.\n");
    rl.close();
    process.exitCode = 1;
    return;
  }
  if (!EMAIL_REGEX.test(email)) {
    console.error("\nThat doesn't look like a valid email address.\n");
    rl.close();
    process.exitCode = 1;
    return;
  }

  const password = await askHidden("Admin password (min 12 characters): ");
  const confirmPassword = await askHidden("Confirm password: ");

  if (password.length < 12) {
    console.error("\nPassword must be at least 12 characters.\n");
    rl.close();
    process.exitCode = 1;
    return;
  }
  if (password !== confirmPassword) {
    console.error("\nPasswords do not match.\n");
    rl.close();
    process.exitCode = 1;
    return;
  }

  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const existing = await pool.query("select id from admin_users where email = $1 limit 1", [email]);
    if (existing.rows.length > 0) {
      console.error(`\nAn admin with the email "${email}" already exists.\n`);
      process.exitCode = 1;
      return;
    }

    const passwordHash = await hashPassword(password);

    await pool.query(
      "insert into admin_users (email, password_hash, name) values ($1, $2, $3)",
      [email, passwordHash, name],
    );

    console.log(`\nAdmin account created for ${email}. You can now sign in at /admin/login.\n`);
  } catch (err) {
    console.error("\nCould not create the admin account.");
    if (err && typeof err === "object" && "message" in err) {
      console.error(String(err.message));
    }
    console.error(
      "\nIf this mentions a missing table, make sure you've run the database migration first:\n  npm run db:generate\n  npm run db:migrate\n",
    );
    process.exitCode = 1;
  } finally {
    rl.close();
    await pool.end();
  }
}

main();
