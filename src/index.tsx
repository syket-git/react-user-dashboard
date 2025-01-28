import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
);
