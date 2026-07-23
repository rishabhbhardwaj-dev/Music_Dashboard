<div align="center">

# 🎵 Rishabh Bhardwaj Music Dashboard

### A Premium Music Portfolio & Analytics Platform

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A modern, premium-quality web application for organizing, showcasing, and analyzing Instagram song covers.**

*Built with love for music and code.*

[🌐 Live Demo](#) · [📧 Contact](mailto:rishabhbhardwaj45@gmail.com) · [📸 Instagram](https://www.instagram.com/rishabhbhardwaj_45)

</div>

---

## ✨ Features

### 🎤 Studio (Dashboard)
- **Immersive Hero Section** with profile photo, singer tagline, and featured cover
- **Real-time Stats** — Total covers, likes, comments, saves, and artist count
- **Featured Cover Spotlight** with waveform animation
- **Latest Upload** with quick stats
- **Recent Uploads** list with hover effects

### 📚 Song Library
- **44+ Real Covers** with actual song names and artists
- **Grid & List Views** — Switch between album-art cards and compact list
- **Advanced Filters** — Genre, mood, language, sort by
- **Favorites & Bookmarks** — Save songs locally
- **CSV Export** — Download your data
- **Instagram Links** — Direct links to posts

### 🎨 Artists
- **Auto-grouped by artist** — KK, Arijit Singh, Vishal Mishra, and more
- **Performance metrics** per artist
- **Drill-down view** — Click artist to see all their covers

### 📊 Control Room (Analytics)
- **Interactive Charts** — Monthly uploads, views, genre distribution
- **Top Songs** — Most viewed, liked, shared
- **Artist Comparison** — Visual performance charts
- **Growth Over Time** — Track your progress

### 🎵 Collections (Playlists)
- **Curated Playlists** — Organized by artist and mood
- **KK Classics**, **Arijit Favorites**, **Romantic Mood**, and more
- **Quick stats** per collection

### 🏆 Wall of Fame (Achievements)
- **12 Gamified Milestones** — From first cover to 1M views
- **Progress Bars** — Track your journey
- **Unlock Animations** — Celebrate your wins

### 📅 Recording Queue (Upcoming)
- **Kanban Board** — Idea → Planned → In Progress → Recording → Done
- **Priority Tags** — High, Medium, Low
- **Notes & Ideas** — Keep track of your thoughts

### 🎙️ Producer Notes (Insights)
- **AI-powered Observations** — Best artists, genres, upload patterns
- **Performance Tips** — Weekend vs weekday, engagement trends
- **Future AI Recommendations** — Coming soon

### 🔍 Search
- **Full-text Search** — Songs, artists, movies, genres, moods
- **Quick Filters** — One-click genre/mood filters
- **Search History** — Remember your recent searches

### 🎨 UI/UX
- **Dark/Light Mode** — Toggle with persistence
- **Keyboard Shortcuts** — Quick navigation (1-5, T, /, K)
- **Smooth Animations** — Framer Motion throughout
- **Glassmorphism Effects** — Premium visual depth
- **Responsive Design** — Works on mobile, tablet, desktop
- **Back to Top Button** — Easy navigation

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS 3** | Styling |
| **Framer Motion** | Animations |
| **Recharts** | Interactive charts |
| **React Router** | Navigation |
| **Lucide React** | Icons |
| **date-fns** | Date formatting |

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or higher)
- [Git](https://git-scm.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/rishabhbhardwaj-dev/Music_Dashboard.git

# Navigate to project
cd Music_Dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The `dist/` folder is ready for deployment.

---

## 📁 Project Structure

```
Music_Dashboard/
├── public/
│   └── profile.jpg          # Profile photo
├── src/
│   ├── data/
│   │   └── songs.js         # Song data & portfolio stats
│   ├── hooks/
│   │   └── useStore.js      # Favorites, theme, search history
│   ├── layouts/
│   │   └── MainLayout.jsx   # Sidebar & navigation
│   ├── pages/
│   │   ├── Dashboard.jsx    # Studio (hero + stats)
│   │   ├── Library.jsx      # Song library
│   │   ├── Artists.jsx      # Artist grouping
│   │   ├── Timeline.jsx     # Musical journey
│   │   ├── Analytics.jsx    # Control room (charts)
│   │   ├── Search.jsx       # Search & filters
│   │   ├── Playlists.jsx    # Collections
│   │   ├── Achievements.jsx # Wall of fame
│   │   ├── Upcoming.jsx     # Recording queue
│   │   └── Insights.jsx     # Producer notes
│   ├── styles/
│   │   └── index.css        # Global styles & animations
│   ├── utils/
│   │   └── helpers.js       # Utility functions
│   ├── App.jsx              # Router setup
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🎯 Customization

### Update Your Instagram Stats

Edit `src/data/songs.js`:

```javascript
export const portfolioStats = {
  totalLikes: 50000,      // Your total likes
  totalComments: 10000,   // Your total comments
  totalSaves: 5000,       // Your total saves
  totalShares: 2000,      // Your total shares
  totalReach: 100000,     // Your total reach
  totalImpressions: 200000 // Your total impressions
};
```

### Add a New Cover

```javascript
{
  id: 45,
  title: "Song Name",
  artist: "Artist Name",
  originalSinger: "Original Singer",
  movie: "Movie Name",
  composer: "Composer",
  genre: "Romantic",     // Romantic, Sad, Rock, Sufi, etc.
  mood: "Emotional",     // Emotional, Happy, Passionate, etc.
  language: "Hindi",
  uploadDate: "2025-01-01",
  instagramUrl: "https://instagram.com/p/...",
  tags: ["romantic", "emotional"]
}
```

### Change Profile Photo

Replace `public/profile.jpg` with your photo.

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click **Deploy**

### Netlify

1. Run `npm run build`
2. Drag the `dist/` folder to [netlify.com](https://netlify.com)

---

## 📸 Screenshots

<div align="center">

### Studio (Dashboard)
*<img width="2858" height="1530" alt="image" src="https://github.com/user-attachments/assets/14ad4cb4-8c75-4a75-90cb-3fb7e36ba864" />*

### Control Room (Analytics)
*<img width="2846" height="1530" alt="image" src="https://github.com/user-attachments/assets/3a422940-5e81-4bd6-bbbf-8d76f5c599cb" />*

### Song Library
*<img width="2872" height="1548" alt="image" src="https://github.com/user-attachments/assets/1e1df84e-5457-499c-b518-9fce157ee1ca" />*

### Wall of Fame (Achievements)
*<img width="2850" height="1538" alt="image" src="https://github.com/user-attachments/assets/3648d837-0ee2-4ab0-a4ea-178bf91ba6d9" />
*

</div>

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 About the Developer

**Rishabh Bhardwaj** — Singer & Cover Artist

- [![Instagram](https://img.shields.io/badge/Instagram-@rishabhbhardwaj__45-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/rishabhbhardwaj_45)
- 🎵 Turning emotions into melodies, one cover at a time
- 💻 Built with passion for music and technology

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ and 🎵 by [Rishabh Bhardwaj](https://www.instagram.com/rishabhbhardwaj_45)

</div>
