import { Provider } from "react-redux";
import "./App.css";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Head from "./components/Head";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import CategoryPage from "./components/CategoryPage";
import SearchResults from "./components/SearchResults"; // Import the new search page

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Head />
        <Body />
      </>
    ),
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: <WatchPage />,
      },
      {
        path: "/category/:categoryId",
        element: <CategoryPage />,
      },
      {
        path: "/search/:query", // ✅ Route for search results
        element: <SearchResults />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
