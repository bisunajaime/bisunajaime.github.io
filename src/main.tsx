
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./app/App.tsx";
import "./styles/index.css";
import {
  collectAssetUrls,
  prefetchImages,
  preloadImages,
} from "./app/utils/preloadAssets";

const BLOCK_ON_ALL_ASSETS = false;
const INCLUDE_REMOTE_ASSETS = false;

type LoadingScreenProps = {
  loaded: number;
  total: number;
};

function LoadingScreen({ loaded, total }: LoadingScreenProps) {
  const percent = total > 0 ? Math.round((loaded / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center px-6 text-[#e6ecf5]">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121826]/90 p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-[#e6ecf5]">Loading assets</h1>
        <p className="mt-1 text-sm text-[#9aa8bd]">
          Preparing images for the best experience.
        </p>
        <div className="mt-4 h-2 w-full rounded-full bg-[#1a2233]">
          <div
            className="h-2 rounded-full bg-[#a78bfa] transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-[#9aa8bd]">
          {percent}% ({loaded}/{total})
        </p>
      </div>
    </div>
  );
}

async function bootstrap() {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  const root = createRoot(rootElement);
  const { critical, background, all } = collectAssetUrls({
    includeRemote: INCLUDE_REMOTE_ASSETS,
  });
  const blockingList = BLOCK_ON_ALL_ASSETS ? all : critical;

  root.render(<LoadingScreen loaded={0} total={blockingList.length} />);
  await preloadImages(blockingList, {
    timeoutMs: 15000,
    onProgress: (loaded, total) => {
      root.render(<LoadingScreen loaded={loaded} total={total} />);
    },
  });

  root.render(
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
      <App />
    </ThemeProvider>,
  );

  if (!BLOCK_ON_ALL_ASSETS) {
    prefetchImages(background);
  }
}

bootstrap();
  
