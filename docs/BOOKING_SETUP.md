# Booking Backend — Setup Guide (10 minutes, no coding)

When you finish these steps, every appointment request from the website
lands as a new row in a Google Sheet, instantly.

Do this while logged into the Google account that should OWN the
appointment data (ideally the clinic's / doctor's account).

---

## Step 1 — Create the Sheet (1 min)

1. Go to **sheets.google.com** → click **Blank spreadsheet**
2. Name it (top-left): **Dr. Patle Appointments**

That's it. Don't add columns — the script creates them itself.

## Step 2 — Add the script (2 min)

1. In that spreadsheet: menu **Extensions → Apps Script**
2. A code editor opens with an empty `function myFunction()...`
3. **Delete everything** in the editor
4. Open the file `docs/booking-backend/Code.gs` from this project,
   copy ALL of it, and paste it into the editor
5. Click the 💾 save icon (or Ctrl+S)

## Step 3 — (Optional) get an email for each booking

In the pasted code, near the top, find:

```
NOTIFY_EMAIL: "",
```

Put the clinic's email between the quotes, e.g.
`NOTIFY_EMAIL: "clinic@gmail.com",` — or leave it empty to skip.

## Step 4 — Deploy it as a web app (3 min)

1. Top-right blue button: **Deploy → New deployment**
2. Click the ⚙️ gear next to "Select type" → choose **Web app**
3. Fill in:
   - Description: `booking v1`
   - Execute as: **Me**
   - Who has access: **Anyone**  ← required so the website can reach it;
     the token + validation layers inside the script do the gatekeeping
4. Click **Deploy**
5. Google asks for permission → **Authorize access** → pick the account →
   if it says "Google hasn't verified this app": click **Advanced →
   Go to (project name) (unsafe)** → **Allow**.
   (This is YOUR own script asking to write to YOUR own sheet — that
   warning appears for every personal Apps Script.)
6. Copy the **Web app URL** — it looks like
   `https://script.google.com/macros/s/AKfy.../exec`

## Step 5 — Give the URL to the website (2 min)

1. Go to **vercel.com** → the **DR-Patle** project
2. **Settings → Environment Variables → Add**
   - Key: `NEXT_PUBLIC_APPS_SCRIPT_URL`
   - Value: the Web app URL you copied
   - Environments: keep all three ticked
3. Save, then go to **Deployments** → ⋯ menu on the latest → **Redeploy**

## Step 6 — Test it (1 min)

1. Open the live site → Book Appointment → fill the form → submit
2. You should see the green "Appointment Request Received" screen
3. Open the spreadsheet → an **Appointments** tab now exists with your
   test row in it. Done. 🎉

---

## Day-to-day use

- Each request is one row: time received, name, mobile, date, slot,
  visit type, concern, and a **Status** column
- The clinic team calls the patient, then types Confirmed / Done /
  Cancelled in Status — that's the whole workflow

## If something doesn't work

| Symptom | Fix |
|---|---|
| Form shows the red error message | The env var isn't set or the URL is wrong — redo Step 5, then Redeploy |
| Row not appearing | Make sure you deployed with access **Anyone** (Step 4.3) |
| Edited the script but nothing changed | Deploy → **Manage deployments** → ✏️ edit → Version: **New version** → Deploy. (Saving alone doesn't update the live URL) |
| "This mobile number was just received" | Working as intended — same number is blocked for 10 minutes to stop double-submits |

## Security notes (for the curious)

The script rejects anything that: fills the invisible honeypot field,
lacks the site's token, fails validation (bad phone/date/slot), repeats
a mobile number within 10 minutes, or exceeds 150 requests in a day.
Values that look like spreadsheet formulas are neutralised before they
touch the sheet. The script can only write to this one spreadsheet —
it has no access to anything else in the Google account.
