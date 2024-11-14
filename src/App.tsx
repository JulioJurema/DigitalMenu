import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./Pages/SignIn/index"
import Administration from "./Pages/Administration"
import UserWindow from "./Pages/UserWindoew"

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>  
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<Administration />} />
          <Route path="/comercio" element={<UserWindow />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
