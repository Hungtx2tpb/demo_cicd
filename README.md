# Playwright Automation Framework for Web UI & API Testing
## Features:
- Web UI Testing: Automate browser interactions, validate UI components, and test across multiple browsers (Chromium, Firefox, WebKit).
- API Testing: Easily test RESTful APIs with requests, responses, and status code validation.
- Cross-browser Support: Run tests across different browsers (Chromium, Firefox, WebKit).
## Installation
### Prerequisites
- Node.js (v14 or later)
- npm
### Steps to install
1. Clone the repository
```git clone https://rolfpt@bitbucket.org/onthelistit/web-automated-test.git```
2. Navigate to the project directory
```cd web-automated-test```
3. Install the dependencies
```npm install```
4. Install playwright browsers
```npx playwright install```
## Structure
* src
    - **api_helper**:
<br>- The base directory includes common or foundational elements for your tests, such as endpoint definitions and other constant files.
    - **constants**:
<br>- Contains constants or enums
    -  **env**:
<br>- where environment variables are not configured after running the test command

    - **pages**:
<br>- Contains page object classes
<br>- All page object classes will extend the BasePage, thus inheriting all the base methods
<br>- Each page object class has its locators and steps
    - **setup**
<br>- Custom log, setup, teardown and test fixture
    -   **utils**
<br>- Functions and data used in common across the entire project: creating data, customizing the environment, ...
    - **tests**
<br>- Each folder represents a feature, and it contains test cases related to that specific feature, based on the folder's name
    - **playwright.config.ts**
<br>- Config of playwright