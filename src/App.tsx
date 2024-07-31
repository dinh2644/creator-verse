import { useState, useEffect } from 'react';
import './App.css'
import {
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Loading from './components/Loading';
import { supabase } from "./client";
import { Toaster } from "react-hot-toast";
// PAGES
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import PageNotFound from './pages/PageNotFound';
import ViewCreator from './pages/ViewCreator';

export interface Creator {
  id: number,
  description: string,
  imageURL: string,
  name: string,
  url: string,
  youtube: string,
  twitter: string,
  instagram: string
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [creators, setCreators] = useState<Creator[]>([])

  // Fetch creators
  useEffect(() => {
    const fetchCreators = async () => {
      const { data } = await supabase
        .from("creators")
        .select()
        .order("created_at", { ascending: false });


      if (data) {
        setCreators(data as Creator[]);
      } else {
        setCreators([]);
      }
      setIsLoading(false);
    };
    fetchCreators();
  }, []);


  return (
    <>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Outlet />
                </>
              }>
              <Route index element={<Dashboard />} />
              <Route path="/creators" element={<ShowCreators creators={creators} />} />
              <Route path="/new" element={<AddCreator />} />
              <Route path="/edit/:id" element={<EditCreator creators={creators} />} />
              <Route path="/about/:id" element={<ViewCreator creators={creators} />} />


            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      )}

    </>
  )
}

export default App
