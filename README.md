# Pokedex

A React-based Pokedex application with search, filtering, detailed Pokemon information, evolution chains, and an interactive guess game.

## Features

- 🔍 Search and filter Pokemon by name or type
- 📊 View detailed Pokemon statistics and information
- 🔄 Evolution chain tracking
- 🎮 Interactive Pokemon guess game
- 🌙 Dark mode support
- 📱 Responsive design

## Live Demo

[Visit the live Pokedex](https://invertex3.github.io/Pokedex/)

## Local Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000/Pokedex`

### Build for Production

```bash
npm run build
```

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

The repository is configured with GitHub Actions that automatically deploys to GitHub Pages on every push to the `main` branch.

1. Push your changes to `main`:
   ```bash
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Install dependencies
   - Build the application
   - Deploy to GitHub Pages

3. View the workflow status in the **Actions** tab of your repository

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build-and-deploy
```

### Enable GitHub Pages

1. Go to your repository **Settings**
2. Navigate to **Pages**
3. Under "Build and deployment", select:
   - Source: **GitHub Actions**
4. The site should be live within minutes at `https://invertex3.github.io/Pokedex/`

## Project Structure

```
src/
├── index.js              # React entry point
├── main.css              # Global styles
└── components/
    ├── app.js            # Main router component
    ├── HomePage.js       # Pokemon list view
    ├── PokemonDetailPage.js  # Individual Pokemon details
    ├── PokemonGuessGame.js   # Game component
    ├── SearchBar.js      # Search functionality
    ├── pokemoncard.js    # Card component
    ├── pagination.js     # Pagination
    ├── StatsChart.js     # Stats visualization
    ├── EvolutionChain.js # Evolution display
    ├── MovesList.js      # Pokemon moves
    ├── ImageCarousel.js  # Image gallery
    ├── gamepage.js       # Game page wrapper
    ├── themetoggle.js    # Theme switcher
    ├── pokeapi.js        # API service
    └── utils.js          # Utility functions
```

## Technologies

- **React 18** - UI framework
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **PokéAPI** - Pokemon data source

## API

This app uses the free [PokéAPI](https://pokeapi.co/) for all Pokemon data.

## License

MIT - See LICENSE file for details

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

**Author:** Invertex3

**Last Updated:** December 7, 2025