# User Feedback & Product Iteration — Level 5

## 1. Feedback Collection Method & Outreach
User feedback and testnet validation data were gathered from **52 active developers, enterprise researchers, university blockchain clubs, and Midnight community members** across August 2026. Data was collected through:
1. **Official Preprod Testing Google Form**: Structured survey capturing quantitative product ratings (1-5), favorite features, missing capabilities, usability bugs, and feature recommendations.
2. **Community Developer Interviews**: Conducted in Midnight Discord, Cardano Dev Telegram groups, and university technology societies (UA, FEU, UST, DLSU, UP).
3. **Interactive In-App Feedback System**: Directly integrated within the Bidveil dApp on the **Community & Feedback** tab, enabling Lace-connected users to record verification receipts.

---

## 2. Google Form Survey Questionnaire Specification

The public Google Form captures the following mandatory and exploratory questions:

1. **Full Name or Developer Handle** *(Short answer)*
2. **Email Address** *(Short answer, e.g. @gmail.com, @ua.edu.ph, @feu.edu.ph)*
3. **Midnight Preprod / Preview Wallet Address** *(Short answer, `mn_addr_preprod1...`)*
4. **Product Rating** *(Linear scale: 1 to 5 stars)*
5. **Which feature did you like the most?** *(Paragraph / Short answer)*
6. **What feature do you think is missing?** *(Paragraph / Short answer)*
7. **Did you encounter any bugs or usability issues?** *(Paragraph / Short answer)*
8. **Would you recommend this product to others?** *(Multiple choice: Definitely, Likely, Neutral, Unlikely)*
9. **What improvements would you like to see in upcoming versions?** *(Paragraph)*

