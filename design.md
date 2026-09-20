# Green's Panel UI Design

## Reference Snapshot

The pasted reference is a LoopAI/Aero analytics workspace screenshot.

- Reference aspect ratio: approximately 1007 x 647 pixels.
- Composition: full lavender background, centered white application shell, compact header, analytics content grid, and a narrow assistant panel.
- Overall visual weight: white surfaces occupy most of the frame; lavender is atmospheric rather than dominant; purple and mint are reserved for actions and statuses.
- The reference is intentionally quiet: thin or invisible borders, small shadows, short labels, compact rows, and generous white space.

## Page Geometry

### Outer canvas

- Fill the viewport with a pale lavender background: `#eeecfa` to `#f6f5fd`.
- Add soft but visible geometric shapes near the corners: angled lavender and mint bands, a rotated outlined panel shape, and a circular outlined accent.
- Light geometric accents use muted darker tones such as `rgba(122, 108, 194, .22)` and `rgba(72, 157, 143, .20)`.
- Dark geometric accents use low-contrast lavender and mint tones such as `rgba(110, 91, 190, .12)` and `rgba(51, 133, 120, .10)`.
- Avoid the old visible 40px grid texture on the login screen.
- Keep the main shell centered horizontally and vertically with an approximate 5 percent outer margin.

### Application shell

- Width: approximately `92vw`, capped near `1440px` on large screens.
- Height: approximately `92vh`, with a minimum height that keeps the main dashboard visible.
- Background: white with slight transparency only if the canvas remains visible at the edges.
- Border: white or a barely visible lavender line, about `1px`.
- Radius: `16px` to `20px`.
- Shadow: broad, soft, low-opacity shadow such as `0 18px 60px rgba(87, 75, 140, .12)`.
- Inner content should use a consistent `16px` to `22px` gutter.

## Header and Navigation

### Header row

- Height: approximately `64px`.
- Layout: horizontal flex row with brand at left, navigation in the center, utility actions at right.
- Background: white.
- Bottom divider: optional, extremely light, never darker than `#f0eff6`.
- Horizontal padding: `22px` to `28px`.

### Brand

- Brand mark: circular lavender icon, approximately `28px` to `32px`.
- Brand name: `LoopAI` style treatment, dark navy-black, `11px` to `13px`, weight `700`.
- The icon may be followed by small colored collaborator circles and a light add button.
- Collaborator circles use mint, sky blue, and green; each is `22px` to `26px` with a slight overlap.

### Primary navigation

- Items: `Overview`, `Clients`, `Projects`, `Inbox`, `Analytics`.
- Font size: `10px` to `12px`.
- Weight: `600` for the active item and `500` for inactive items.
- Active item: white or near-white pill with a lavender outline and dark text.
- Inactive items: transparent or white pills with a very light gray-lavender outline.
- Navigation chip radius: `7%`.
- Horizontal padding: `14px` to `17px`.
- Vertical padding: `7px` to `9px`.
- Gap: `5px` to `8px`.
- Hover state: pale lavender fill, purple text, no movement.

### Utility actions

- Use compact circular or rounded-square icon controls for settings, notifications, and profile.
- Control size: `28px` to `32px`.
- Background: white or `#fafafd`.
- Border: `1px solid #efedf5` or invisible.
- Notification control may show a tiny coral dot.
- Profile avatar: circular, approximately `28px`; add a small mint online dot at bottom-right.

## Typography

- Primary font: `Inter`, `ui-sans-serif`, `system-ui`, sans-serif.
- Do not use display fonts for dashboard content.
- Main page heading: `22px` to `26px`, weight `800`, color `#211c38`.
- Section heading: `11px` to `13px`, weight `700`, color `#24203c`.
- Metric value: `17px` to `21px`, weight `800` or `900`, color `#211c38`.
- Body copy: `10px` to `12px`, weight `400` or `500`, color `#77738a`.
- Metadata and labels: `8px` to `10px`, uppercase where useful, letter spacing about `.08em`, color `#9b97aa`.
- Buttons: `10px` to `12px`, weight `600` to `700`.
- Avoid pure black. Prefer `#211c38`, `#302b49`, and `#706b82`.
- Line height: approximately `1.35` for labels and `1.5` for descriptions.

