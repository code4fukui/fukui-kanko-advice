# Fukui Tourism AI Advice
日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A system that generates professional AI-powered tourism consultation advice for tourism businesses in Fukui Prefecture, Japan.

## Demo
https://code4fukui.github.io/fukui-kanko-advice/

## Features
- **AI-Powered Analysis**: Uses GPT models to analyze survey data and generate professional tourism consulting advice
- **Data-Driven Recommendations**: Bases all advice on actual visitor feedback collected through surveys
- **Organized by Area & Time Period**: Generates separate advice for each tourism area and time period  
- **Interactive Web Interface**: Dynamic HTML pages allow browsing advice by prefecture region, city, and area
- **Automated Documentation**: Automatically creates downloadable JSON files for all generated advice

## Requirements
- [Deno](https://deno.land/) JavaScript/TypeScript runtime
- OpenAI API key

## Usage
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

## Data / API
- Survey data from the [FTAS (Fukui Tourism Area Survey) Open Data](https://github.com/code4fukui/fukui-kanko-survey)
- Advice generated using the OpenAI API

## License
This project is licensed under the [MIT License](LICENSE).
