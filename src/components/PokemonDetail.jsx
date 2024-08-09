import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { statColor, typeStyle, shortStat, strTrim } from "./styleFunctions";

export default function PokemonDetail(){
    
    const [data, setData] = useState({});
    const itemId = useLoaderData();
    const perPage = 20;
    const itemPage = (id)=>{
        if (id <= 1025) {
            return Math.ceil(id / perPage);
        } else {
            return Math.ceil((id - 8975) / perPage);
        }
    }

    console.log(window.innerWidth);
    
    
    useEffect(()=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${itemId}/`)
        .then(response => response.json())
        .then(apiData => setData(apiData))
        .catch(err => console.error(err));
    }, [itemId]);
    
    return(
    <>
        <h2>{data.name ? strTrim(data.name) : "N/A"}</h2>
        <div className="d-flex align-items-center detailWrapper">
            <div className="col-5 text-center">
                <img src={data.sprites?.front_default || "/src/assets/notfound.png"} alt="" id="pokeSprite"/>
            </div>
            <div className="col-7 d-flex flex-column pokeInfo">
                <h3>Attributes:</h3>
                <div className="d-flex">
                    <div className="col-6">Height: {data?.height ? data?.height * 10 : "N/A"} cm</div>
                    <div className="col-6">Weight: {data?.weight ? data?.weight / 10 : "N/A"} kg</div>
                </div>
                <h3>Abilities:</h3>
                {data.abilities?.map((el, index)=>(
                    <div key={index}>
                        {strTrim(el.ability.name)}
                    </div>
                ))}
                <h3>Type(s):</h3>
                <div className="d-flex flex-wrap gap-2">
                {data.types?.map((el, index)=>(
                    <span 
                    key={index}
                    style={typeStyle(el.type.name)}
                    className="pokeType"
                    >
                        {strTrim(el.type.name)}
                    </span>
                ))}
                </div>
                <h3>Stats:</h3>
                {data.stats?.map((el, index)=>(
                <div className="d-flex flex-wrap" key={index}>
                    <div className="col-4">
                    {window.innerWidth >= 996 ?
                    strTrim(el.stat.name) :
                    shortStat(el.stat.name)
                    }
                    </div>
                    <div className="min-col-2 text-center">{el.base_stat}</div>
                    <div className="col-5 d-flex align-items-center"> 
                        <div style={{
                            width: `${el.base_stat / 2.55}%`,
                            height: "70%",
                            backgroundColor: statColor(el.stat.name),
                            borderRadius: "5px"
                            }}></div> 
                    </div>
                </div>
                ))}
            </div>
        </div>
        <div>
            <a href={`/list/page/${itemPage(itemId)}`}>
                <button id="detailBackBtn">
                    Back to page {itemPage(itemId)}
                </button>
            </a>
        </div>
    </>
    )
}

export function loader({params}){
    const itemId = params.itemId;
    return itemId;
}