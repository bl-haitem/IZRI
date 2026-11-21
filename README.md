# IZRI

**VMS Industrie motorcycle sales and demand intelligence dashboard**

IZRI is a modern web dashboard for managing motorcycle sales, dealerships, inventory, customer registrations, after-sales activity, and demand planning for VMS Industrie. The interface is designed around two operating views:

- **Usine** — a national network view for factory and super-admin operations.
- **Showroom** — a focused local view for a dealership team, currently configured for the Alger showroom.

The project is currently a frontend prototype powered by realistic local mock data. It requires no backend or database to run locally.

## Features

### National factory view

- KPI dashboard for sales, revenue, stock, registrations, and network activity.
- Sales register with sale details, editing, cancellation, and new-sale workflows.
- Dealership network management with status, performance, stock, and registration indicators.
- Motorcycle catalog with model details, technical specifications, pricing, and availability.
- Factory and dealership stock monitoring.
- Customer registration and vehicle registration tracking.
- Maintenance and after-sales analytics.
- Demand forecasting with approve/reject actions for replenishment planning.
- National sales charts, dealership rankings, segment analysis, and Algeria wilaya visualization.
- Report dashboards and custom report configuration UI.
- Platform settings screen.

### Local showroom view

- Showroom-specific dashboard and KPIs.
- Local sales and registration workflow.
- Physical showroom stock view.
- Catalog and pricing view scoped to the current showroom.
- Quick switching between factory and showroom modes.

### User experience

- Responsive layout for desktop, tablet, and mobile screens.
- French-language business interface and Algeria-focused terminology.
- Red, black, and white VMS-inspired visual system.
- Interactive charts, tables, cards, drawers, modals, toast notifications, and filters.
- Data persistence in the browser through `localStorage`.
- Vercel-compatible single-page application routing.

## Technology stack

- [React 19](https://react.dev/)
- [Vite 6](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) components
- [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)
- [Recharts](https://recharts.org/) for data visualizations
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) integration
- ESLint 9

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/bl-haitem/IZRI.git
cd IZRI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will print the local URL in the terminal, usually:

```text
http://localhost:5173
```

### 4. Create a production build

```bash
npm run build
```

### 5. Preview the production build locally

```bash
npm run preview
```

### 6. Run lint checks

```bash
npm run lint
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the optimized production bundle. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint across the project. |

## How the application works

### Switching operating modes

Use the mode switcher in the left sidebar to move between:

- **Usine**: access to the full national management experience.
- **Showroom**: access to the dashboard, sales, stock, and catalog for the configured local dealership.

When showroom mode is selected, sales are filtered to the active showroom and unsupported national pages are hidden from the navigation.

### Managing local data

The initial dataset is defined in `src/data/mockData.js`. The application loads and saves motorcycles, dealerships, sales, and forecasts using browser `localStorage`.

To reset the demo data, clear the site data for the local development origin in your browser and reload the application.

### Adding a new sale

Use the **New Sale** action from the header or sales pages. The prototype updates the sale list and adjusts the associated motorcycle and dealership counters locally.

### Forecast actions

Forecast records can be approved or rejected from the demand forecasting page. These actions update the local browser state and display a confirmation toast.

## Project structure

```text
.
├── public/
│   ├── algeria-69-wilayas.svg   # Algeria map asset
│   ├── izri-logo.jpg            # Application logo
│   └── models/                  # Public motorcycle assets
├── scripts/
│   └── extractWilayas.cjs       # Wilaya data extraction utility
├── src/
│   ├── components/              # Shared dashboard components and modals
│   ├── data/                    # Mock business data and wilaya data
│   ├── lib/                     # Shared utilities
│   ├── pages/                   # Main application screens
│   ├── App.jsx                  # Application state and page orchestration
│   ├── index.css                # Global styles and Tailwind entrypoint
│   └── main.jsx                 # React entrypoint
├── index.html
├── tailwind.config.js
├── vite.config.js
└── vercel.json                  # SPA fallback configuration
```

## Data and backend status

IZRI currently runs as a client-side demonstration application:

- There is no API server, authentication provider, or external database in this repository.
- Business data is seeded from local JavaScript modules and persisted in `localStorage`.
- Report export controls currently demonstrate the export workflow with UI feedback; production CSV, XLSX, or PDF generation is not connected to a backend.
- Login and logout controls are presentational and do not establish a real authenticated session.

For production use, the next integration layer would typically include a secure API, role-based authentication, server-side persistence, audit logs, real report generation, and synchronization between factories and dealerships.

## Deployment

The repository includes a `vercel.json` rewrite so client-side routes resolve to the Vite application entrypoint. A typical Vercel deployment can use:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

No environment variables are required by the current prototype.

## Development guidelines

- Keep reusable UI in `src/components/` and screen-level composition in `src/pages/`.
- Keep seeded business data in `src/data/` rather than embedding large datasets in components.
- Preserve the existing French UI labels and Algeria-specific business terminology when extending screens.
- Reuse existing Tailwind utility patterns and shared components before introducing new styling systems.
- Run both `npm run lint` and `npm run build` before submitting a change.

## Contributing

1. Fork the repository.
2. Create a focused branch:

   ```bash
   git checkout -b feat/your-change
   ```

3. Install dependencies and run the development server.
4. Make the smallest change that fully addresses the feature or fix.
5. Run the lint and production build checks.
6. Open a pull request with a clear description and screenshots for visual changes.

## License

No license file is currently included in this repository. Add a license before distributing IZRI or incorporating it into another product.

## Acknowledgements

IZRI is built for the VMS Industrie motorcycle sales and network-management context, with an Algeria-focused dashboard experience and dealership workflow.
