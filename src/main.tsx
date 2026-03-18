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
    <div className="min-h-screen bg-background px-6 text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center">
        <div className="glass-panel w-full rounded-3xl p-6">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Loading assets
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Preparing images for the best experience.
          </p>
          <div className="mt-4 h-2.5 w-full rounded-full bg-muted">
            <div
              className="h-2.5 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {percent}% ({loaded}/{total})
          </p>
        </div>
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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <App />
    </ThemeProvider>,
  );

  if (!BLOCK_ON_ALL_ASSETS) {
    prefetchImages(background);
  }
}

bootstrap();
