export const portfolioData = {
  experiences: [
    {
      name: "Baret",
      role: "Full Stack Developer",
      from: "August 2024",
      to: "January 2026",
      cover_img: "/assets/images/experience/baret.png",
      website: "https://baret.tech",
      color: "#d1b1fdff"
    },
    {
      name: "FiveP",
      role: "Full Stack Developer",
      from: "April 2023",
      to: "August 2024",
      cover_img: "/assets/images/experience/fivep.png",
      website: "https://fivep.com.au",
      color: "#ffaf6eff"
    },
    {
      name: "Maliksi Creative Technologies, Inc.",
      role: "Junior Software Engineer",
      from: "May 2021",
      to: "April 2023",
      cover_img: "/assets/images/experience/maliksi.png",
      website: "https://maliksi.io",
      color: "#aebeffff"
    },
    {
      name: "Courtesy Point Technologies, Inc.",
      role: "Java Developer Intern",
      from: "January 2021",
      to: "April 2021",
      cover_img: "/assets/images/experience/cpti.png",
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
      name: "Greenwash Laundry POS",
      description: "A full-stack Point-of-Sale system for laundry services, featuring an admin dashboard with kanban-style order tracking, real-time updates via Socket.IO, SMS notifications, PDF report generation, thermal printer integration, and a Flutter-based Android tablet POS.",
      short_description: "Full-stack Laundry POS with admin dashboard, real-time updates, and Flutter Android tablet app.",
      stack: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Radix UI",
        "@dnd-kit",
        "Sonner",
        "Node.js",
        "Express 5",
        "TypeScript",
        "PostgreSQL",
        "Knex.js",
        "Socket.IO",
        "Flutter",
        "Sentry"
      ],
      is_desktop: true,
      learnings: "Built a complete laundry POS ecosystem spanning a React admin dashboard with drag-and-drop kanban boards, a Node.js backend with PostgreSQL and real-time Socket.IO updates, and a Flutter Android tablet app with BLE thermal printer integration.",
      cover_img: "/assets/images/greenwash/cover.webp",
      sample_ui: [],
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
      cover_img: "/assets/images/wallection/cover.png",
      sample_ui: [
        "/assets/images/wallection/first.png",
        "/assets/images/wallection/second.png",
        "/assets/images/wallection/third.png",
        "/assets/images/wallection/fourth.png",
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
      cover_img: "/assets/images/cover/needlpatient.png",
      sample_ui: [
        "/assets/images/needl/patient/login.png",
        "/assets/images/needl/patient/forgot_password.png",
        "/assets/images/needl/patient/register.png",
        "/assets/images/needl/patient/pin_code.png",
        "/assets/images/needl/patient/home_page.png",
        "/assets/images/needl/patient/select_location_page.png",
        "/assets/images/needl/patient/select_location_confirmation.png",
        "/assets/images/needl/patient/select_clinic_page.png",
        "/assets/images/needl/patient/select_clinic_confirmation.png",
        "/assets/images/needl/patient/select_test_page.png",
        "/assets/images/needl/patient/test_sample_page.png",
        "/assets/images/needl/patient/set_schedule_page.png",
        "/assets/images/needl/patient/payment_summary_page.png",
        "/assets/images/needl/patient/home_drawer.png",
        "/assets/images/needl/patient/dashboard_page.png",
        "/assets/images/needl/patient/reports_page.png",
        "/assets/images/needl/patient/reports_password_confirmation_page.png",
        "/assets/images/needl/patient/locations_page.png",
        "/assets/images/needl/patient/set_location_page.png",
        "/assets/images/needl/patient/location_confirmation_page.png",
        "/assets/images/needl/patient/recent_tests_page.png",
        "/assets/images/needl/patient/recent_tests_calendar_view.png",
        "/assets/images/needl/patient/compare_tests_page.png",
        "/assets/images/needl/patient/compare_tests_selected_page.png",
        "/assets/images/needl/patient/compare_tests_email_pdf_page.png",
        "/assets/images/needl/patient/test_details_page.png",
        "/assets/images/needl/patient/test_details_page_2.png",
        "/assets/images/needl/patient/test_results.png",
        "/assets/images/needl/patient/email_selected_test.png",
        "/assets/images/needl/patient/settings_page.png",
        "/assets/images/needl/patient/bug_reports_page.png",
        "/assets/images/needl/patient/change_password_page.png",
        "/assets/images/needl/patient/terms_and_conditions_page.png"
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
      cover_img: "/assets/images/cover/needlmedtech.png",
      sample_ui: [
        "/assets/images/needl/medtech/login.png",
        "/assets/images/needl/medtech/forgot_password.png",
        "/assets/images/needl/medtech/pin_code.png",
        "/assets/images/needl/medtech/home_page.png",
        "/assets/images/needl/medtech/home_drawer.png",
        "/assets/images/needl/medtech/dashboard_page.png",
        "/assets/images/needl/medtech/dashboard_page2.png",
        "/assets/images/needl/medtech/verify_password.png",
        "/assets/images/needl/medtech/email_reports_page.png",
        "/assets/images/needl/medtech/notifications_page.png",
        "/assets/images/needl/medtech/notifications_page2.png",
        "/assets/images/needl/medtech/recent_bookings_page.png",
        "/assets/images/needl/medtech/recent_bookings_calendar.png",
        "/assets/images/needl/medtech/upcoming_bookings.png",
        "/assets/images/needl/medtech/settings_page.png",
        "/assets/images/needl/medtech/bug_reports_page.png",
        "/assets/images/needl/medtech/change_password_page.png"
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
      cover_img: "/assets/images/spotifyclone/cover.png",
      sample_ui: [
        "/assets/images/spotifyclone/spotify_1.png",
        "/assets/images/spotifyclone/spotify_2.png",
        "/assets/images/spotifyclone/spotify_3.png",
        "/assets/images/spotifyclone/spotify_4.png"
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
      cover_img: "/assets/images/taskmanagementboard/cover.png",
      sample_ui: [
        "/assets/images/taskmanagementboard/1.png",
        "/assets/images/taskmanagementboard/2.png",
        "/assets/images/taskmanagementboard/3.png",
        "/assets/images/taskmanagementboard/4.png",
        "/assets/images/taskmanagementboard/5.png"
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
      cover_img: "/assets/images/cover/uichallenge.png",
      sample_ui: [
        "/assets/images/uichal_flph/first.png",
        "/assets/images/uichal_flph/second.png",
        "/assets/images/uichal_flph/third.png",
        "/assets/images/uichal_flph/fourth.png",
        "/assets/images/uichal_flph/fifth.png",
        "/assets/images/uichal_flph/sixth.png",
        "/assets/images/uichal_flph/seventh.png"
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
      cover_img: "/assets/images/cinemalist/cinemalist_cover.png",
      sample_ui: [
        "/assets/images/cinemalist/first.png",
        "/assets/images/cinemalist/second.png",
        "/assets/images/cinemalist/third.png",
        "/assets/images/cinemalist/fourth.png",
        "/assets/images/cinemalist/fifth.png",
        "/assets/images/cinemalist/sixth.png",
        "/assets/images/cinemalist/seventh.png",
        "/assets/images/cinemalist/eight.png",
        "/assets/images/cinemalist/ninth.png",
        "/assets/images/cinemalist/tenth.png",
        "/assets/images/cinemalist/eleven.png",
        "/assets/images/cinemalist/twelve.png"
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
      cover_img: "/assets/images/hlobeatgome/hlobeatgome_cover.png",
      sample_ui: [
        "/assets/images/hlobeatgome/first.png",
        "/assets/images/hlobeatgome/second.png",
        "/assets/images/hlobeatgome/third.png",
        "/assets/images/hlobeatgome/fourth.png",
        "/assets/images/hlobeatgome/fifth.png",
        "/assets/images/hlobeatgome/sixth.png",
        "/assets/images/hlobeatgome/seventh.png"
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
      cover_img: "/assets/images/covidtracker/covidtracker_cover.png",
      sample_ui: [
        "/assets/images/covidtracker/first.png",
        "/assets/images/covidtracker/second.png",
        "/assets/images/covidtracker/third.png",
        "/assets/images/covidtracker/fourth.png",
        "/assets/images/covidtracker/fifth.png"
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
    //   cover_img: "/assets/images/weatherapp/weatherapp_cover.png",
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
