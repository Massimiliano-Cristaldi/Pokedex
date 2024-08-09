import React from "react";
import { Outlet } from "react-router-dom";
import "./Pokedex.css";

export default function Pokedex(){

    return(
        <div className="mainWrapper">
                <Outlet/>
        </div>
    )
}