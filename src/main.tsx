import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GameProvider } from "./contexts/GameContext.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <GameProvider>
         <App />
      </GameProvider>
   </StrictMode>
);
