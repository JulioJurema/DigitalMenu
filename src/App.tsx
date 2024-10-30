import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./Pages/SignIn"
import Administration from "./Pages/Administration"

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>  
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<Administration />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
