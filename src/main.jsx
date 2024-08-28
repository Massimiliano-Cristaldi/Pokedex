import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Pokedex from './components/Pokedex.jsx';
import PokeList, { loader as pokeLoader } from './components/PokeList.jsx';
import ListButton from './components/ListButton.jsx';
import PokemonDetail, { loader as detailLoader } from './components/PokemonDetail.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import { perPageContext } from "./utils";
import './index.css';

const perPage = 20;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pokedex/>,
    children: [
      {
        path: "/",
        element: <ListButton/>,
      },
      {
        path: "list/page/:pageId",
        element: <PokeList/>,
        loader: ({params})=>pokeLoader(perPage, {params}),
      },
      {
        path: "detail/:itemId",
        element: <PokemonDetail/>,
        loader: detailLoader,
      }
    ],
    errorElement: <ErrorPage/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <perPageContext.Provider value={perPage}>
    <RouterProvider router={router}/>
  </perPageContext.Provider>
)