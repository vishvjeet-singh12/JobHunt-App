import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import UserContextList from "./Store/Usecontext.jsx";
import { Provider } from "react-redux";
import Store from "./Store/Redux/Store.jsx";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(Store);

createRoot(document.getElementById("root")).render(
  <UserContextList>
    <BrowserRouter>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      <Toaster />
    </BrowserRouter>
  </UserContextList>
);
