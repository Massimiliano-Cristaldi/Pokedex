import React from "react";
import { Outlet } from "react-router-dom";
import { perPageContext } from "./utils";
import "./Pokedex.css";

export default function Pokedex(){

    return(
        <perPageContext.Provider value={20}>
            <div className="mainWrapper">
                    <Outlet/>
            </div>
        </perPageContext.Provider>
    )
}