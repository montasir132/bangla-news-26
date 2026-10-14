<div align="center">

# 📰 Bangla News 26

**সত্যের সাথে, সবসময় | A clean, fast, responsive Bangla news portal.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-C40004?style=for-the-badge&logo=vercel&logoColor=white)](https://bangla-news-26.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-1D271F?style=for-the-badge&logo=github&logoColor=white)](https://github.com/<your-username>/bangla-news-26)

🔗 **Live:** [https://bangla-news-26.vercel.app/](https://bangla-news-26.vercel.app/)

</div>

---

## 📖 About

**Bangla News 26** is a responsive Bangla news web app. It brings the latest headlines, top stories and category-wise news into one clean reading experience, with today's date in Bangla, a scrolling latest-news ticker and a most-read list.

Readers can browse news by category (politics, world, economy, health, sports, technology, video), and signed-in users can read the full story pages.

> ⚠️ **Note:** This is a learning/portfolio project. News headlines, summaries and images come from a third-party news feed (BBC Bangla) and belong to their original publisher. All credit goes to the source. This project does not claim ownership of that content.

---

## 🧰 Technologies Used

| Category | Tools |
|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router, Server Components) |
| **Language** | TypeScript |
| **UI Library** | React |
| **Styling** | Tailwind CSS (+ component library) |
| **Authentication** | [Better Auth](https://www.better-auth.com/) (Email/Password, Google, GitHub) |
| **Data Source** | BBC Bangla news feed |
| **Deployment** | Vercel |

---

## ✨ Key Features

1. **⚡ Latest News Ticker (সর্বশেষ)**
   A continuously scrolling strip of the newest headlines at the top of every page, each linking to its story.

2. **📰 Top Stories & Featured News**
   The home page opens with the main stories (প্রধান খবর), followed by selected stories (নির্বাচিত খবর) in a clean card layout with images.

3. **🗂️ Category Pages**
   Browse news by category: রাজনীতি, বিশ্ব, অর্থনীতি, স্বাস্থ্য, খেলা, প্রযুক্তি and ভিডিও. The home page also groups stories into sections such as বাংলাদেশ, ভারত, বিশ্ব and স্বাস্থ্য.

4. **🔥 Most Read (সর্বাধিক পঠিত)**
   A ranked top-10 list so readers can quickly see what everyone is reading.

5. **🔐 Authentication & Protected Articles**
   Sign up and sign in with email/password, Google or GitHub. Full story pages are available to signed-in users, and logged-out visitors are redirected to the sign-in page.

**Also included:** today's date in Bangla, responsive layout for mobile, tablet and desktop, and a reusable header and footer across all pages.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/bangla-news-26.git
cd bangla-news-26
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
# Better Auth
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Social login (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# api
NEXT_PUBLIC_NEWS_CATEGORIES_API= 
NEXT_PUBLIC_NEWS_SECTIONS_API= 
NEXT_PUBLIC_NEWS_CATEGORY_API=  
NEXT_PUBLIC_NEWS_ARTICLE_API= 
```

> Also add the database and news-feed variables your project uses.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
npm start
```

---

## 📄 Credits & Disclaimer

News content, headlines and images are the property of their respective publisher (BBC Bangla). This project is for learning and portfolio purposes only.

---

<div align="center">

Made with ❤️ in Bangladesh

⭐ If you like this project, give it a star on GitHub!

</div>