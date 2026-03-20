# 🏅 M&S Central – Data API Repository

This repository powers **M&S Central**, a platform that provides up-to-date leaderboards, rankings, and world record history across multiple *Mario & Sonic at the Olympic Games* titles.

It contains structured JSON APIs, automation scripts, and workflows that ensure all data remains accurate and continuously updated.

---

# 📂 Repository Structure

## 🔹 `/data`
This directory contains the **core API data** used by M&S Central.

- Stores structured datasets such as player information and event-related data  
- Continuously updated through automated processes  
- Serves as a **primary data source** for the platform  

---

## 🏆 `/leaderboards`
This directory contains the **main leaderboard APIs**.

- Provides current rankings for all supported events  
- Used directly by the frontend of M&S Central  
- Automatically updated to reflect the latest results  

---

## 📈 `/wr-history`
This directory contains the **world record history APIs**.

- Tracks progression of world records over time  
- Enables historical analysis and record tracking  
- Maintained and updated automatically  

---

## 🗄️ Legacy APIs (Root Files)

JSON files in the root directory (e.g. `london-3ds.json`, `rio-3ds.json`, etc.) are:

- **Legacy API files**  
- Previously used for leaderboards and record tracking  
- Retained for archival or reference purposes  
- No longer part of the active system  

---

# ⚙️ Automation & Data Processing

## Scripts

### `fetch-json.js`
- Retrieves data from external sources  
- Prepares and formats it for internal use  

### `update-and-push.js`
- Updates JSON files with the latest data  
- Automatically commits and pushes changes to the repository  

---

## 🤖 GitHub Actions

Located in `.github/workflows/`

- Automates data updates on a schedule or trigger  
- Runs update scripts without manual intervention  
- Commits changes with standardized messages (e.g. `Auto-update`)  

---

# 📦 Additional Files

- `data.json`, `data2.json` → Frequently updated core datasets  
- `package.json` → Project configuration and dependencies  
- `package-lock.json` → Dependency lock file  
- `node_modules/` → Installed dependencies  
- `log.txt` → Update logs and debugging output  
- `.gitignore..txt` → Git ignore configuration *(may require renaming)*  

---

# 🚀 About M&S Central

**M&S Central** is designed to be the central hub for competitive tracking within the *Mario & Sonic* series.

## Features

- 📊 Live leaderboards  
- 🥇 World record tracking  
- 📅 Historical data analysis  
- 🔄 Automated updates  

---

# 📝 Notes

- The **active APIs** are located in:
  - `/data`
  - `/leaderboards`
  - `/wr-history`
- All other JSON files are considered **deprecated (legacy)**  
- The system is fully **automation-driven**, minimizing manual maintenance  
