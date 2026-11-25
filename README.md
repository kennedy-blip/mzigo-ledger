# MzigoLedger

Cargo tariff, volumetric weight and split-payout operations workspace. Rust compiled to WebAssembly owns freight calculations and shipment status validation. React is a presentation shell; Dexie stores records offline.

## Requirements
Node.js 20+, Rust stable, wasm32-unknown-unknown target, wasm-pack. Android builds additionally require Java 21 and Android SDK.

## Local development
```bash
npm install
npm run dev
npm run build
cd rust-core && cargo test
```
The predev and prebuild hooks compile the Rust crate to `rust-core/pkg` using wasm-pack.

## Android
```bash
npm install
npm run build
npx cap add android
npx cap sync android
npx cap open android
```
GitHub Actions builds and publishes a debug APK release named **MzigoLedger-latest** on pushes to main or manual workflow dispatch. The Vite build uses the WASM and top-level-await plugins to bundle the generated Rust module.

## Vercel
Import the repository at its root. Build command: `npm run build`; output: `dist`. The build script installs Rust/wasm-pack if absent and emits the WASM package before Vite bundles the app. Vercel headers specify `application/wasm` for WASM assets.

## Domain rules
- Volumetric kg = L × W × H × pieces / divisor.
- Chargeable kg = max(volumetric kg, deadweight kg).
- Freight total = base + chargeable kg × selected tier rate + fuel percentage + flat cess + handling.
- Payout shares are percentages of revenue; depot handling is a flat fee. Route margin subtracts payout allocations and operating cost basis.
- Status flow: Booked → In Transit → At Hub → Delivered. At Hub may return to In Transit for onward carriage.

## Security and operational scope
This is an offline-first, single-device ledger, not a synchronized multi-user accounting service. The role switch is a client-side workflow guard, not an authentication or authorization boundary. Add authenticated APIs, server-side permissions, encrypted backups, and a signed release process before using it for regulated or high-value settlements. Verify rate cards and tax treatment with your carrier contracts and applicable local rules.
