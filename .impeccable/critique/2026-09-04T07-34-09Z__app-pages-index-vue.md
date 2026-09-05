---
target: the landing page
total_score: 17
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 3
timestamp: 2026-09-04T07-34-09Z
slug: app-pages-index-vue
---
Method: dual-agent (A: fecabef9-8211-451a-97e4-289953bbebae · B: 4b512b5a-ad26-4f02-8e69-3c31d929d8b6)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Pricing CTAs and hero “Tải ứng dụng” produce no status; demo form and FAQ do |
| 2 | Match System / Real World | 2 | VietQR / Zalo / quận names land; WhatsApp, Matter, English BEST VALUE, OwenHome vs Ohomi do not |
| 3 | User Control and Freedom | 2 | FAQ and mobile menu can exit; dead pricing / store / social links trap; demo success has no undo |
| 4 | Consistency and Standards | 1 | Nav `/demo` vs in-page `#final-cta`; “free trial” and “feature demo” are the same form; room buckets ≠ price tiers |
| 5 | Error Prevention | 2 | DemoForm validates; pricing, store, and FAQ “trang bảng giá” invite clicks that cannot succeed |
| 6 | Recognition Rather Than Recall | 2 | Plans and FAQ are visible; “Tải ứng dụng” destination and the promised feature demo are not |
| 7 | Flexibility and Efficiency | n/a | Persuade landing; no expert workflow beyond language + in-page jump |
| 8 | Aesthetic and Minimalist Design | 2 | Hero mockup is strong; below it a same-weight parade of glass cards, glows, and a 4-up pricing wall |
| 9 | Error Recovery | 2 | Phone errors are specific; submit failure says “gọi trực tiếp” with no number; dead CTAs have zero recovery |
| 10 | Help and Documentation | 2 | FAQ exists but opens on IoT brands the homepage no longer sells; fee answer cites a missing pricing page |
| **Total** | | **17/36** | **Poor** |

## Design Specificity Verdict

**Start here.** Mixed — locally authored in spots, category-interchangeable everywhere else.

**LLM assessment**: The hero phone is a real Ohomi host screenshot (Xin chào, Nhà/phòng, Hợp Đồng, 14.800.000đ). Landlord invoice HD-2026-0042, VietQR + Zalo invoicing, VND /phòng prices, CafeF / VnExpress logos, and Bình Thạnh / Quận 2 testimonials are product-specific. The chrome is not: OwenHome wordmark on an Ohomi site, IBM Plex Sans, teal-on-navy glass nav, a #1 pill, three identical ★★★★★ quote cards, six icon+pain+stat tiles, and four lookalike pricing columns. FAQ still leads with Tuya / Aqara / Matter after SmartHomeSection was removed from the page. Swap the screenshot and this is any 2025 proptech template.

**Deterministic scan**: CLI `detect.mjs` exited 2 with 3 source findings (0 errors):
- `codex-grid-background` advisory — `app/components/sections/HeroSection.vue` (decorative 28px radial dot field)
- `gradient-text` warning ×2 — `app/components/FeatureCard.vue` (false positives for this surface: FeatureCard is not mounted on the homepage; LandlordSection uses FeatureCard3D)

Runtime overlay (different finding set from the CLI) painted 137 labels. Dominant hits: AI color palette (~67), low-contrast text (~43 combined), glowing shadow accents, decorative radial spotlight glow, icon-tile-above-heading. These agree with the LLM’s “rented teal SaaS chrome” verdict and quantify the contrast problem the review described qualitatively. The detector cannot see dead buttons, split demo paths, or buyer/tier mismatch — those are LLM-only and confirmed in source.

**Visual overlays**: Injection succeeded on a fresh tab after a Nuxt remount wiped the first script. `detect.js` from `http://localhost:8400/detect.js` ran; overlays were visible (yellow bounds, orange summary bar). The live server was stopped after capture. If the [Human] tab is still open on `http://localhost:3000/`, the injected overlays remain until refresh.

## Overall Impression

A real Vietnamese rental-ops product is wearing a rented teal SaaS costume. The phone screenshot and the 3-field demo form are the only moments that feel like Ohomi. Everything between them is interchangeable cards, a split or dead conversion, and a price wall aimed at a different landlord than the hero just recruited. The single biggest opportunity is to pick one buyer (small VN chủ nhà), one action (book the 30-minute demo), and make logo, CTAs, FAQ, and pricing serve that person.

## What's Working

1. **Hero product shot** — Real Ohomi host UI (greeting, 6 module tiles, 14,8 triệu chart). This is the only frame that cannot be swapped onto another proptech site.
2. **DemoForm as the high-stakes object** — 3 fields, `type=tel`, room select, inline `aria-invalid` errors, loading + success, 24h / no-card / 30-minute trust line.
3. **Operational VN copy** — 30/15/7 alerts, VietQR, Zalo invoices, quận-pinned testimonials. More specific than the chrome around it.

## Priority Issues

### [P0] Conversion is broken or split
- **What**: Pricing buttons (`Bắt đầu ngay` / `Chọn gói này` / `Liên hệ tư vấn`) are inert `<button>`s with no handler. Hero `Tải ứng dụng` calls `scrollToMobile('#mobile-app')` but `MobileAppSection` is not on `index.vue`. Nav `Đặt lịch demo` goes to `/demo`; hero and landlord CTAs go to `#final-cta`. Tenant App Store / Play links are generic store homepages. Footer Facebook / Zalo / YouTube are `href="#"`.
- **Why it matters**: The primary action — understand Ohomi and request a demo or pick a plan — dead-ends at the highest-stakes moment.
- **Fix**: One demo destination. Wire every plan CTA to that form with the tier prefilled. Point `Tải ứng dụng` at a real listing or remove it. Kill `#` social.
- **Suggested command**: `/impeccable harden`

