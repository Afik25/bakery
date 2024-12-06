import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { AuthProvider } from "./hooks/context/AuthProvider";
import { store } from "./hooks/redux/store";
import { Provider } from "react-redux";
//
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      // offset: 120, // offset (in px) from the original trigger point
      // delay: 1000, // values from 0 to 3000, with step 50ms
      // duration: 2000, // values from 0 to 3000, with step 50ms
      easing: "ease-in-out", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      anchorPlacement: "top-bottom",
    });
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
