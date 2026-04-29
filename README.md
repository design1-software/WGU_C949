# C949 — DSA Daily

An interactive daily study app for **WGU's C949 Data Structures & Algorithms** exam. Work through 17 modules covering every topic on the OA, earn XP, maintain a streak, and compete on a live leaderboard — all for free.

**Live app:** [wgu-c949.netlify.app](https://wgu-c949.netlify.app)

---

## Features

| Feature | Details |
|---|---|
| 📚 17 study modules | Every C949 topic, ordered by exam weight |
| ❓ 4 question types | Lesson cards, multiple choice, fill-in-the-blank, matching |
| ⭐ XP & streak system | 20–30 XP per module; daily streak tracked across sessions |
| ❤️ Lives | 3 hearts per module; wrong answers cost a heart |
| 🏆 Live leaderboard | Top 50 users ranked by XP, powered by Airtable |
| ☀️ Light / dark mode | Toggle persists across sessions via localStorage |
| 🔁 Review mode | Any completed module stays clickable for unlimited review |
| 🔒 Privacy-first | No accounts, no passwords, no tracking beyond progress |

---

## The 17 Modules

| # | Module | Topics |
|---|---|---|
| 1 | 📊 Big-O Notation | Time & space complexity, the 7 complexities, simplification rules |
| 2 | 🧩 Algorithm Properties | 6 required properties, 8 quality factors, algorithm types |
| 3 | 🔁 Recursion | Base case, recursive case, call stack, stack overflow |
| 4 | 🔍 Searching Algorithms | Linear search O(n), binary search O(log n), prerequisites |
| 5 | 🔀 Sorting Algorithms | Bubble, selection, insertion, merge, quick sort; stable vs. unstable |
| 6 | 📦 Arrays & Linked Lists | Indexing, contiguous memory, singly vs. doubly linked, trade-offs |
| 7 | 📚 Stacks, Queues & Deque | LIFO, FIFO, push/pop, enqueue/dequeue, double-ended queues |
| 8 | 🌳 Trees & Traversals | BST rules, in/pre/post-order traversal, height, balance |
| 9 | #️⃣ Hash Tables | Hash functions, collision resolution, chaining vs. open addressing |
| 10 | 🏔️ Heaps & Priority Queues | Min/max heap, heapify, priority queues, heap sort |
| 11 | 🕸️ Graphs | Directed/undirected, weighted, adjacency matrix vs. list, DFS/BFS |
| 12 | ⚙️ Variables & Types | Data types, scope, static vs. dynamic typing |
| 13 | 🔣 Operators & Precedence | Arithmetic, logical, bitwise, operator precedence rules |
| 14 | 🔄 Loops & Conditionals | for/while, if/else, nested loops, loop complexity |
| 15 | 🏗️ Classes & OOP | Encapsulation, inheritance, polymorphism, abstraction |
| 16 | 🧠 Memory & Concepts | Stack vs. heap memory, pointers, garbage collection |
| 17 | 🎒 Bags & Dictionaries | Unordered collections, key-value pairs, dictionary operations |

---

## Question Types

### Lesson Card
Instructional content with optional syntax-highlighted code blocks and visual diagrams. No answer required — press **CONTINUE** to advance.

```
┌─────────────────────────────────┐
│ [CONCEPT]                       │
│ What is Big-O?                  │
│                                 │
│ Big-O describes how runtime     │
│ grows as input size n grows...  │
│                                 │
│ ┌──────────────────────────┐    │
│ │ x = arr[0]   # O(1)      │    │
│ │ for i in arr: ...  # O(n)│    │
│ └──────────────────────────┘    │
└─────────────────────────────────┘
                        [ CONTINUE ]
```

### Multiple Choice (MCQ)
Four options, one correct. Instant color feedback — green for correct, red for wrong. Wrong answers cost a heart.

```
┌─────────────────────────────────┐
│ A function loops through an     │
│ array once. Time complexity?    │
│                                 │
│ [A]  O(1)                       │
│ [B]  O(log n)                   │
│ [C]  O(n)          ← selected   │
│ [D]  O(n²)                      │
└─────────────────────────────────┘
                          [ CHECK ]
```

### Fill in the Blank
Type your answer into the inline input. Accepts multiple valid phrasings.

```
Binary search halves the input each step.
Its complexity is O( _______ )
                         Answer: [log n  ]

✅ O(log n)! Halving = logarithmic. 1M items needs only ~20 steps.
```

**Example accepted answers for "log n":** `log n`, `logn`, `O(log n)`, `log(n)`

### Matching
Select a term on the left, then its definition on the right. Matched pairs lock green. All pairs must match to complete.

```
TERM                  DEFINITION
┌──────────┐          ┌─────────────────────┐
│  Greedy  │ ✓ ────→  │ Locally optimal     │
│          │          │ each step           │
└──────────┘          └─────────────────────┘
┌──────────┐          ┌─────────────────────┐
│Recursive │          │ Calls itself on     │
│          │          │ sub-problems        │
└──────────┘          └─────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript — no frameworks |
| Fonts | [Space Mono](https://fonts.google.com/specimen/Space+Mono) (code), [DM Sans](https://fonts.google.com/specimen/DM+Sans) (UI) |
| Hosting | [Netlify](https://netlify.com) |
| Serverless | Netlify Functions (Node.js 18, AWS Lambda) |
| Leaderboard DB | [Airtable](https://airtable.com) |
| Local storage | Browser `localStorage` (progress never requires a server) |

---

## Project Structure

```
WGU_C949/
├── index.html                  # Entire app — HTML, CSS, and JS in one file
├── netlify.toml                # Build config: publish dir, functions dir, Node version
├── netlify/
│   └── functions/
│       └── airtable.js         # Serverless proxy — keeps AT_PAT out of the browser
├── config.js                   # Local-only PAT placeholder (gitignored, not used in prod)
└── .gitignore                  # Excludes config.js and .DS_Store
```

### Why a single `index.html`?

The app has no build step, no bundler, and no dependencies to install. Every student can clone the repo and open `index.html` directly in a browser — it works offline for all study features. Only the leaderboard requires a network connection.

---

## Architecture: Airtable Proxy

The Airtable API token (`AT_PAT`) is stored as a **Netlify environment variable** and never sent to the browser. All leaderboard reads and writes go through a serverless function:

```
Browser
  │
  ├─ GET  /.netlify/functions/airtable?sort[0][field]=XP&...
  ├─ POST /.netlify/functions/airtable           { fields: {...} }
  └─ PATCH /.netlify/functions/airtable?recordId=recXXX  { fields: {...} }
            │
            ▼
  Netlify Function (airtable.js)
    • Reads AT_PAT from process.env
    • Attaches Authorization header
    • Forwards method + body + query params to Airtable REST API
            │
            ▼
  Airtable API  →  returns JSON  →  function forwards response  →  browser
```

**Without this proxy**, the token would have to live in client-side JavaScript where anyone could extract it from DevTools.

### Airtable Table Schema

| Field | Type | Description |
|---|---|---|
| Name | Single line text | User's first name |
| Email | Email | Uniqueness key across devices |
| XP | Number | Total experience points |
| Streak | Number | Consecutive days studied |
| Modules Completed | Number | Count of finished modules (0–17) |
| Last Active | Single line text | Date of last session |
| User Key | Single line text | `${name}-${email}` composite ID |

---

## Local Development

No install required for the app itself.

```bash
git clone https://github.com/design1-software/WGU_C949.git
cd WGU_C949
open index.html        # macOS
# or: start index.html  (Windows)
# or: xdg-open index.html (Linux)
```

All 17 modules, all question types, XP, streaks, and review mode work fully offline. Only the leaderboard sync is unavailable without the proxy running.

### Running the Leaderboard Locally

Install the [Netlify CLI](https://docs.netlify.com/cli/get-started/) and create a local `.env` file:

```bash
npm install -g netlify-cli

# Create a local env file (already gitignored via config.js exclusion)
echo "AT_PAT=your_real_token_here" > .env

netlify dev          # starts the app at http://localhost:8888
```

`netlify dev` serves `index.html` and runs the function at `/.netlify/functions/airtable` simultaneously, matching the production setup exactly.

---

## Deploying to Netlify

1. Push this repo to GitHub
2. In [Netlify](https://app.netlify.com), click **Add new site → Import an existing project** and select the repo
3. Build settings are automatic via `netlify.toml` (no build command, publish dir is `.`)
4. Go to **Site configuration → Environment variables** and add:

   | Key | Value |
   |---|---|
   | `AT_PAT` | Your Airtable Personal Access Token |

5. Trigger a redeploy — the leaderboard will be live

---

## Privacy

- **Name and email** are used only to save your progress and display your score on the leaderboard
- **No personal information** is ever shared with third parties
- **You will never be contacted** for any reason
- This app was built for educational purposes and is **completely free to use**

---

## License

MIT — do whatever you want with it. If it helps you pass C949, that's the whole point.
