import { useState, useEffect } from "react";

export default function PokeCard(props){
    
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const perPage = 20;
    const offset = (props.pageId - 1) * perPage + 1;

    let itemId = 0;
    if (props.id + offset <= 1025) {
        itemId = props.id + offset;
    } else {
        itemId = props.id + offset + 8975;
    }
    
    useEffect(()=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${itemId}/`).
        then(response => response.json()).
        then(apiData => {setData(apiData); 
            setLoading(false);
        }).
        catch(err => {console.error(err);
            setLoading(false);
        });
    }, [props.id, props.pageId]);    
    
    return(
        <div className="col-6 col-md-3 text-center pokeCard">
                <a href={`/detail/${itemId}`}>
                {loading ?
                    <img src="/src/assets/loading.gif" alt="Loading wheel" height="96px" width="96px"/> :
                    <img src={data.sprites?.front_default || "/src/assets/notfound.png" } alt={props.name + "'s sprite"} />
                }    
                <div style={{color: "#DEE0E0"}}>
                {props.name}
                </div>
        </a>
        </div>
    )
}