# Fukui Tourism AI Advice

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A system that analyzes visitor survey data using GPT models to generate professional, actionable tourism consulting advice for businesses in Fukui Prefecture, Japan.


![A screenshot of the Fukui Kanko Advice web interface. The main page shows a header with a scenic photo of Fukui, dropdown menus to select a tourist area and time period, and a list of generated advice for different areas.](https://user-images.githubusercontent.com/108299/280241837-773a4658-0524-4f0e-8519-61405e60802c.png)


## Demo

**[https://code4fukui.github.io/fukui-kanko-advice/](https://code4fukui.github.io/fukui-kanko-advice/)**

## Core Concept

This project automates the process of tourism consulting by following a simple data pipeline:

1.  **Fetch Data**: It retrieves the latest visitor feedback from the [FTAS (Fukui Tourism Area Survey) Open Data](https://github.com/code4fukui/fukui-kanko-survey) project.
2.  **Analyze with AI**: For each tourist area, recent survey responses are compiled and sent to a GPT model via the OpenAI API with a prompt asking it to act as a professional tourism consultant.
3.  **Generate Advice**: The AI analyzes the feedback and generates a report with prioritized, actionable improvement points.
4.  **Archive & Publish**: The generated advice is saved as a JSON file and published to a static HTML website, allowing anyone to browse the insights by area and time period.

## Features

-   **AI-Powered Analysis**: Uses GPT models to analyze raw survey data and generate professional consulting reports.
-   **Data-Driven Recommendations**: Bases all advice on actual visitor feedback, identifying recurring issues and opportunities.
-   **Automated Workflow**: Scripts automate the entire process from data fetching to generating and publishing the final HTML pages.
-   **Interactive Web Interface**: A clean, static web interface allows users to browse advice by prefecture region, city, and survey period.
-   **Data Archiving**: Automatically creates and indexes downloadable JSON files for all generated advice, creating a historical record of insights.

## Requirements

-   [Deno](https://deno.land/) (JavaScript/TypeScript runtime)
-   An OpenAI API key

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/code4fukui/fukui-kanko-advice.git
    cd fukui-kanko-advice
    ```

2.  **Set up your environment:**
    Create a `.env` file in the root directory and add your OpenAI API key:
    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```

## Usage

The project includes several Deno scripts to manage the data and build the site.

```bash
# Run the full pipeline: generate new advice, update the index, and build HTML
deno run --allow-net --allow-read --allow-write --env make.js

# --- Individual Scripts ---

# Generate new advice for areas with recent survey responses
# (Saves output to data/advice-YYYY-MM-DD.json)
deno run --allow-net --allow-read --allow-write --env make.js

# Create or update the advice index from the /data directory
# (Generates advice-list.json)
deno run --allow-net --allow-read --allow-write makeList.js

# Generate all HTML pages from the current advice data
# (Generates index.html and area/*.html)
deno run --allow-net --allow-read --allow-write makeHTML.js

# Test the core AI advice generation logic with sample data
deno run --allow-net --env make.test.js
```

## Data and APIs

-   **Survey Data**: [FTAS (Fukui Tourism Area Survey) Open Data](https://github.com/code4fukui/fukui-kanko-survey)
-   **Advice Generation**: OpenAI API

## License

-   **Data Source**: CC BY Fukui Tourism Association
-   **Code**: MIT License
-   **AI API**: Subject to OpenAI terms of use