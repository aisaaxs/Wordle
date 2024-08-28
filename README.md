# Wordle Game

This is a classic Wordle game built using modern web technologies. The game allows users to guess a hidden five-letter word within a limited number of attempts. The user's input is validated in real-time, and feedback is provided to help guide them towards the correct word.

## Technologies Used

- **React.js**: For building the user interface and managing the application's state.
- **Tailwind CSS**: For styling the components with utility-first CSS.
- **JavaScript**: For handling the game logic and interactions.
- **Node.js**: For server-side operations and API integration.
- **HTML & CSS**: For structuring and styling the web pages.
- **API**: For real-time word validation and retrieving word meanings.

## Features

- **Dynamic User Interface**: Components are styled with Tailwind CSS and animated for a smooth user experience.
- **Keyboard Interaction**: Users can interact with the game using both on-screen and physical keyboards.
- **Real-time Validation**: The game validates words and provides immediate feedback on each guess.
- **Game Notifications**: Users receive notifications for correct guesses, invalid words, or game over scenarios.
- **Word Generation**: The target word is randomly selected from a predefined list of words.

## How It Works

1. **User Interface**: The game is composed of a `WordCase` component that displays the current state of the game and a `Keyboard` component for user input.
2. **Word Generation**: A random word is selected from a list and is used as the target word for the game.
3. **Input Handling**: User input is processed both from the on-screen keyboard and physical keyboard, updating the game state accordingly.
4. **Validation**: Each guess is checked against a dictionary API to ensure it's a valid word.
5. **Feedback**: The game provides visual feedback on the guesses, indicating correct letters and their positions.

Feel free to explore and play the game!