import Posts from "./Posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./Post";
import NewPost from "./NewPost";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Posts />} />
          <Route path="/:postId" element={<Post />} />
          <Route path="/newpost" element={<NewPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
