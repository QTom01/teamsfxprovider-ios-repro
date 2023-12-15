import { createRoot } from "react-dom/client";
import AppRoot from "./components/core/AppRoot";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<AppRoot />);
