# Fukui Tourism AI Advice

A system that generates professional AI-powered tourism consultation advice for tourism businesses in Fukui Prefecture, Japan.

**Live Demo:** https://code4fukui.github.io/fukui-kanko-advice/

## Overview

This project uses OpenAI's GPT API to automatically analyze tourism survey data and generate actionable improvement recommendations for tourism area operators in Fukui. Survey respondents provide feedback about their experiences at different tourism areas, and the AI synthesizes this data into professional, immediately actionable advice.

### Key Features

- **AI-Powered Analysis**: Uses GPT models (primarily GPT-5.2) to analyze survey data and generate professional tourism consulting advice
- **Data-Driven Recommendations**: Bases all advice on actual visitor feedback collected through surveys
- **Organized by Area & Time Period**: Generates separate advice for each tourism area and time period
- **Interactive Web Interface**: Dynamic HTML pages allow browsing advice by prefecture region, city, and area
- **Automated Documentation**: Automatically creates downloadable JSON files for all generated advice

## How It Works

1. **Survey Data Collection**: Visitor surveys are collected via the [FTAS (Fukui Tourism Area Survey) platform](https://github.com/code4fukui/fukui-kanko-survey) and stored as CSV data
2. **AI Analysis**: For each tourism area, survey responses are formatted as CSV and sent to OpenAI's API with a professional tourism consultant prompt
3. **Advice Generation**: GPT returns specific, implementable improvement recommendations organized by priority
4. **HTML Publishing**: The advice is published as individual HTML pages organized by area
5. **Data Storage**: All advice is stored in JSON format for archival and reference

## Project Structure

```
├── index.html                 # Main interactive dashboard
├── README.md                  # Original Japanese README
├── README.en.md              # This English README
├── make.js                   # Main script: generates advice for all areas
├── makeList.js               # Creates index of all advice files
├── makeHTML.js               # Generates HTML pages for each area
├── fetchKankoAdvice.js       # API integration with OpenAI
├── make.test.js              # Example/test of the advice generation
├── advice.json               # Current advice output (all areas)
├── advice-list.json          # Index of all archived advice files
├── area/                     # Individual HTML pages for each tourism area
│   ├── 1.html
│   ├── 2.html
│   └── ...
└── data/                     # Archive of all historical advice
    ├── advice-2023-07-18.json
    ├── advice-2024-01-02.json
    └── ...
```

## System Components

### Core Scripts

#### `fetchKankoAdvice.js`
Handles communication with OpenAI's API. Takes survey data as CSV, constructs a professional prompt, sends it to GPT, and returns the generated advice. Includes automatic retry logic if the context is too large.

```javascript
const advice = await fetchKankoAdvice(surveyData);
```

#### `make.js`
The main orchestration script. Runs daily to:
- Fetch tourism area definitions and survey data from external sources
- Filter survey data by date range (default: last 2 weeks)
- Generate fresh advice for areas with new survey responses
- Output advice to JSON files and trigger HTML generation
- Uses Deno runtime

Options:
- `offset`: Generate advice for a previous week (0=Wednesday through Saturday offset)
- `days`: Days of data to include (default: 14 days)
- `startday` / `endday`: Alternative to offset for custom date ranges

#### `makeList.js`
Creates `advice-list.json` - an index of all archived advice files in the `data/` directory, sorted by date.

#### `makeHTML.js`
Generates individual HTML pages in the `area/` folder for each tourism area. Each page displays:
- All historical advice for that area (newest first)
- Links to survey responses
- Timestamps and data volume for each advice generation
- Professional styling and markdown rendering

#### `make.test.js`
Example/test showing how the system works with sample data. Demonstrates the AI analysis on a small CSV dataset.

### Frontend

#### `index.html`
Interactive dashboard featuring:
- Area selection dropdown organized by city
- Time period selection filter
- Dynamic content loading from advice JSON
- Integration with [Find47 library](https://code4fukui.github.io/find47/Find47.js) for Fukui imagery
- City-based navigation shortcuts
- Links to related statistics and data sources

## Data Sources

**Survey Source**: [FTAS Open Data - Fukui Tourism Area Survey](https://github.com/code4fukui/fukui-kanko-survey)
- **Data License**: CC BY Fukui Tourism Association
- Includes: Area definitions, survey responses, visitor demographics, satisfaction data
- Updated continuously with new visitor feedback

## AI Model & Prompting

**Current Model**: GPT-5.2 (or fallback to GPT-4 with alternative lines commented in code)

**System Prompt** (translates to):
> "You are a professional tourism consultant. Based on the following CSV survey data, create advice for tourism area business operators. What are important improvements that can be solved immediately?"

The AI generates recommendations that are:
- **Immediately actionable** (not requiring major capital investment)
- **Priority-ranked** by feasibility and impact
- **Specific** with concrete examples and implementation steps
- **Data-backed** citing actual visitor feedback
- Typically including 3-5 core recommendations plus secondary improvements

## Advice Content Example

Generated advice typically includes:
1. **Root cause identification** - Why visitors are dissatisfied
2. **Quick wins** - Low-cost, high-impact improvements
3. **Specific implementation tactics** - Step-by-step instructions
4. **Expected outcomes** - How the improvement will affect satisfaction
5. **Priority ranking** - Which improvements to address first

Example topics addressed:
- Public transportation confusion and navigation
- Wayfinding and signage improvements
- Restaurant/shop pricing transparency
- Operating hours optimization
- Customer service enhancements
- Product assortment and availability issues

## Running the System

### Prerequisites

- [Deno](https://deno.land/) JavaScript/TypeScript runtime
- OpenAI API key (set as environment variable)
- Internet connection for API calls and data fetching

### Basic Usage

```bash
# Generate new advice for areas with recent survey responses
deno run --allow-net --allow-read --allow-write make.js

# Create/update the advice index
deno run --allow-net --allow-read --allow-write makeList.js

# Generate HTML pages from current advice
deno run --allow-net --allow-read --allow-write makeHTML.js

# Test the AI advice generation with sample data
deno run --allow-net make.test.js
```

### Configuration

In `make.js`, customize:

```javascript
const offset = undefined;        // Generate for specific day of week (0-6) or undefined
const days = 14;                 // Days of survey data to include
const startday = "2026-01-01";   // Custom start date
const endday = "2026-01-31";     // Custom end date
```

### Scheduling

Set up a cron job or scheduled task to run `make.js` regularly:

```bash
# Example: Run every Wednesday at 9 AM to generate weekly advice
0 9 * * 3 cd /path/to/fukui-kanko-advice && deno run --allow-net --allow-read --allow-write make.js
```

## Data Organization

### advice.json
Current advice for all areas (generated in most recent run)

```json
[
  {
    "area": "Fukui Station Area",
    "n_data": 66,
    "startday": "2026-01-01",
    "endday": "2026-01-31",
    "advice": "## Immediate Solutions...\n\n1) Problem...\n**Solution:**..."
  },
  ...
]
```

### advice-list.json
Index of all archived advice files with their date ranges

```json
[
  {
    "fn": "data/advice-2025-08-19.json",
    "startday": "2025-08-12",
    "endday": "2025-08-19"
  },
  ...
]
```

### area/ Folder
Individual HTML pages for each tourism area (`1.html` through `98.html`), named by area ID. Each shows all historical advice for that specific area.

### data/ Folder
Complete archive of all generated advice by date:
- `advice-2023-07-18.json` (earliest)
- `advice-2025-08-19.json` (latest)
- One file per generation run

## External Libraries & Services

**JavaScript Libraries**:
- `https://js.sabae.cc/CSV.js` - CSV parsing and generation
- `https://js.sabae.cc/ArrayUtil.js` - Array utilities
- `https://code4fukui.github.io/find47/Find47.js` - Prefectural information (Fukui-specific)
- `https://code4fukui.github.io/mark-down/mark-down.js` - Markdown rendering

**APIs**:
- [OpenAI API](https://openai.com/) - GPT models for advice generation
- [FTAS Survey API](https://github.com/code4fukui/fukui-kanko-survey) - Survey data source

**Related Projects**:
- [Fukui Tourism Statistics Analysis App](https://code4fukui.github.io/fukui-kanko-stat/) - Complementary tool for survey analysis

## Performance & Error Handling

The system includes intelligent error handling for large datasets:

```javascript
// If API returns context length error, recursively reduce dataset
if (res.startsWith("error: ")) {
  data.splice(0, data.length / 2);  // Remove first half
  // Retry with smaller dataset
}
```

This ensures the system can handle high-volume survey data by breaking it into chunks if needed.

## Development Notes

### Testing

Run `make.test.js` to validate the AI advice generation with sample data:

```bash
deno run --allow-net make.test.js
```

This will output example advice based on synthesized survey feedback.

### Customization

- **Modify the AI prompt** in `fetchKankoAdvice.js` to change advice style or focus areas
- **Adjust time windows** in `make.js` to generate advice for different periods
- **Update area definitions** by modifying the FTAS source data
- **Change HTML template** in `makeHTML.js` to customize page styling

## License

- **Data Source**: CC BY Fukui Tourism Association ([FTAS Project](https://github.com/code4fukui/fukui-kanko-survey))
- **Code**: Open source (check repository for specific license)
- **AI API**: Uses OpenAI, subject to their terms of service

## Contributing

This is a project by [Code for Fukui](https://github.com/code4fukui), part of the broader Code for Japan civic tech initiative. To contribute:

- Report issues or suggestions via GitHub
- Enhance prompting for better advice
- Improve data visualization or UI
- Add support for other prefectures

## References

- **FTAS Open Data**: https://github.com/code4fukui/fukui-kanko-survey
- **Live Dashboard**: https://code4fukui.github.io/fukui-kanko-advice/
- **Source Repository**: https://github.com/code4fukui/fukui-kanko-advice/
- **Related Statistics Tool**: https://code4fukui.github.io/fukui-kanko-stat/
