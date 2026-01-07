# 🌊 LyricWave

An immersive web-based music player featuring real-time **3D audio visualization**, synchronized **karaoke-style lyrics**, and a sleek, customizable UI. Built with **React 19**, **Vite**, **Three.js**, and **Tailwind CSS**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-%23000000?style=for-the-badge&logo=vercel&logoColor=white)](https://lyric-wave-gray.vercel.app)

![LyricWave Demo](https://img.shields.io/badge/status-active-brightgreen)
![React](https://img.shields.io/badge/React-19+-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6+-646CFF?logo=vite)
![Three.js](https://img.shields.io/badge/Three.js-r160+-black?logo=three.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

- 🎵 **Smart Audio Player** - Robust playback engine with loop, shuffle, and progress control.
- 📊 **3D Audio Visualization** - Real-time frequency analysis rendering stunning 3D visuals using `@react-three/fiber`.
- 🎤 **Synchronized Lyrics** - Precise lyric syncing in both **Phrase** and **Word** modes (Karaoke style).
- 🎨 **Dynamic Theming** - Switch between Light/Dark modes and customize accent colors (Blue, Purple, Green, etc.).
- 📱 **Fully Responsive** - Glassmorphic interface that adapts perfectly to mobile and desktop.
- ⚡ **High Performance** - Powered by Vite and React 19 for instant load times and smooth transitions.
- 🧩 **Modern Architecture** - Component-driven development with **HeroUI** and **Tailwind CSS v4**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jkdevcode/LyricWave.git
cd LyricWave

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Your app will be available at `http://localhost:5173`

---

## 🎮 Usage

### Player Controls
- **Play/Pause**: Toggle music playback.
- **Next/Prev**: Skip to the next or previous track.
- **Shuffle**: Randomize the playlist order.
- **Repeat One**: Loop the current track.
- **Heart**: Mark songs as favorites (Local state).

### Customization
- **Theme Switcher**: Toggle between Dark and Light mode.
- **Color Picker**: Change the application's primary accent color.
- **Lyric Mode**: Switch between "Phrase" view (lines) and "Words" view (precise timing).

---

## 🎧 Adding Your Music

You can easily extend the library by adding your own tracks and lyrics.

### 1. Add Audio Files
Place your `.mp3` or `.mpeg` files in the `public/music/` directory.

### 2. Add Lyric Data
Create JSON files for your lyrics in `public/lyrics/`. 
Format for `phrases.json`:
```json
[
  { "time": 1000, "text": "First line of lyrics" },
  { "time": 4500, "text": "Second line of lyrics" }
]
```

### 3. Update Configuration
Register the new track in `src/music/music.json`:

```json
{
  "id": 6,
  "title": "Your Song Title",
  "artist": "Artist Name",
  "src": "/music/your-song.mp3",
  "lyrics": {
    "phrases": "/lyrics/your-song-phrases.json",
    "words": "/lyrics/your-song-words.json"
  }
}
```

---

## 📁 Project Structure

```
LyricWave/
├── public/
│   ├── lyrics/           # JSON lyric data (words/phrases)
│   └── music/            # Audio files (mp3/mpeg)
├── src/
│   ├── components/
│   │   ├── Player.tsx    # Core music player logic
│   │   ├── Visualizer.tsx# Three.js audio visualization
│   │   ├── Lyrics.tsx    # Synchronized lyric renderer
│   │   └── ...           # UI components (Navbar, ThemeSwitch)
│   ├── contexts/         # Global state (Theme, LyricMode)
│   ├── hooks/            # Custom hooks (useAudio, etc.)
│   ├── music/
│   │   └── music.json    # Playlist configuration
│   ├── theme/            # Design tokens & color definitions
│   └── App.tsx           # Main application entry
├── package.json
├── tailwind.config.ts    # Styling configuration
└── vite.config.ts        # Build tool configuration
```

---

## 🛠️ Technologies

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI Library |
| **Vite** | Next-Gen Frontend Tooling |
| **react-three-fiber** | 3D Rendering & Visualization |
| **Tailwind CSS v4** | Utility-First Styling system |
| **HeroUI** | Accessible UI Components |
| **Framer Motion** | Complex UI Animations |
| **Tone.js** | Web Audio API wrapper |
| **TypeScript** | Static Type Safety |

---

## 📊 Performance & Optimization

- ✅ **Canvas Optimization** - Efficient WebGL rendering for the visualizer.
- ✅ **Lazy Loading** - Audio assets loaded on demand.
- ✅ **React Compiler** - Leveraging React 19 features for minimizing re-renders.
- ✅ **CSS Variables** - Dynamic theming without javascript overhead.

---

## 📞 Support

For questions or support, reach out through:
- 📧 Email: dajozavargas@gmail.com
- 🐙 GitHub Issues: [Create an issue](https://github.com/jkdevcode/LyricWave/issues)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Created by **Jos** | [Portfolio](https://josedvargas.vercel.app)

---

**Made with ❤️ by Jos**