### [P1] Buyer mismatch on the price wall
- **What**: Hero sells `8 giờ/tuần` for a small landlord; form buckets start at 1–5 / 6–20 phòng; highlighted Growth / `BEST VALUE` starts at 101–300 phòng. `Dùng thử miễn phí` is a lead form, not a trial.
- **Why it matters**: The person the hero just convinced cannot recognize themselves on the price wall and is misled by the trial label.
- **Fix**: Highlight Starter (or a 1–20 plan). Align room select with tiers. Rename trial CTAs to demo.
- **Suggested command**: `/impeccable clarify`

### [P1] Brand split + category chrome
- **What**: Wordmark SVG still draws “OwenHome” (teal→amber gradient) on an Ohomi site. IBM Plex, glass pill nav, #1 badge, identical card grids. Overlay scan: ~67 AI-palette hits, stacked glows, ~43 low-contrast labels.
- **Why it matters**: Trust breaks in the first 2 seconds; the page looks rented, not owned. Low-contrast press/testimonial type fails Casey and Sam.
- **Fix**: One name. Let the product UI and VN ops language carry identity; stop scaffolding with SaaS-teal glass. Raise contrast on press, roles, and secondary type.
- **Suggested command**: `/impeccable bolder`

### [P1] FAQ and proof leftover from a cut IA
- **What**: First FAQ questions are Tuya / Aqara / Matter and tenant device apps; `SmartHomeSection` is not on the page. Fee answer says “xem trang bảng giá” with no link and no fee on `#pricing`. Press names are unlinked, low-contrast, `cursor: default`.
- **Why it matters**: First-timers hit jargon; Riley finds the promise/UI gap immediately.
- **Fix**: Open FAQ on rent, migration, price. Link `#pricing`. Put fees on the plans or stop claiming them.
- **Suggested command**: `/impeccable clarify`

### [P2] Load and mobile thumb-zone
- **What**: Six landlord tiles + tenant 2×2 + 4-plan stack. At ≤520px nav `Đặt lịch demo` is `display: none` and the burger omits Đăng nhập. Hero phone is a long swipe of decoration before social proof.
- **Why it matters**: Casey cannot reach the primary CTA with a thumb; Jordan cannot finish one decision.
- **Fix**: Role-gate or cut tenant from this scroll. Keep a thumb-zone demo control. Collapse secondary landlord cards.
- **Suggested command**: `/impeccable adapt`

## Persona Red Flags

**Jordan (Confused First-Timer)**: `#1` and `8 giờ/tuần` have no source. OwenHome logo vs “Về Ohomi”. `Tải ứng dụng` does nothing. `Dùng thử miễn phí` and `Xem demo tính năng` dump into the same 3-field form. FAQ #1 is Matter. `BEST VALUE` is English. No help at the form except three teal ticks.

**Riley (Deliberate Stress Tester)**: Plan CTAs are inert. Store badges → `apps.apple.com` / `play.google.com` homepages. Footer social → `#`. `#mobile-app` missing. FAQ “trang bảng giá” is not a route. Nav `/demo` vs `#final-cta`. Submit error asks you to call with no number. Form `50+` still maps to Starter (1–100). WhatsApp pain vs Zalo feature.

**Casey (Distracted Mobile User)**: ≤520px hides the nav demo CTA. Hero mockup forces a long swipe. EN/VI is a 12px pill in the top-right thumb dead zone. Four pricing cards push the form far below. Name/phone lack autocomplete. Success is “we’ll call in 24h” — state dies if the tab is killed. Overlay: dozens of low-contrast hits on secondary type.

## Cognitive Load

7/8 failed (high). Only grouping passed. Desktop TopNav exposes 8 controls; pricing shows 4 plans × 4 bullets + 4 CTAs. No role gate; tenant block interrupts the landlord path. Form room buckets do not map to price tiers.

## Emotional Journey

Peak at the hero phone. Immediate valley: faint press line, then three clone testimonials. Landlord proof pairs briefly reassure, then six tiles grind. Tenant stores are a mid-page audience switch. Pricing is the high-stakes valley (wrong buyer, English badge, dead buttons). FAQ opens on Matter. End is the strongest close — then split with `/demo`, and success is a callback promise, not a booked slot.

## Minor Observations

- Press bar (`ĐÃ XUẤT HIỆN TRÊN`) is ~0.38–0.5 alpha, unlinked.
- Testimonial role lines ~11px / 0.45 alpha; all three avatars share one teal gradient.
- FeatureCard3D invoice amount uses `--oh-text` on `--oh-bg` (near-invisible).
- `.reveal-up { opacity: 0 }` waits on GSAP; FAQ is the only below-fold block not gated.
- Footer `© 2026 Ohomi. All rights reserved.` stays English on VI.
- Language is client-only (`owen_language`); URL stays `/`.
- Unused i18n still describes a different page (hero/problem/tabs/comparison).
- CLI `gradient-text` on `FeatureCard.vue` is file-true, live-homepage-false.

## Questions to Consider

- If the buyer is a 6–20 phòng chủ nhà, why is BEST VALUE 101–300 phòng?
- Why does the logo still say OwenHome on an Ohomi marketing site?
- What is `Tải ứng dụng` for if `#mobile-app` is gone and the stores are homepages?
- Is this a landlord acquisition page or a tenant app page — and why does it refuse to choose?
- Why would anyone tap `Chọn gói này` a second time after the first tap did nothing?