## Radius System

- Buttons: `border-radius: 5%`.
- Cards and panels: `border-radius: 5%`.
- Chips, badges, tags, and compact status pills: `border-radius: 7%`.
- Use these percentage values consistently instead of mixing arbitrary radius values.
- The outer application shell may retain a larger framing radius because it is the page container, not a card or button.

## Color Tokens

### Light theme

```css
:root {
	--canvas: #eeecfa;
	--canvas-soft: #f7f6fd;
	--surface: #ffffff;
	--surface-soft: #fafafd;
	--surface-lavender: #f0efff;
	--ink: #211c38;
	--ink-soft: #6f6a82;
	--ink-faint: #9b97aa;
	--line: #efedf5;
	--purple: #7b6bdd;
	--purple-deep: #6555c9;
	--purple-soft: #eeeaff;
	--mint: #2fc49b;
	--mint-soft: #e8faf5;
	--blue: #75a8e8;
	--coral: #ef8f97;
	--yellow: #e9ba56;
}
```

### Dark theme

```css
[data-theme="dark"] {
	--canvas: #17181d;
	--canvas-soft: #1e1f26;
	--surface: #292a31;
	--surface-soft: #24252c;
	--surface-lavender: #302c43;
	--ink: #f2f0fa;
	--ink-soft: #b0adbd;
	--ink-faint: #888496;
	--line: #3a3944;
	--purple: #aa98ff;
	--purple-deep: #9380ef;
	--purple-soft: #38304f;
	--mint: #36d49d;
	--mint-soft: #203d38;
}
```

## Summary Metric Cards

- Place three or more equal-width cards in a responsive row.
- Card height: approximately `74px` to `84px`.
- Card radius: `5%`.
- Card background: white.
- Card border: invisible or `1px solid #f1eff7`.
- Shadow: minimal, for example `0 3px 12px rgba(75, 63, 125, .045)`.
- Padding: `12px` to `14px`.
- Card title: `10px` to `11px`, weight `700`.
- Metric: `18px` to `20px`, weight `800`.
- Comparison text: `9px`, muted gray, aligned near the metric baseline.
- Change badges: compact chips with mint, coral, or lavender fills; radius `7%`.

## Analytics Panel

- Use a large white card below the metrics row.
- Card radius: `5%`.
- Padding: `14px` to `18px`.
- Header contains title at left and compact `Earnings`, date range, and download controls at right.
- Chart legend uses small colored dots followed by `Actual` and `AI Projected`.
- Chart grid lines are extremely faint, approximately `rgba(120, 110, 160, .08)`.
- Data visualization uses mint circular points with a central lavender highlighted series.
- Highlighted date uses a lavender label or pill, not a thick axis line.
- Tooltip is a small white or pale lavender card with a `5%` radius and a soft shadow.
- `Run Analysis` is a full-width or compact lavender gradient button with white text.

## Priority Tasks Panel

- Use a white card on the right side of the desktop content area.
- Header: `Priority tasks` at left and a small `See all` link at right.
- Each task row has a small circular progress indicator, task title, date, completion count, and chevron.
- Row height: approximately `44px` to `52px`.
- Divider: avoid visible lines; use row spacing and alternating very pale lavender hover fill.
- First or active task row may use `#f5f1ff` with lavender text.
- Task title: `10px` to `11px`, weight `700`.
- Supporting text: `8px` to `9px`, muted gray.

## Assistant Panel

- Place beneath the priority tasks card on desktop.
- Background: pale blue-lavender gradient, approximately `#e5e3fa` to `#e2f4f5`.
- Card radius: `5%`.
- Padding: `14px`.
- Greeting: small centered muted text.
- Heading: centered, `17px` to `20px`, weight `800`.
- Assistant provider tabs are compact pills; active provider uses white background and purple text.
- Suggested actions use a two-column grid of white tiles.
- Tile radius: `5%`.
- Tile height: approximately `58px` to `66px`.
- Each tile has a small colored icon, compact title, and subtle hover lift.
- Prompt input is a white rounded pill at the bottom with muted placeholder text and a small action icon.

