export const portfolioData = {
  experiences: [
    {
      name: "Baret",
      role: "Full Stack Developer",
      from: "August 2024",
      to: "January 2026",
      cover_img: "/assets/images/experience/baret.webp",
      website: "https://baret.tech",
      color: "#d1b1fdff"
    },
    {
      name: "FiveP",
      role: "Full Stack Developer",
      from: "April 2023",
      to: "August 2024",
      cover_img: "/assets/images/experience/fivep.webp",
      website: "https://fivep.com.au",
      color: "#ffaf6eff"
    },
    {
      name: "Maliksi Creative Technologies, Inc.",
      role: "Junior Software Engineer",
      from: "May 2021",
      to: "April 2023",
      cover_img: "/assets/images/experience/maliksi.webp",
      website: "https://maliksi.io",
      color: "#aebeffff"
    },
    {
      name: "Courtesy Point Technologies, Inc.",
      role: "Java Developer Intern",
      from: "January 2021",
      to: "April 2021",
      cover_img: "/assets/images/experience/cpti.webp",
      website: "https://courtesypoint.com",
      color: "#a7f2ffff"
    }
  ],
  techstacks: {
    frontend: {
      emoji: "🚀",
      cover_img: "https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=710&q=80",
      stacks: [
        "HTML",
        "CSS",
        "JS",
        "SASS",
        "Bootstrap",
        "Material Design",
        "ReactJS"
      ]
    },
    backend: {
      emoji: "💻",
      cover_img: "https://images.unsplash.com/photo-1514070706115-47c142769603?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1929&q=80",
      stacks: [
        "Java",
        "PHP",
        "C#",
        "MySQL",
        "MSSQL",
        "Firebase",
        "ASP.NET Core"
      ]
    },
    tools: {
      emoji: "🛠️",
      cover_img: "https://wallpapercave.com/wp/wp3929762.jpg",
      stacks: [
        "Git",
        "Jira",
        "Trello",
        "Github",
        "Postman",
        "Netlify",
        "React",
        "React Native",
        "Flutter/Dart",
        "RESTful API",
        "Laravel",
        "Node",
        "Express",
        "Microsoft Azure",
        "MS Teams Development"
      ]
    },
    ui: {
      emoji: "🎨",
      cover_img: "https://images.unsplash.com/photo-1547027072-332f09bd6bb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      stacks: [
        "Figma",
        "AdobeXD"
      ]
    }
  },
  projects: [
    {
      name: "PackPal",
      ai_assisted: true,
      description: "An AI travel prep app that builds a personalized packing list from a destination, trip dates, and one of 10 traveler personas. Lists adapt to real weather using Open-Meteo forecasts up to 16 days out and historical averages beyond that. Scout, the in-app AI assistant, edits the list conversationally \u2014 adding or removing items, checking things off, and answering destination questions. Also generates local insights (visa requirements, language cheat sheet, emergency contacts, safety tips, and 12 curated things to do), per-place checklists with season-aware activity suggestions, and read-only share links with QR codes so travel companions can view a trip without signing up.",
      short_description: "Smart travel packing list generator. Tell it where you're going, what you'll do, and how you travel — get a personalized, weather-aware packing list with an AI trip assistant.",
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Clerk",
        "PostgreSQL",
        "Vercel"
      ],
      is_desktop: false,
      learnings: "Blended deterministic data with generated output: weather forecasts and historical climate averages constrain what the model suggests, so recommendations stay grounded instead of hallucinating a season. Also built a conversational assistant that mutates real app state rather than only chatting, plus anonymous trials and public read-only share links on top of Clerk auth.",
      cover_img: "/assets/images/packpal/cover.webp",
      sample_ui: [],
      demo_video: "",
      git_url: "",
      demo_app: "",
      demo_url: "https://packpal-scout.vercel.app/",
      color: "#14b8a6"
    },
    {
      name: "PlateLoad",
      ai_assisted: true,
      description: "An Olympic barbell plate calculator that finds every symmetric way to hit a target weight using the Eleiko or Metcon plates a gym actually owns. A depth-first combination engine runs on integer math to avoid floating-point drift, with six ranking modes (Recommended, Competition, Fewest plates, Compact, Use what I have, All), sleeve capacity warnings, a warm-up percentage generator, shareable loads via URL params, and favorites/recents. Ships as an offline-capable PWA with a custom SVG barbell rendered to Eleiko and Metcon geometry.",
      short_description: "A mobile-first barbell plate calculator. Type a target, and PlateLoad subtracts the bar and collars, then finds every symmetric way to load the remainder out of the plates your gym actually owns",
      stack: [
        "React 19",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
      ],
      is_desktop: false,
      learnings: "Wrote the combination search in integer math so plate totals never drift, then layered six ranking heuristics over the same solver. Also built a brand-accurate SVG barbell and made the whole thing work offline with no backend, keeping inventory and history in localStorage.",
      cover_img: "/assets/images/plateload/cover.webp",
      sample_ui: [],
      demo_video: "",
      git_url: "https://github.com/bisunajaime/plateload",
      demo_app: "",
      demo_url: "https://plateload.vercel.app",
      color: "#2f6fed"
    },
    {
      name: "Greenwash Laundry POS",
      ai_assisted: true,
      description: "A full-stack Point-of-Sale system for laundry services, featuring an admin dashboard with kanban-style order tracking, real-time updates via Socket.IO, SMS notifications, PDF report generation, thermal printer integration, and a Flutter-based Android mobile/tablet POS.",
      short_description: "Full-stack Laundry POS with admin dashboard, real-time updates, and Flutter Android tablet app.",
      stack: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express 5",
        "TypeScript",
        "PostgreSQL",
        "Knex.js",
        "Flutter",
      ],
      is_desktop: true,
      learnings: "Built a complete laundry POS ecosystem spanning a React admin dashboard with drag-and-drop kanban boards, a Node.js backend with PostgreSQL and real-time Socket.IO updates, and a Flutter Android tablet app with BLE thermal printer integration.",
      cover_img: "/assets/images/greenwash/cover.webp",
      sample_ui: [
        "/assets/images/greenwash/web/1.webp",
        "/assets/images/greenwash/web/2.webp",
        "/assets/images/greenwash/web/3.webp",
        "/assets/images/greenwash/web/4.webp",
        "/assets/images/greenwash/web/5.webp",
        "/assets/images/greenwash/web/6.webp",
        "/assets/images/greenwash/web/7.webp",
        "/assets/images/greenwash/web/8.webp",
        "/assets/images/greenwash/web/9.webp",
        "/assets/images/greenwash/mobile/1.webp",
        "/assets/images/greenwash/mobile/2.webp",
        "/assets/images/greenwash/mobile/3.webp",
        "/assets/images/greenwash/mobile/4.webp",
        "/assets/images/greenwash/mobile/5.webp",
        "/assets/images/greenwash/mobile/6.webp",
        "/assets/images/greenwash/mobile/7.webp",
        "/assets/images/greenwash/mobile/8.webp",
        "/assets/images/greenwash/mobile/9.webp",
        "/assets/images/greenwash/mobile/10.webp",
        "/assets/images/greenwash/mobile/11.webp",
        "/assets/images/greenwash/mobile/12.webp",
        "/assets/images/greenwash/mobile/13.webp",
        "/assets/images/greenwash/mobile/14.webp",
        "/assets/images/greenwash/mobile/15.webp",
        "/assets/images/greenwash/mobile/16.webp",
        "/assets/images/greenwash/mobile/17.webp",
        "/assets/images/greenwash/mobile/18.webp",
        "/assets/images/greenwash/mobile/19.webp",
        "/assets/images/greenwash/mobile/20.webp",
      ],
      demo_video: "",
      git_url: "",
      demo_app: "",
      demo_url: "https://greenwash.ph",
      color: "#22c55e"
    },
    {
      name: "Wallection",
      description: "Wallpaper directory for wallpapers generated from my workstation using ComfyUI and Qwen/Flux models.",
      short_description: "Qwen/Flux generated wallpapers from my local workstation using ComfyUI.",
      stack: [
        "React",
        "TypeScript",
        "Cloudflare",
        "Claude Code",
        "ComfyUI",
        "Qwen/Flux Models",
        "Image Generation"
      ],
      is_desktop: false,
      learnings: "Vibe-coded wallpaper generator containing wallpapers I generated with Qwen and Flux models from my local workstation with ComfyUI.",
      cover_img: "/assets/images/wallection/cover.webp",
      sample_ui: [
        "/assets/images/wallection/first.webp",
        "/assets/images/wallection/second.webp",
        "/assets/images/wallection/third.webp",
        "/assets/images/wallection/fourth.webp",
      ],
      demo_video: "",
      git_url: "",
      demo_app: "",
      demo_url: "https://wallection.bisunajaime.workers.dev/",
      color: "rgb(137, 137, 137)"
    },
    {
      name: "NeedL - Patient",
      description: "Mobile app for patient users to request laboratory test bookings from nearby clinics at a set location.",
      short_description: "Capstone Project - Healthcare | Patient Laboratory Test Booking App",
      stack: [
        "Flutter",
        "Laravel"
      ],
      is_desktop: false,
      learnings: "In this project, I learned authentication, single sign on, REST API, using libraries, night mode implementation, and so much more.",
      cover_img: "/assets/images/cover/needlpatient.webp",
      sample_ui: [
        "/assets/images/needl/patient/login.webp",
        "/assets/images/needl/patient/forgot_password.webp",
        "/assets/images/needl/patient/register.webp",
        "/assets/images/needl/patient/pin_code.webp",
        "/assets/images/needl/patient/home_page.webp",
        "/assets/images/needl/patient/select_location_page.webp",
        "/assets/images/needl/patient/select_location_confirmation.webp",
        "/assets/images/needl/patient/select_clinic_page.webp",
        "/assets/images/needl/patient/select_clinic_confirmation.webp",
        "/assets/images/needl/patient/select_test_page.webp",
        "/assets/images/needl/patient/test_sample_page.webp",
        "/assets/images/needl/patient/set_schedule_page.webp",
        "/assets/images/needl/patient/payment_summary_page.webp",
        "/assets/images/needl/patient/home_drawer.webp",
        "/assets/images/needl/patient/dashboard_page.webp",
        "/assets/images/needl/patient/reports_page.webp",
        "/assets/images/needl/patient/reports_password_confirmation_page.webp",
        "/assets/images/needl/patient/locations_page.webp",
        "/assets/images/needl/patient/set_location_page.webp",
        "/assets/images/needl/patient/location_confirmation_page.webp",
        "/assets/images/needl/patient/recent_tests_page.webp",
        "/assets/images/needl/patient/recent_tests_calendar_view.webp",
        "/assets/images/needl/patient/compare_tests_page.webp",
        "/assets/images/needl/patient/compare_tests_selected_page.webp",
        "/assets/images/needl/patient/compare_tests_email_pdf_page.webp",
        "/assets/images/needl/patient/test_details_page.webp",
        "/assets/images/needl/patient/test_details_page_2.webp",
        "/assets/images/needl/patient/test_results.webp",
        "/assets/images/needl/patient/email_selected_test.webp",
        "/assets/images/needl/patient/settings_page.webp",
        "/assets/images/needl/patient/bug_reports_page.webp",
        "/assets/images/needl/patient/change_password_page.webp",
        "/assets/images/needl/patient/terms_and_conditions_page.webp"
      ],
      demo_video: "",
      git_url: "",
      demo_app: "",
      demo_url: "https://isproj2b.benilde.edu.ph/NeedL",
      color: "#4679fbff"
    },
    {
      name: "NeedL - Medtech",
      description: "Mobile app for medtech users to used to manage bookings and get feedback reports.",
      short_description: "Capstone Project - Healthcare | Medtech Booking Management App",
      stack: [
        "Flutter",
        "Laravel"
      ],
      is_desktop: false,
      learnings: "In this project, I learned so much such as authentication, single sign on, REST API, using libraries, night mode implementation, and so much more.",
      cover_img: "/assets/images/cover/needlmedtech.webp",
      sample_ui: [
        "/assets/images/needl/medtech/login.webp",
        "/assets/images/needl/medtech/forgot_password.webp",
        "/assets/images/needl/medtech/pin_code.webp",
        "/assets/images/needl/medtech/home_page.webp",
        "/assets/images/needl/medtech/home_drawer.webp",
        "/assets/images/needl/medtech/dashboard_page.webp",
        "/assets/images/needl/medtech/dashboard_page2.webp",
        "/assets/images/needl/medtech/verify_password.webp",
        "/assets/images/needl/medtech/email_reports_page.webp",
        "/assets/images/needl/medtech/notifications_page.webp",
        "/assets/images/needl/medtech/notifications_page2.webp",
        "/assets/images/needl/medtech/recent_bookings_page.webp",
        "/assets/images/needl/medtech/recent_bookings_calendar.webp",
        "/assets/images/needl/medtech/upcoming_bookings.webp",
        "/assets/images/needl/medtech/settings_page.webp",
        "/assets/images/needl/medtech/bug_reports_page.webp",
        "/assets/images/needl/medtech/change_password_page.webp"
      ],
      demo_video: "",
      git_url: "",
      demo_app: "",
      demo_url: "https://isproj2b.benilde.edu.ph/NeedL",
      color: "#8e51feff"
    },
    {
      name: "Spotify Clone",
      description: "Spotify clone built with React and ContextAPI, featuring music browsing and playlist management.",
      short_description: "Spotify clone built with React and ContextAPI",
      cover_img: "/assets/images/spotifyclone/cover.webp",
      sample_ui: [
        "/assets/images/spotifyclone/spotify_1.webp",
        "/assets/images/spotifyclone/spotify_2.webp",
        "/assets/images/spotifyclone/spotify_3.webp",
        "/assets/images/spotifyclone/spotify_4.webp"
      ],
      is_desktop: true,
      stack: [
        "React",
        "Context API",
        "CSS",
        "BEM Styling"
      ],
      learnings: "Built a responsive Spotify clone to learn React Context API and BEM styling methodology.",
      demo_video: "",
      git_url: "https://github.com/bisunajaime/spotify-clone",
      demo_url: "https://bisunajaime-spotifyclone.netlify.app",
      color: "#39c061ff"
    },
    {
      name: "Task Management Board",
      description: "Task Management Board similar to JIRA/Trello built with React and Redux, featuring drag-and-drop functionality.",
      short_description: "Task Management Board similar to JIRA/Trello built with React and Redux",
      cover_img: "/assets/images/taskmanagementboard/cover.webp",
      sample_ui: [
        "/assets/images/taskmanagementboard/1.webp",
        "/assets/images/taskmanagementboard/2.webp",
        "/assets/images/taskmanagementboard/3.webp",
        "/assets/images/taskmanagementboard/4.webp",
        "/assets/images/taskmanagementboard/5.webp"
      ],
      is_desktop: true,
      stack: [
        "React",
        "Redux",
        "Antd"
      ],
      learnings: "Learned Redux state management and implemented drag-and-drop features for task organization.",
      demo_video: "",
      git_url: "https://github.com/bisunajaime/task-management-board",
      demo_url: "https://bisunajaime-kanban.netlify.app",
      color: "#ab9effff"
    },
    {
      name: "FlutterPH #UIChallenge",
      description: "Joined FlutterPH UI Challenge event, where individuals had to develop an online store UI using Flutter.",
      short_description: "FlutterPH Group UI Challenge: Build an online store UI using Flutter.",
      stack: [
        "Flutter"
      ],
      is_desktop: false,
      learnings: "In this project, I was able to improve on designing and developing user interfaces in Flutter. The design inspiration for this came from one of the UX Instagram pages I follow.",
      cover_img: "/assets/images/cover/uichallenge.webp",
      sample_ui: [
        "/assets/images/uichal_flph/first.webp",
        "/assets/images/uichal_flph/second.webp",
        "/assets/images/uichal_flph/third.webp",
        "/assets/images/uichal_flph/fourth.webp",
        "/assets/images/uichal_flph/fifth.webp",
        "/assets/images/uichal_flph/sixth.webp",
        "/assets/images/uichal_flph/seventh.webp"
      ],
      demo_video: "https://youtu.be/JSg9jyRQ680",
      git_url: "https://codepen.io/CambooBabbage/pen/VwaZPXp",
      demo_app: "",
      color: "#bdfec1"
    },
    {
      name: "Cinemalist",
      description: "Available on Google Play, Cinemalist is a mobile application built using the TMDB API, provided the trending information of movie, tv shows, and actors.",
      short_description: "Latest movies and tv shows in one app.",
      stack: [
        "Flutter",
        "TMDB API",
        "BLoC"
      ],
      is_desktop: false,
      learnings: "In this project I was able to learn more about state management in Flutter, aside from popular/trending state management methods (e.g. Provider). I was able to learn how to use BLoC (Business Logic Component) for state management. According to some articles I have read, this is one of the most preferred methods for managing state due to its scalability and easier code readability.",
      cover_img: "/assets/images/cinemalist/cinemalist_cover.webp",
      sample_ui: [
        "/assets/images/cinemalist/first.webp",
        "/assets/images/cinemalist/second.webp",
        "/assets/images/cinemalist/third.webp",
        "/assets/images/cinemalist/fourth.webp",
        "/assets/images/cinemalist/fifth.webp",
        "/assets/images/cinemalist/sixth.webp",
        "/assets/images/cinemalist/seventh.webp",
        "/assets/images/cinemalist/eight.webp",
        "/assets/images/cinemalist/ninth.webp",
        "/assets/images/cinemalist/tenth.webp",
        "/assets/images/cinemalist/eleven.webp",
        "/assets/images/cinemalist/twelve.webp"
      ],
      demo_video: "https://youtu.be/mvE_Wosaais",
      git_url: "https://github.com/bisunajaime/cinemalist",
      demo_app: "",
      demo_url: "https://play.google.com/store/apps/details?id=com.bisunajaime.cinemalist",
      color: "#ff99d6"
    },
    {
      name: "Hlobe@Gome",
      description: "Mobile app to interface information such as download/upload speed, consumption, usage, as well as connected devices from Huawei based routers such as Globe@Home.",
      short_description: "Interface Globe@Home WiFi details in mobile app",
      stack: [
        "React Native"
      ],
      is_desktop: false,
      learnings: "In this project I learned how to interface with router APIs and display network information in a user-friendly mobile interface.",
      cover_img: "/assets/images/hlobeatgome/hlobeatgome_cover.webp",
      sample_ui: [
        "/assets/images/hlobeatgome/first.webp",
        "/assets/images/hlobeatgome/second.webp",
        "/assets/images/hlobeatgome/third.webp",
        "/assets/images/hlobeatgome/fourth.webp",
        "/assets/images/hlobeatgome/fifth.webp",
        "/assets/images/hlobeatgome/sixth.webp",
        "/assets/images/hlobeatgome/seventh.webp"
      ],
      demo_video: "",
      git_url: "",
      demo_app: "",
      demo_url: "https://github.com/bisunajaime",
      color: "#83B4FF"
    },
    {
      name: "Covid19-Tracker",
      description: "Covid19 Tracker is a mobile application built during the covid 19 quarantine to stay updated with the current number of cases and status of each country.",
      short_description: "Real-time updates on COVID cases.",
      stack: [
        "Flutter",
        "ExpressJS",
        "NodeJS",
        "Heroku",
        "NewsAPI",
        "Web Scraping"
      ],
      is_desktop: false,
      learnings: "In this project I was able to learn how to use NodeJS for web scraping together with ExpressJS for fetching and sorting the scraped data. I was able to use Heroku for hosting the ExpressJS REST API. I also was able to integrate a News API to see news from different categories.",
      cover_img: "/assets/images/covidtracker/covidtracker_cover.webp",
      sample_ui: [
        "/assets/images/covidtracker/first.webp",
        "/assets/images/covidtracker/second.webp",
        "/assets/images/covidtracker/third.webp",
        "/assets/images/covidtracker/fourth.webp",
        "/assets/images/covidtracker/fifth.webp"
      ],
      demo_video: "https://youtu.be/dujHh9_RQEc",
      git_url: "https://github.com/bisunajaime/ncovtracker-provider",
      demo_app: "",
      color: "#f9a8a7"
    },
    // {
    //   name: "WhatsCook'n",
    //   hasDemo: false,
    //   description: "WhatsCook'n is one of the projects I made during the covid quarantine. It serves as a platform for small and local businesses, found in BF Homes Paranaque, to advertise their food products. The app makes it easier for people to look for the food they feel like having, also brings publicity to the small business, making them well known for their products.",
    //   short_description: "Mobile app for online food sellers in BF Homes, Paranaque",
    //   stack: [
    //     "Flutter",
    //     "Firebase"
    //   ],
    //   cover_img: "/assets/images/whatscookn/whatscookn_cover.svg",
    //   is_desktop: false,
    //   learnings: "In this project, I was able to learn how to use Firebase Cloud Firestore as my Database, Firebase Cloud Storage for storing files, and connecting it with Flutter to display data in realtime using Streams.",
    //   demo_video: "",
    //   git_url: "",
    //   demo_app: "",
    //   color: "#ffd66c"
    // },
    // {
    //   name: "BayanihanPH",
    //   hasDemo: false,
    //   description: "BayanihanPH is a mobile application for people who are looking to help others during calamity. It allows relief centers to input information such as availability, supplies needed, contact info, and accepted goods. Regular users of the application will be able to see nearby centers to offer their help to. The app makes it easy for them to locate the relief center, with the Open in Maps feature, which launches the users maps application such as Google Maps or Waze, and shows them how to get there.",
    //   short_description: "App for people who are looking to help others.",
    //   stack: [
    //     "Flutter",
    //     "Firebase"
    //   ],
    //   is_desktop: false,
    //   learnings: "In this project, it was my first time to use Firebase Realtime Database as my database and was able to do some CRUD operations. I also learned that there are alternatives to Google Maps (e.g. Open Street Maps) that can be used as a maps provider.",
    //   cover_img: "/assets/images/bayanihanph/bayanihanph_cover.svg",
    //   demo_video: "https://youtu.be/rXD9IMnrsiY",
    //   git_url: "https://github.com/deeemdeeem/BayanihanPh",
    //   demo_app: "",
    //   color: "#3687ff"
    // },
    // {
    //   name: "Weather App",
    //   hasDemo: false,
    //   description: "Weather web app made with raw HTML, CSS, and Vanilla JS",
    //   short_description: "Weather web app using HTML, CSS, and JS",
    //   stack: [
    //     "Fetch API",
    //     "HTML",
    //     "CSS",
    //     "JS"
    //   ],
    //   is_desktop: true,
    //   learnings: "Since most of my projects in the site are made with Flutter, I decided to create a weather web app that fetches data from an API and displays current weather information.",
    //   cover_img: "/assets/images/weatherapp/weatherapp_cover.webp",
    //   demo_video: "https://bisunajaime-weatherapp.netlify.app/",
    //   git_url: "https://github.com/bisunajaime/weather_app",
    //   demo_app: "",
    //   color: "#7ba27c"
    // },
    // {
    //   name: "QR.me",
    //   hasDemo: false,
    //   description: "Continue browsing on your phone from your desktop, or share with friends what you're browsing. QR.me allows you to generate a qr code from your current website and scan it to continue browsing from your mobile device.",
    //   short_description: "Browser extension for Firefox",
    //   stack: [
    //     "HTML",
    //     "CSS",
    //     "JS"
    //   ],
    //   is_desktop: true,
    //   learnings: "In this project I was able to learn how to build browser extensions for firefox.",
    //   cover_img: "/assets/images/qrme/qrme_cover.svg",
    //   demo_video: "",
    //   git_url: "",
    //   demo_app: "",
    //   demo_url: "https://addons.mozilla.org/en-US/firefox/addon/qr-me/",
    //   color: "#fff"
    // }
  ]
};
