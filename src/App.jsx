import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import WelcomePage from "./pages/welcome";
import DoctorsPage from "./pages/doctors";
import Dashboard from "./pages/dashboard";
import SessionPage from "./pages/session";
import QuestionsPage from "./pages/questions";
import ResultsPage from "./pages/results";
import SessionProvider from "./contexts/sessionContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<WelcomePage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/session" element={<SessionPage />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Route>
  )
);

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;
