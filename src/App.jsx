import { Routes, Route, Navigate } from "react-router-dom";
import LayoutShell from "./components/LayoutShell.jsx";
import Landing from "./pages/Landing.jsx";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";
import Vocabulary from "./pages/Vocabulary.jsx";
import VocabStudy from "./pages/VocabStudy.jsx";
import VocabTest from "./pages/VocabTest.jsx";
import Stories from "./pages/Stories.jsx";
import StoryLesson from "./pages/StoryLesson.jsx";
import Progress from "./pages/Progress.jsx";
import History from "./pages/History.jsx";
import Notes from "./pages/Notes.jsx";
import NotesBoard from "./pages/NotesBoard.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Help from "./pages/Help.jsx";
import About from "./pages/About.jsx";
import { getCurrentUser } from "./utils/auth.js";

function RequireAuth({ children }) {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default function App() {
  return (
    <LayoutShell>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/vocabulary"
          element={
            <RequireAuth>
              <Vocabulary />
            </RequireAuth>
          }
        />
        <Route
          path="/vocabulary/study/:setId"
          element={
            <RequireAuth>
              <VocabStudy />
            </RequireAuth>
          }
        />
        <Route
          path="/vocabulary/test/:setId"
          element={
            <RequireAuth>
              <VocabTest />
            </RequireAuth>
          }
        />
        <Route
          path="/stories"
          element={
            <RequireAuth>
              <Stories />
            </RequireAuth>
          }
        />
        <Route
          path="/stories/lesson/:lessonId"
          element={
            <RequireAuth>
              <StoryLesson />
            </RequireAuth>
          }
        />
        <Route
          path="/progress"
          element={
            <RequireAuth>
              <Progress />
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              <History />
            </RequireAuth>
          }
        />
        <Route
          path="/notes"
          element={
            <RequireAuth>
              <Notes />
            </RequireAuth>
          }
        />
        <Route
          path="/notes/board"
          element={
            <RequireAuth>
              <NotesBoard />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route
          path="/help"
          element={
            <RequireAuth>
              <Help />
            </RequireAuth>
          }
        />
        <Route
          path="/about"
          element={
            <RequireAuth>
              <About />
            </RequireAuth>
          }
        />
        <Route
          path="/UP"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LayoutShell>
  );
}

