import { useState, useEffect } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import PokeCard from "./PokeCard";
import PaginationButton from "./PaginationButton";
import NameFilter from "./NameFilter";
import { strTrim } from "./styleFunctions";

export default function PokeList(){

    const [data, setData] = useState([]);
    const [itemCount, setItemCount] = useState(0);
    const pageId = Number(useLoaderData());
    const perPage = 20;
    const offset = (pageId - 1) * perPage;
    const pageCount = Math.ceil(itemCount/perPage);    

    useEffect(()=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${perPage}`).
        then(response => response.json()).
        then(apiData => {
                setData(apiData.results);
                setItemCount(apiData.count);
            }).
        catch(err => console.error(err));
    }, [pageId])

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

export function loader({params}){
    const pageId = params.pageId;
    // If pageId is less than 1 or a non-numeric string, redirect to page 1
    if (pageId < 1 || /^\d+$/.test(pageId) === false) {
        return redirect("/list/page/1");
    // If pageId is greater than page count, redirect to the last page
    } else if (pageId > 66) {
        return redirect("/list/page/66");
    }
    return pageId;
}