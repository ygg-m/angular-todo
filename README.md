# Angular 17 Todo App

This project is a Todo application built with Angular 17. It allows users to manage their tasks by providing features such as adding, completing, editing, filtering, and deleting todos. The application integrates with Firebase for authentication and data storage. Additionally, it supports guest mode, where users can use local storage to store their todos without requiring authentication.

## Features

- **Authentication**: Users can register, login, and reset their passwords securely using Firebase Authentication.
- **Data Management**: Todos are stored in Firebase Firestore, providing real-time synchronization across devices.
- **Guest Mode**: Users can use the application without authentication by storing their todos locally in the browser's local storage.
- **Todo Management**: Users can add new todos, mark todos as completed, edit existing todos, filter todos based on their completion status, and delete todos.

## Technologies Used

- Angular 17: Frontend framework for building the user interface and application logic.
- Firebase: Provides authentication services (Firebase Authentication) and real-time database storage (Firestore).
- TypeScript: Programming language used to write Angular code.
- HTML/CSS: Markup and styling for the user interface.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Set up Firebase for authentication and Firestore for data storage. Update the Firebase configuration in the environment files (`environment.ts` and `environment.prod.ts`) with your Firebase project credentials.
5. Build and serve the application using `ng serve`.
6. Access the application in your browser at `http://localhost:4200`.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
