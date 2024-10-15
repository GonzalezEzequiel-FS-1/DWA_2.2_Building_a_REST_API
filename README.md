Game Vault
==========

A **Game Vault** web application that allows users to search, filter, and sort video games based on various criteria such as genre, platform, release year, and rating. Users can search for specific games, filter them according to their preferences, and sort the results by title, release year, or rating.
Game Vault
==========

**Game Vault** is a sleek, modern web application that allows users to explore and manage their favorite video games in an organized, dynamic, and responsive manner. The app features a variety of filtering options, including by genre, platform, release year, and rating. It also includes a search function to find games by title, and users can sort the game list based on different attributes such as title, release year, and rating.

With its clean interface and real-time updates, **Game Vault** provides an intuitive and engaging experience for video game enthusiasts to track and discover games.

Key Features
------------

-   **Search by Title**: Quickly search games by their title using a simple search bar.
-   **Filters**: Narrow down the results with multiple filters:
    -   **Genre**: Filter games by genre (e.g., Action, Adventure, RPG, etc.).
    -   **Platform**: Filter games by the platform (e.g., PC, PlayStation, Xbox, etc.).
    -   **Release Year**: Filter games released in a specific year or range of years.
    -   **Rating**: Filter games based on their rating (e.g., E for Everyone, M for Mature).
-   **Sort by Attributes**: Sort the games dynamically based on:
    -   **Title**: Alphabetically sort the games by title.
    -   **Release Year**: Sort the games by their release year (ascending/descending).
    -   **Rating**: Sort the games based on their ratings, either high to low or low to high.
-   **Dynamic UI**: As users apply filters or search terms, the list of games updates automatically in real-time.
-   **Responsive Design**: The application adjusts seamlessly across different screen sizes, making it mobile-friendly.

Deployed Application
--------------------

You can access the live, deployed **Game Vault** application on Heroku using the following link:

-   <https://fs-dwa-deploying-api-eea69b98370e.herokuapp.com/>

This is the hosted version of the app, where you can see it fully functioning with all the features and filters.

Technologies Used
-----------------

**Frontend**:

-   **React.js**: The primary JavaScript library used for building the UI components.
-   **Styled Components**: Used for styling the app with CSS-in-JS.
-   **React Hooks**: Utilized `useState` and `useEffect` for managing state and side effects.

**Backend** (Heroku API):

-   **Express.js**: The backend is built using Express.js to serve data related to video games.
-   **API Endpoints**: The app makes use of RESTful API endpoints to fetch game data from the backend.
-   **Deployment**: The backend API is hosted on Heroku for easy access and hosting.

Installation Instructions
-------------------------

If you want to run the application locally, follow these steps:

### 1\. Clone the repository

bash
Features
--------

-   **Search**: Allows users to search games by title.
-   **Filters**: Users can filter games by:
    -   Genre
    -   Platform
    -   Release Year
    -   Rating
-   **Sorting**: Sort the list of games by:
    -   Title
    -   Release Year
    -   Rating
-   **Dynamic UI**: Filters and search automatically update the game list in real-time.

Deployed Application
--------------------

You can access the live, deployed application on Heroku at the following URL:

-   <https://fs-dwa-deploying-api-eea69b98370e.herokuapp.com/>

Installation
------------

1.  **Clone the repository:**

```bash
git clone https://github.com/yourusername/game-vault.git
```
2. **Navigate to the project directory**

```bash
cd game-vault
```
3. **Install dependencies**

Use npm to install the required packages:

```bash
npm install
```

4. **Set up the environment variables**

Create a .env file in the root of the project and add the following line for the API base URL:

env

VITE_REACT_APP_BASE_URL=https://fs-dwa-deploying-api-eea69b98370e.herokuapp.com/api/v1

This ensures that the frontend connects to the correct API during production.

5. **Run the development server**

Start the development server using npm:

```bash

npm run dev
```
6. **Open the app in your browser**

Once the development server is running, open the following URL in your browser:


http://localhost:3000

You should see the Game Vault app running locally on your machine.

How It Works

Fetching Data:

Upon loading, the app makes an API call to the backend to fetch the game data from the Heroku-hosted API.

The API returns a list of video games in JSON format, which is then rendered dynamically.

Filtering:

The user can filter games by specific attributes such as genre, platform, release year, and rating.

Each filter dynamically updates the displayed games in real time.

Sorting:

The user can also sort the list of games by title, release year, or rating, using ascending or descending order.

Search:

The search bar allows the user to find a specific game by title. It filters the game list in real-time as the user types.

API Information

This application fetches data from the backend API hosted on Heroku. Below are the key API endpoints:

API Base URL

https://fs-dwa-deploying-api-eea69b98370e.herokuapp.com/api/v1

Endpoints:

GET /games: Fetches all available games.

GET /games/:id: Fetches a specific game by its id.

POST /games: Add a new game to the database.

PATCH /games/:id: Update a game's details by its id.

DELETE /games/:id: Deletes a game by its id.

DELETE /games/deleteall: Deletes all games from the database.

Example Data (for testing purposes):

Game Object:

```json

{

"title": "Super Mario Bros",

"genre": "Platformer",

"platform": "NES",

"release_year": 1985,

"rating": "E"

}
```

### Contributing

You are welcome to contribute to Game Vault! Here's how:
1. Fork the repository.

2. Create a new branch (git checkout -b feature/your-feature).

3. Make your changes.

4. Commit your changes (git commit -am 'Add your feature').

5. Push your branch (git push origin feature/your-feature).

6. Create a pull request to merge your feature into the main repository.

License

This project is open-source and licensed under the MIT License.

    
