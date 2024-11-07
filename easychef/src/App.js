import logo from './logo.svg';
import './App.css';
import Navigation from './components/navigation';
import Footer from './components/footer';
import Homepage from './pages/homepage';
import Loginpage from './pages/loginpage';
import Signuppage from "./pages/signuppage";
import Detailpage from './pages/detailpage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/layout';
import CreateRecipe from './pages/createrecipe';
import Myrecipe from './pages/myrecipepage';
import Shoppinglist from './pages/shoppinglist';
import Editprofile from './pages/editprofile';
import ViewProfile from "./pages/viewprofile";
import EditRecipe from './pages/editRecipe';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="signup" element={<Signuppage />} />
          <Route path='createrecipe' element={<CreateRecipe />} />
          <Route path='detail' element={<Detailpage />} />
          <Route path='myrecipe' element={<Myrecipe />} />
          <Route path='shoppinglist' element={<Shoppinglist />} />
          <Route path='/editprofile/:id' element={<Editprofile />} />
          <Route path='/viewprofile/:id' element={<ViewProfile />} />
          <Route path="/editrecipe/:id" element={<EditRecipe />} />

          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <Navigation />
    //   <Homepage />
    //   <Footer />
    // </div>
  );
}

export default App;