## Project / Data Table

- Use a large white card below the analytics panel.
- Header contains `Manage Projects` and a search icon.
- Filter tabs are small text buttons with one active lavender outlined pill.
- Table column labels: `Client`, `Task`, `Note`, `Due on`, `Price`, `Status`, `More`.
- Column labels use `8px` to `9px` muted uppercase or sentence-case text.
- Rows use `10px` to `11px` text and approximately `42px` to `50px` height.
- Client avatar is circular, approximately `25px` to `30px`, with a small status marker.
- Project title is dark and semibold; subtitle is muted and smaller.
- Status values use compact filled pills: yellow for in progress, blue for review, gray for draft.
- More actions use a vertical ellipsis with no visible border.
- Do not use heavy table rules; use whitespace and subtle row hover backgrounds.

## Existing Green's Panel Mapping

- Existing dashboard header maps to the reference header row.
- Existing total, online, offline, bank SMS, and card counts map to summary metric cards.
- Existing filter strip maps to the reference navigation/filter pills.
- Existing device cards map to project/data cards.
- Existing Firebase summary and consolidated bank balance sections map to analytics/data panels.
- Existing device detail drawer maps to a focused side panel with the same white, lavender, and mint surface language.
- Existing notification toast should use a compact lavender or mint status surface.
- Preserve all Firebase, SMS, balance, card, device, import, logout, and drawer interactions.

## Login Screen Notes

- Use `img.png` in a fixed `72px x 72px` hero image box.
- Saved Firebase account cards use a `5%` radius.
- The account-count badge is shifted slightly left without moving the Delete All action.
- `Delete All` uses a larger `36px` control height and a `5%` radius.
- New Account and Import Excel / CSV are buttons with visible fills and a `5%` radius.
- Firebase URL previews show at least a readable 30-character prefix.
- Text selection uses lavender in light mode and dark lavender in dark mode.
- Light login canvas is near-white with very soft lavender and mint atmospheric gradients.

### New Firebase Account screen

- Reuse the same hero, geometric background, white card, typography, spacing, and theme toggle as the saved-account screen.
- The heading is `New Firebase Account`, aligned beside a compact back button.
- The optional APK upload area is a `7px` radius dashed lavender dropzone with a pale lavender fill.
- Upload icon tile uses a soft lavender square and purple icon color.
- Field labels are uppercase, approximately `10px`, semibold, muted lavender-gray, with `.08em` tracking.
- Firebase URL and authentication secret fields are `44px` tall, white in light mode, dark elevated surfaces in dark mode, and use a `7px` radius.
- Focused fields use a complete `1px solid #9a87ee` lavender border and a `3px` lavender focus ring in light mode.
- Dark-theme focused fields use `#b19fff` with a slightly stronger lavender ring.
- `Save & Connect` is a purple gradient primary button with a `7px` radius and soft purple shadow.
- `Cancel` is a pale lavender secondary button with a `7px` radius.
- Preserve APK parsing, URL validation, secret handling, connection errors, and cancel/back behavior.

## Responsive Rules

- At widths below `780px`, stack metric cards and content panels.
- Keep header controls usable without horizontal overflow.
- Convert multi-column device/project grids to one or two columns.
- Keep card padding between `12px` and `16px` on phones.
- Let assistant tiles remain two columns when each tile can keep at least `130px`; otherwise stack them.
- Keep tap targets at least `32px` high and separate destructive actions from primary actions.
- Preserve readable text without using viewport-scaled font sizes.

## Motion and States

- Use short `150ms` to `220ms` transitions for hover and focus.
- Hover should change fill, shadow, or text color rather than visibly move large sections.
- Active navigation uses a lavender fill or outline.
- Focus uses a lavender ring with at least `3px` total visible contrast.
- Loading uses a small mint or lavender spinner.
- Success uses mint; warning uses muted yellow; destructive state uses coral-red.
- Respect `prefers-reduced-motion` by disabling decorative movement.