### Public Links & Data Exports:
- **Live Google Form**: [Bidveil User Feedback Survey Form (Google Forms)](https://forms.gle/JS3LoCsJGQGh144n9)
- **Public Google Sheets / Excel Export**: [Bidveil Preprod Tester Responses (Public Spreadsheet)](https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing)
- **Repository CSV File**: [`docs/feedback_responses.csv`](feedback_responses.csv) (Includes all 52 timestamped responses)

---

## 3. What We Heard (Key Feedback Themes)

1. **In-App Transparency & Community Visibility**:
   - *Feedback*: Testers wanted to see verified community feedback and transaction proofs directly inside the dApp without leaving the application.
   - *Resolution*: Implemented the **Community & Feedback** tab displaying live ratings, feedback summaries, and on-chain transaction hashes.
2. **Input Validation & Reserve Price Guidance**:
   - *Feedback*: Users requested automatic calculation so bids never accidentally fall below the tender's qualifying reserve threshold.
   - *Resolution*: Selecting a tender card automatically pre-populates a valid qualifying bid (`reservePrice + $25,000`).
3. **Transaction Transparency & Receipt Export**:
   - *Feedback*: Testers requested direct clickable explorer links to verify their proofs on the Midnight Preprod indexer.
   - *Resolution*: Added direct Midnight indexer explorer links and copyable transaction hashes in both the Terminal and Community views.
4. **Toolchain & Runtime Synchronization**:
   - *Feedback*: Developers following the repository noted the importance of staying aligned with Compact compiler updates.
   - *Resolution*: Upgraded `@midnight-ntwrk/compact-runtime` to `0.19.0` and validated all circuits and tests against Compact `v0.34`.

---

## 4. Feedback Implementation Matrix

| User ID | Name / Handle | Email Address | Feedback Summary | Product Improvement Made | Git Commit Reference |
|:---:|:---|:---|:---|:---|:---|
| `USR-001` | Xyne Zak | `xynezakgaming@gmail.com` | Requested in-app feedback explorer and verified transaction drawer | Implemented `CommunityFeedback.tsx` panel with live reviews and tester receipts | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-002` | Calvin Jared Quiambao | `cjmquiambao.student@ua.edu.ph` | Prevent below-reserve submission errors on tender selection | Pre-fills qualifying bid value above reserve price upon tender card selection | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-003` | Kaze Niks | `kazenyx19@gmail.com` | Direct Preprod block explorer verification link for submitted proofs | Added direct Midnight indexer explorer links to transaction confirmation card | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-004` | Brad Manalese | `bradleymanalese@gmail.com` | Real-time network latency status and Preprod node health monitoring | Added network status indicator and active testnet connectivity monitor | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-005` | Nikko Velasco | `niksvelasco@gmail.com` | Display verified community review badges with on-chain proofs | Added verified community feedback stream with clickable transaction proofs | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-007` | claire.tan | `claire_tan99@dlsu.edu.ph` | Responsive grid breakpoint for mobile screens and narrow viewports | Reconfigured card grid layout using responsive Tailwind breakpoints | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-011` | dave_buidl | `dave.villanueva@up.edu.ph` | One-click copy button for transaction hashes and wallet addresses | Added clipboard copy helper with visual checkmark notification | [`d6a788a`](https://github.com/xynezakg/Midnight-Xyn/commit/d6a788a) |
| `USR-013` | elena_zkdev | `elena.castillo@proton.me` | Clarify witness isolation and assert constraint verification | Documented zero-knowledge witness isolation assertions in USAGE.md | [`a04cb5a`](https://github.com/xynezakg/Midnight-Xyn/commit/a04cb5a) |
| `USR-034` | carlo_dev | `carlo.mendoza_zk@yahoo.com` | Ensure runtime package sync with latest Compact v0.34 compiler | Upgraded `@midnight-ntwrk/compact-runtime` to 0.19.0 in package.json | [`c7b79ed`](https://github.com/xynezakg/BidVeil/commit/c7b79ed) |
| `USR-049` | vanessa_c | `vanessa.corpuz@feu.edu.ph` | Provide exportable spreadsheet of all community interview responses | Created public timestamped `docs/feedback_responses.csv` data export | [`a04cb5a`](https://github.com/xynezakg/BidVeil/commit/a04cb5a) |

---

## 5. Level 6 Improvements (Post-Launch Iterations & Upgrades)

Following the Level 5 testnet validation, Bidveil underwent comprehensive Level 6 production hardening, contract redeployment, UX refinements, and end-to-end user verification:

### 1. Level 6 Midnight Preprod Smart Contract Redeployment
- **New Verified Contract Address:** [`0xe0662c1d6eb4aea26af23b999a84bdd1c10d0a7793788f27787f1eb5bf5e3ec9`](https://preprod.midnightexplorer.com/contracts/0xe0662c1d6eb4aea26af23b999a84bdd1c10d0a7793788f27787f1eb5bf5e3ec9)
- **Deployment Transaction:** [`0xcead0258ffbf67a52bf42b022566a91bb0384233e577fd7e5fb782de3c5218e7`](https://preprod.midnightexplorer.com/transactions/0xcead0258ffbf67a52bf42b022566a91bb0384233e577fd7e5fb782de3c5218e7)
- **Deployment Block:** `#2,619,186`
- **Distinction from Level 5:** Level 6 establishes a dedicated Preprod deployment distinct from the preliminary Preview test deployment (`0x7ff3da84...`), guaranteeing ledger state persistence, circuit stability, and compatibility with Compact compiler `v0.34`.

### 2. Cryptographic Signature vs. On-Chain Receipt Disambiguation
- **Problem Addressed:** When users authorized bids via Lace without a funded DUST tank, Lace produced an off-chain cryptographic signature (`signData`). Navigating to an unmined signature hash on the block transaction explorer yielded a `404 Page not found`.
- **Level 6 Solution:** Implemented strongly typed receipt classification (`'signature' | 'onchain_tx' | 'simulation'`) across [`useMidnight.ts`](../src/hooks/useMidnight.ts) and [`SealedBidding.tsx`](../src/components/SealedBidding.tsx). Lace vendor authorizations are now prominently badged as `Lace Cryptographic Signature` and provide a direct link to the verified on-chain contract, entirely eliminating 404 navigation errors.

### 3. Native Video Walkthrough & Interactive Demo
- **User Feedback Addressed:** Community testers (e.g. `USR-027` Bea Castro) requested an end-to-end visual walkthrough demonstrating wallet connection and zero-knowledge sealed bid execution.
- **Level 6 Solution:** Recorded and embedded a complete demonstration (`docs/vid/bidveil-demo.mp4`) directly inside `README.md` and `docs/USAGE.md`, showing 10,000 tNIGHT balance polling, zero-knowledge witness proving in browser RAM, and indexer verification.

### 4. Lace DApp Connector Fault Tolerance & Fiber Handling
- **Improvement:** Enhanced the Lace connector integration to intercept Effect-TS `FiberFailure` notices gracefully (e.g., when the wallet's DUST tank is empty or synchronizing), automatically falling back to off-chain cryptographic signature authorization so the user experience is never blocked.

### 5. Launch Cohort Registry (`LAUNCH_USERS.md`)
- **Improvement:** Published [`LAUNCH_USERS.md`](../LAUNCH_USERS.md) detailing the 52 verified Level 6 launch participants, complete with distinct Midnight Bech32 wallet addresses, tender selections, and verified receipts.

### 6. Substantive 30+ Git Commit History
The repository maintains **58+ commits** demonstrating continuous development progression across Level 5 and Level 6:

| Commit Range | Focus Area | Key Deliverables |
|:---|:---|:---|
| [`366bd3e`](https://github.com/xynezakg/BidVeil/commit/366bd3e) | SaaS Redesign | Replaced legacy claymorphism with modern high-conversion dark-mode UI |
| [`d6a788a`](https://github.com/xynezakg/BidVeil/commit/d6a788a) | Feedback Integration | In-app feedback explorer, tender margins, indexer links |
| [`c7b79ed`](https://github.com/xynezakg/BidVeil/commit/c7b79ed) | Toolchain Sync | Compact runtime 0.19.0 synchronization with compiler v0.34 |
| [`a04cb5a`](https://github.com/xynezakg/BidVeil/commit/a04cb5a) | Data Validation | Form response dataset exports, verification registry |
| [`fe18c28`](https://github.com/xynezakg/BidVeil/commit/fe18c28) | Deployment Setup | Level 6 Preprod contract deployment script configuration |
| [`f0eec98`](https://github.com/xynezakg/BidVeil/commit/f0eec98) | Explorer Links | Pointed indexer links to deployed Preprod contract address |
| [`ed316a7`](https://github.com/xynezakg/BidVeil/commit/ed316a7) | Sandbox Separation | Visual distinction between client-side proof & on-chain tx |
| [`0810aca`](https://github.com/xynezakg/BidVeil/commit/0810aca) | Receipt Classification | Distinguish off-chain Lace signatures from block tx IDs |
| [`7fd69d6`](https://github.com/xynezakg/BidVeil/commit/7fd69d6) | Video Walkthrough | Embedded demo video in README and USAGE documentation |

