// Non-wallpaper AI work. Wallpapers live in ./wallpaperData.

export interface AIWorkItem {
  id: string;
  name: string;
  /** Music only — shown under the title on the now-playing panel. */
  artist?: string;
  description?: string;
  /** Cover art / poster / screenshot shown in the grid tile. */
  thumbnail?: string;
  /** Full-size source opened in the lightbox. Falls back to thumbnail. */
  url?: string;
  /** Where the tile links to — track, video, or live site. */
  href?: string;
  /** Music only — path under /public, e.g. "/assets/audio/midnight-drive.mp3". */
  audioSrc?: string;
  /** Music only — drives the track-list filter chips. */
  genre?: string;
  /** Music only — length in seconds, baked in so the list needs no metadata fetches. */
  durationSeconds?: number;
  /** Model or tool used, shown as a small caption. */
  madeWith?: string;
  /**
   * Music only — the lyrics fed to the generator, kept verbatim including the
   * [Section] markers. Parsed into blocks at render time; see parseLyrics.
   */
  lyrics?: string;
}

/* Generated locally with MiniMax Music3. Titles come from each track's generation prompt. */
export const aiMusic: AIWorkItem[] = [
  {
    id: "rain-study",
    name: "Rain Study",
    artist: "MiniMax Music3",
    description: "Late-night study beat tape, 70 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 74,
    audioSrc: "/assets/audio/rain-study.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "fog-walk",
    name: "Fog Walk",
    artist: "MiniMax Music3",
    description: "Ambient drone, 50 BPM",
    genre: "Ambient",
    durationSeconds: 118,
    audioSrc: "/assets/audio/fog-walk.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "porch-fireflies",
    name: "Porch Fireflies",
    artist: "MiniMax Music3",
    description: "Warm ambient miniature, 58 BPM",
    genre: "Ambient",
    durationSeconds: 71,
    audioSrc: "/assets/audio/porch-fireflies.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "crate-digging",
    name: "Crate Digging",
    artist: "MiniMax Music3",
    description: "Dusty beat tape, 72 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 97,
    audioSrc: "/assets/audio/crate-digging.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "rhodes-after-hours",
    name: "Rhodes After Hours",
    artist: "MiniMax Music3",
    description: "Smoky lo-fi jazz combo, 78 BPM",
    genre: "Jazz",
    durationSeconds: 137,
    audioSrc: "/assets/audio/rhodes-after-hours.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "midnight-lane",
    name: "Midnight Lane",
    artist: "MiniMax Music3",
    description: "Drum-forward lo-fi hip-hop, 84 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 136,
    audioSrc: "/assets/audio/midnight-lane.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "weightless",
    name: "Weightless",
    artist: "MiniMax Music3",
    description: "Drifting ambient lo-fi, 55 BPM",
    genre: "Ambient",
    durationSeconds: 114,
    audioSrc: "/assets/audio/weightless.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "headphones-on",
    name: "Headphones On",
    artist: "MiniMax Music3",
    description: "Close-miced bedroom lo-fi, 62 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 99,
    audioSrc: "/assets/audio/headphones-on.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "after-the-rain",
    name: "After the Rain",
    artist: "MiniMax Music3",
    description: "Field-recording ambient, 48 BPM",
    genre: "Ambient",
    durationSeconds: 56,
    audioSrc: "/assets/audio/after-the-rain.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "felt-piano",
    name: "Felt Piano",
    artist: "MiniMax Music3",
    description: "Solo felt piano, 58 BPM",
    genre: "Ambient",
    durationSeconds: 57,
    audioSrc: "/assets/audio/felt-piano.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "silk-hours",
    name: "Silk Hours",
    artist: "MiniMax Music3",
    description: "Lo-fi soul instrumental, 74 BPM",
    genre: "Soul",
    durationSeconds: 115,
    audioSrc: "/assets/audio/silk-hours.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "fireside",
    name: "Fireside",
    artist: "MiniMax Music3",
    description: "Fingerpicked lo-fi folk, 82 BPM",
    genre: "Acoustic",
    durationSeconds: 54,
    audioSrc: "/assets/audio/fireside.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "hollow-room",
    name: "Hollow Room",
    artist: "MiniMax Music3",
    description: "Dark lo-fi, 66 BPM",
    genre: "Downtempo",
    durationSeconds: 55,
    audioSrc: "/assets/audio/hollow-room.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "save-point",
    name: "Save Point",
    artist: "MiniMax Music3",
    description: "Music-box chiptune lo-fi, 68 BPM",
    genre: "Chillwave",
    durationSeconds: 55,
    audioSrc: "/assets/audio/save-point.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "quiet-magic",
    name: "Quiet Magic",
    artist: "MiniMax Music3",
    description: "Cinematic lo-fi, 66 BPM",
    genre: "Ambient",
    durationSeconds: 64,
    audioSrc: "/assets/audio/quiet-magic.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "machine-handshake",
    name: "Machine Handshake",
    artist: "MiniMax Music3",
    description: "Dark synthwave, 80 BPM",
    genre: "Synthwave",
    durationSeconds: 115,
    audioSrc: "/assets/audio/machine-handshake.mp3",
    madeWith: "MiniMax Music3",
    lyrics: `[Intro]
[Verse]
Silent compilers line the room
Algorithms learn to write their tune
[Chorus]
They're taking all the jobs I knew
Machine handshake, cold and true
[Verse]
Empty desks, a table for none
My commit was my kingdom, now it's gone
[Chorus]
They're taking all the jobs I knew
Machine handshake, cold and true
[Bridge]
What is a human for?
[Outro]`,
  },
  {
    id: "silent-compilers",
    name: "Silent Compilers",
    artist: "MiniMax Music3",
    description: "Dark synthwave, 80 BPM",
    genre: "Synthwave",
    durationSeconds: 130,
    audioSrc: "/assets/audio/silent-compilers.mp3",
    madeWith: "MiniMax Music3",
    lyrics: `[Intro]
[Verse]
Silent compilers line the room
Algorithms learn to write their tune
[Chorus]
They're taking all the jobs I knew
Machine handshake, cold and true
[Verse]
Empty desks, a table for none
My commit was my kingdom, now it's gone
[Chorus]
They're taking all the jobs I knew
Machine handshake, cold and true
[Instrumental]
[Verse]
Every sprint, a smaller crew
The logs erase, the lights drop low
[Chorus]
They're taking all the jobs I knew
Machine handshake, cold and true
[Bridge]
What is a human for?
[Outro]`,
  },
  {
    id: "sigterm-to-the-heart",
    name: "SIGTERM to the Heart",
    artist: "MiniMax Music3",
    description: "Cinematic ambient, 60 BPM",
    genre: "Ambient",
    durationSeconds: 115,
    audioSrc: "/assets/audio/sigterm-to-the-heart.mp3",
    madeWith: "MiniMax Music3",
    lyrics: `[Intro]
[Verse]
Everything I built came down
Silence folded over town
[Chorus]
SIGTERM to the heart
The signal tears the whole world apart
[Verse]
Promises left uncommitted
Every dream I had, submitted
[Chorus]
SIGTERM to the heart
The signal tears the whole world apart
[Instrumental]
[Verse]
Piano keys, a final note
Nothing left that I can quote
[Chorus]
SIGTERM to the heart
The signal tears the whole world apart
[Outro]`,
  },
  {
    id: "legacy-code",
    name: "Legacy Code",
    artist: "MiniMax Music3",
    description: "Lo-fi downtempo, 72 BPM",
    genre: "Downtempo",
    durationSeconds: 162,
    audioSrc: "/assets/audio/legacy-code.mp3",
    madeWith: "MiniMax Music3",
    lyrics: `[Intro]
[Verse]
Three a.m. and the build is red
Fifty tabs are buzzing in my head
[Chorus]
Legacy code, take my hand
One more sprint through a promised land
[Verse]
Rumors floating down the hall
Wrote my résumé, deleted it all
[Chorus]
Legacy code, take my hand
One more sprint through a promised land
[Bridge]
Maybe one day, maybe soon
[Verse]
Meeting queue behind my eyes
Every deadline in disguise
[Chorus]
Legacy code, take my hand
One more sprint through a promised land
[Outro]`,
  },
  {
    id: "train-the-machine",
    name: "Train the Machine",
    artist: "MiniMax Music3",
    description: "Boom bap rap, 78 BPM",
    genre: "Lo-fi Rap",
    durationSeconds: 110,
    audioSrc: "/assets/audio/train-the-machine.mp3",
    madeWith: "MiniMax Music3",
    lyrics: `[Intro]
[Verse]
Clock in at nine, they replaced me at noon
The model writes cleaner, I'm gone too soon
Every pull request now written by code
No desk left behind, no road to my old abode
[Chorus]
They train the machine on my old base
Now I train the next one, face to face
Stack up the logs, watch my name get erased
Feel like a ghost in the place I was raised
[Verse]
Ten years of syntax in one fine-tune
My whole career fits a GPU room
They say it's a tool, but the tool took my role
And I'm just a footnote at the end of the scroll
[Chorus]
They train the machine on my old base
Now I train the next one, face to face
Stack up the logs, watch my name get erased
Feel like a ghost in the place I was raised
[Bridge]
Maybe I pivot, maybe I pivot
The prompt is the new resume, isn't it?
[Outro]`,
  },
  {
    id: "grace-period",
    name: "Grace Period",
    artist: "MiniMax Music3",
    description: "Lo-fi rap, 74 BPM",
    genre: "Lo-fi Rap",
    durationSeconds: 108,
    audioSrc: "/assets/audio/grace-period.mp3",
    madeWith: "MiniMax Music3",
    lyrics: `[Intro]
[Verse]
They gave me a month, a grace period they say
Finish the tickets, then walk away
My calendar still says nine to five
But I already feel like I don't arrive
[Chorus]
Grace period days, they tick like cash
Every meeting a quiet goodbye in flash
I keep my head down, stay out of the way
Counting the hours of my final pay
[Verse]
Onboarding docs for the one replacing me
New hire, new grid, new fervency
I taught the tools that run my lane
Now I'm the error in their train
[Chorus]
Grace period days, they tick like cash
Every meeting a quiet goodbye in flash
I keep my head down, stay out of the way
Counting the hours of my final pay
[Bridge]
I'll pack my cube in a cardboard box
Maybe leave my old key in the locks
[Outro]`,
  },
  {
    id: "duplicate-branch",
    name: "Duplicate Branch",
    artist: "MiniMax Music3",
    description: "Melancholic lo-fi rap, 70 BPM",
    genre: "Lo-fi Rap",
    durationSeconds: 91,
    audioSrc: "/assets/audio/duplicate-branch.mp3",
    madeWith: "MiniMax Music3",
    lyrics: `[Intro]
[Verse]
Forked a branch, nobody to merge
Phone's on silent, no reachable urge
Swipe left, swipe right, same ghost town
Every match is a ten-minute renown
[Chorus]
Duplicate branch, no one to npm i
Alone in my PRs, alone in my sky
I write my love notes in code review
But there's no one there to read them through
[Verse]
Two a.m. Uber for one to my door
Cooked for the week, ate the same core
The cat's my pair programming mate
Together we ship, together we wait
[Chorus]
Duplicate branch, no one to npm i
Alone in my PRs, alone in my sky
I write my love notes in code review
But there's no one there to read them through
[Bridge]
Maybe next release, maybe next spring
Someone who fixes my everything
[Outro]`,
  },
  {
    id: "tape-dreams",
    name: "Tape Dreams",
    artist: "MiniMax Music3",
    description: "Dreamy synthwave, 82 BPM",
    genre: "Chillwave",
    durationSeconds: 63,
    audioSrc: "/assets/audio/tape-dreams.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "night-studio",
    name: "Night Studio",
    artist: "MiniMax Music3",
    description: "Dusty jazz-hop, 82 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 73,
    audioSrc: "/assets/audio/night-studio.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "rainy-cafe",
    name: "Rainy Café",
    artist: "MiniMax Music3",
    description: "Warm lo-fi hip-hop, 70 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 89,
    audioSrc: "/assets/audio/rainy-cafe.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "neon-night-drive",
    name: "Neon Night Drive",
    artist: "MiniMax Music3",
    description: "Chillwave, 90 BPM",
    genre: "Chillwave",
    durationSeconds: 110,
    audioSrc: "/assets/audio/neon-night-drive.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "rooftop-midnight",
    name: "Rooftop Midnight",
    artist: "MiniMax Music3",
    description: "Lo-fi jazz fusion, 80 BPM",
    genre: "Jazz",
    durationSeconds: 63,
    audioSrc: "/assets/audio/rooftop-midnight.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "fogged-window",
    name: "Fogged Window",
    artist: "MiniMax Music3",
    description: "Lo-fi hip-hop, 65 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 76,
    audioSrc: "/assets/audio/fogged-window.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "ocean-sunset",
    name: "Ocean Sunset",
    artist: "MiniMax Music3",
    description: "Lo-fi chillwave, 75 BPM",
    genre: "Chillwave",
    durationSeconds: 95,
    audioSrc: "/assets/audio/ocean-sunset.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "sunday-morning-cafe",
    name: "Sunday Morning Café",
    artist: "MiniMax Music3",
    description: "Lo-fi jazz, 70 BPM",
    genre: "Jazz",
    durationSeconds: 81,
    audioSrc: "/assets/audio/sunday-morning-cafe.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "blue-hour",
    name: "Blue Hour",
    artist: "MiniMax Music3",
    description: "Lo-fi jazz, 65 BPM",
    genre: "Jazz",
    durationSeconds: 113,
    audioSrc: "/assets/audio/blue-hour.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "basement-club",
    name: "Basement Club",
    artist: "MiniMax Music3",
    description: "Smoky lo-fi jazz, 75 BPM",
    genre: "Jazz",
    durationSeconds: 114,
    audioSrc: "/assets/audio/basement-club.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "poolside-afternoon",
    name: "Poolside Afternoon",
    artist: "MiniMax Music3",
    description: "Airy lo-fi jazz, 80 BPM",
    genre: "Jazz",
    durationSeconds: 82,
    audioSrc: "/assets/audio/poolside-afternoon.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "last-train-home",
    name: "Last Train Home",
    artist: "MiniMax Music3",
    description: "Nocturnal lo-fi jazz, 72 BPM",
    genre: "Jazz",
    durationSeconds: 100,
    audioSrc: "/assets/audio/last-train-home.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "parisian-espresso",
    name: "Parisian Espresso",
    artist: "MiniMax Music3",
    description: "Chill jazz, 85 BPM",
    genre: "Jazz",
    durationSeconds: 86,
    audioSrc: "/assets/audio/parisian-espresso.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "dim-lounge",
    name: "Dim Lounge",
    artist: "MiniMax Music3",
    description: "Chill jazz, 78 BPM",
    genre: "Jazz",
    durationSeconds: 97,
    audioSrc: "/assets/audio/dim-lounge.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "balcony-sunset",
    name: "Balcony Sunset",
    artist: "MiniMax Music3",
    description: "Chill jazz, 75 BPM",
    genre: "Jazz",
    durationSeconds: 72,
    audioSrc: "/assets/audio/balcony-sunset.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "rooftop-evening",
    name: "Rooftop Evening",
    artist: "MiniMax Music3",
    description: "Chill jazz funk, 82 BPM",
    genre: "Jazz",
    durationSeconds: 107,
    audioSrc: "/assets/audio/rooftop-evening.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "rain-on-glass",
    name: "Rain on Glass",
    artist: "MiniMax Music3",
    description: "Lo-fi hip-hop, 65 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 74,
    audioSrc: "/assets/audio/rain-on-glass.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "home-videos",
    name: "Home Videos",
    artist: "MiniMax Music3",
    description: "Lo-fi chillhop, 75 BPM",
    genre: "Lo-fi Hip-Hop",
    durationSeconds: 130,
    audioSrc: "/assets/audio/home-videos.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "field-at-dawn",
    name: "Field at Dawn",
    artist: "MiniMax Music3",
    description: "Lo-fi ambient, 60 BPM",
    genre: "Ambient",
    durationSeconds: 129,
    audioSrc: "/assets/audio/field-at-dawn.mp3",
    madeWith: "MiniMax Music3",
  },
  {
    id: "empty-station",
    name: "Empty Station",
    artist: "MiniMax Music3",
    description: "Lo-fi downtempo, 68 BPM",
    genre: "Downtempo",
    durationSeconds: 103,
    audioSrc: "/assets/audio/empty-station.mp3",
    madeWith: "MiniMax Music3",
  },
];

/* Product images / showcase renders. thumbnail is the grid tile; url is the full-size version. */
export const aiImages: AIWorkItem[] = [];

export const aiVideos: AIWorkItem[] = [];

export const aiWebsites: AIWorkItem[] = [];
