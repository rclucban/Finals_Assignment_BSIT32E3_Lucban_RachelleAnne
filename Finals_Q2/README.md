# Todo App - Frontend (Finals_Q2)

## Setup and Execution
1. Navigate to `Finals_Q2`.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:5173` in your browser.

## Technical Debt Fixed
As per the Technical Audit:
1. **Filter Logic**: Replaced property-based filtering with ID-based filtering to avoid mismatches.
2. **Update Logic**: Replaced `filter` with `map` for list updates to ensure item properties are preserved while updating specific fields.
3. **Reconciliation**: Replaced `index` keys with unique `todo.id` to prevent UI glitches during list reordering/deletion.

## Features
- **Global Themes**:midnight, emerald, and solarized.
- **Full Backend Sync**: All operations are persisted to the .NET API.
- **Responsive UI**: Built with modern CSS and React components.
