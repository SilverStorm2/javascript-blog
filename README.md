# JavaScript Blog

## Project Overview
The `javascript-blog` project is an interactive web application that showcases a blog with dynamic features such as filtering articles by tags and authors. The project uses Handlebars.js for template-based rendering and provides various interactive elements for an improved user experience.

## Features
- **Article Filtering**: Allows users to filter articles by clicking on specific tags or author names.
- **Tag Cloud**: Generates a tag cloud based on the frequency of tags used in articles.
- **Author List**: Displays a list of authors with the count of articles written by each.
- **Dynamic Content Rendering**: Utilizes Handlebars.js templates for generating links and content dynamically based on data attributes.

## Getting Started
### Prerequisites
- Basic understanding of JavaScript, HTML, and CSS.
- Local server setup (e.g., `Live Server` extension in VS Code).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/SilverStorm2/javascript-blog.git

## Code Structure
The project is organized as follows for modularity and readability:

### HTML Templates
- Located in `index.html` within `<script type="text/x-handlebars-template">` tags.
- Handles layout for components like articles, tags, and authors.

### JavaScript (`js/script.js`)
- **Functions for User Interaction**: Manages click events on links.
- **Dynamic Content Generation**: Uses Handlebars templates for rendering.
- **Event Listeners**: Manages tag and author filters for interactive features.

### CSS (`css/style.css`)
- Defines layout, typography, and overall presentation of the blog.

## Issues Encountered and Solutions

### Handlebars.js Integration
- Fixed `no-undef` errors by ensuring `Handlebars` is defined globally and declared read-only.

### ESLint Configuration
- Updated ESLint settings to recognize Handlebars as a global variable.
- Resolved indentation and spacing errors for improved code formatting.

## Technologies Used
- **HTML**: Used to structure the webpage.
- **CSS**: Styles the visual layout and presentation of the blog.
- **JavaScript**: Implements logic for dynamic content rendering and user interaction.
- **Handlebars.js**: JavaScript templating engine used for generating HTML templates.
- **ESLint**: Static code analysis tool to maintain code quality and formatting.

## Contributing
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit the changes (`git commit -m "Add new feature"`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
   
Please ensure that your code follows the existing style guide and passes all linting checks before submitting.
