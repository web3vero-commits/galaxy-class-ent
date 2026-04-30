import { google } from "googleapis";
import * as fs from "fs";

let _auth: any = null;

function loadServiceAccountAuth() {
  if (_auth) return _auth;

  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const filePath = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_PATH;

  let credentials: any;
  if (inline) {
    credentials = JSON.parse(inline);
  } else if (filePath && fs.existsSync(filePath)) {
    credentials = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } else {
    throw new Error("No Google service account configured (set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_JSON_PATH)");
  }

  _auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });
  return _auth;
}

export function sheetsClient() {
  return google.sheets({ version: "v4", auth: loadServiceAccountAuth() });
}

export const SHEET_ID = process.env.GCE_RADIO_SHEET_ID || "";
