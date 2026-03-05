# Typing-Topia

A modern typing speed test application that helps users improve their typing skills by measuring words per minute (WPM), mistakes, and characters per minute (CPM).

## Features

- ⏱️ **60-second Timer** - Test your typing speed within a fixed time limit
- 📊 **Real-time Statistics** - Track WPM, mistakes, and CPM as you type
- 🎯 **Visual Feedback** - Color-coded characters (green for correct, red for incorrect)
- 🔄 **Try Again** - Easily restart the test with a new random paragraph
- ⌨️ **Smart Cursor** - Active character highlighting with blinking indicator

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required for basic usage

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Typing-Topia.git
```

2. Navigate to the project directory:
```bash
cd Typing-Topia
```

3. Open `index.html` in your browser:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Or simply open the file directly
open index.html
```

## How to Use

1. Open the application in your browser
2. Click on the text area or start typing to begin
3. Type the displayed paragraph as quickly and accurately as possible
4. The timer starts automatically when you type the first character
5. View your WPM, mistakes, and CPM in real-time
6. Click "Try Again" to restart with a new paragraph

## Project Structure

```
Typing-Topia/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── js/
│   ├── script.js       # Main application logic
│   └── paragraph.js    # Paragraph data
├── package.json        # Node.js dependencies
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Development

### Installing Dependencies

```bash
npm install
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Technical Details

### WPM Calculation

Words Per Minute is calculated using the formula:
```
WPM = ((characters typed - mistakes) / 5) / (time elapsed in minutes)
```

The division by 5 is a standard convention, as the average word length is considered to be 5 characters.

### CPM Calculation

Characters Per Minute is calculated as:
```
CPM = characters typed - mistakes
```

CPM does not count mistakes, representing only correctly typed characters.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Typing practice paragraphs sourced from various authors
- Inspired by typing speed test applications like Monkeytype

---

Made with ❤️ for typing enthusiasts

