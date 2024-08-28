import { useState, useEffect, useContext } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import PokeCard from "./PokeCard";
import PaginationButton from "./PaginationButton";
import NameFilter from "./NameFilter";
import { strTrim } from "../utils";

export default function PokeList(){

    const {data, pageId, pageCount} = useLoaderData();

    return(
        <>
                <NameFilter/>
                <div id="cardWrapper">
                    {data.map((el, index)=>(
                        <PokeCard 
                        key={index}
                        name={strTrim(el.name)}
                        id={index}
                        pageId={pageId}/>
                    ))}
                </div>
                <PaginationButton pageId={pageId} pageCount={pageCount}/>
        </>
    )
}

export async function loader(perPage, {params}){
    const offset = (params.pageId - 1) * perPage;
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${perPage}`);

        if (!response.ok) {
            throw {
                status: response.status,
                statusText: response.statusText,
                message: "Failed to fetch data."
            };
        }
        const rawData = await response.json();

        const itemCount = rawData.results.count;
        const pageCount = Math.ceil(itemCount/perPage);
        // If pageId is less than 1 or a non-numeric string, redirect to page 1
        if (params.pageId < 1 || /^\d+$/.test(params.pageId) === false) {
            return redirect("/list/page/1");
        // If pageId is greater than page count, redirect to the last page
        } else if (params.pageId > pageCount) {
            return redirect(`/list/page/${pageCount}`);
        }

        return {
                perPage,
                data: rawData.results,
                pageId: params.pageId, 
                pageCount: Math.ceil(rawData.count/perPage)
                };
    } catch (err) {
        console.error(err);
        throw {
            status: err.status || 404,
            statusText: err.statusText || "Not found",
        }
    }
}