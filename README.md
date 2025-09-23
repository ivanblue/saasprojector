# SaaS Revenue Projector

A modern, interactive web application for modeling and projecting SaaS subscription revenue growth. Built with Next.js 15, TypeScript, and Tailwind CSS.

![SaaS Revenue Projector](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

- **Interactive Revenue Modeling**: Adjust key growth parameters with intuitive sliders
- **Real-time Projections**: See immediate updates to revenue forecasts as you adjust inputs
- **Comprehensive Metrics**: Track MRR, ARR, customer growth, and total revenue
- **Visual Analytics**: Beautiful charts showing growth trends over time
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Helpful Tooltips**: Contextual information for all metrics and inputs

## Key Metrics

- **Monthly Recurring Revenue (MRR)**: Track your subscription income growth
- **Annual Recurring Revenue (ARR)**: Annualized revenue projections
- **Customer Growth**: Model customer acquisition and retention
- **Churn Analysis**: Understand the impact of customer churn on growth
- **Revenue Projections**: Long-term financial forecasting

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd saasprojector
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Set up Google Analytics (optional):

   - Create a `.env.local` file in the root directory
   - Add your Google Analytics 4 Measurement ID:

   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Set Initial Parameters**: Adjust the starting customer count and MRR
2. **Configure Growth**: Set your monthly growth rate and churn rate
3. **Choose Timeline**: Select how many months to project
4. **Analyze Results**: Review the summary cards and growth charts
5. **Iterate**: Adjust parameters to model different scenarios

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Charts**: Recharts
- **Icons**: Lucide React
- **Analytics**: Google Analytics 4 with Universal Analytics fallback
- **Package Manager**: pnpm

## Project Structure

```
saasprojector/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles
├── components/
│   ├── InputSlider.tsx     # Interactive slider component
│   ├── ProjectionChart.tsx # Revenue growth chart
│   ├── ProjectionTable.tsx # Revenue projection table
│   ├── SummaryCard.tsx     # Metric display cards
│   └── GoogleAnalytics.tsx # Google Analytics 4 integration
├── hooks/
│   └── useProjection.ts    # Revenue calculation logic
├── types.ts                # TypeScript type definitions
└── package.json
```

## Key Components

### InputSlider

Interactive sliders for adjusting projection parameters with built-in tooltips.

### ProjectionChart

Responsive line chart showing MRR and customer growth over time using Recharts.

### SummaryCard

Display cards for key metrics with hover tooltips explaining each value.

### useProjection Hook

Custom hook that calculates revenue projections based on input parameters.

## Google Analytics Integration

The application includes modern Google Analytics 4 (GA4) tracking:

### Features

- **Modern Tracking**: Google Analytics 4 using gtag.js (recommended approach)
- **SaaS-Specific Events**: Tracks projection views, slider interactions, chart views, and table views
- **Optimized Performance**: Debounced slider tracking and duplicate view prevention
- **Error Handling**: Graceful fallbacks when tracking fails

### Tracked Events

- `view_projection`: When users view different projection types
- `slider_interaction`: When users adjust input sliders (debounced)
- `view_chart`: When users view the projection chart
- `view_table`: When users view the projection table

### Setup

1. Create a Google Analytics 4 property
2. Add your Measurement ID to `.env.local`:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. The tracking will automatically initialize when the app loads

## Customization

The application is designed to be easily customizable:

- **Styling**: Modify Tailwind classes in components
- **Metrics**: Add new calculation logic in `useProjection.ts`
- **Charts**: Extend chart functionality in `ProjectionChart.tsx`
- **Inputs**: Add new sliders in `page.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js and modern web technologies.
