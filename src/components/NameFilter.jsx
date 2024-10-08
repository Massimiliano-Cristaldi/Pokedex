import { useRef, useState } from "react";
import { useNavigate, Form } from "react-router-dom";
import { strUntrim } from "../utils";

export default function NameFilter(){
    
    //I'm using a state variable to check the loading state instead of useNavigation
    //because it gives better control over it and thus a more responsive UX
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef();
    const navigate = useNavigate();
    
    async function searchByName(e){
        e.preventDefault();
        
        const query = strUntrim(inputRef.current?.value.toLowerCase());
        
        if (query) {
            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
                const data = await response.json();
                if (data.id !== undefined) {
                    navigate(`/detail/${data.id}`);
                } else {
                    alert('Pokemon not found');
                }
            } catch (error) {
                setError(`Could not find any Pokémon named "${inputRef.current?.value}"`)
            } finally {
                setLoading(false);
            }
        } else {
            setError("Please insert a value in the search field");
        }
    }
    
    return(
        <>
        <div id="searchByName">
            <Form onSubmit={e => searchByName(e)} className="text-center">
                <span>Filter list by name: </span>
                <input 
                type="text" 
                className={loading ? "loadingInput mx-3" : "mx-3"} 
                ref={inputRef}/>
                <button type="submit">Go</button>
            </Form>
        </div>
        {error &&
        <div className="errorWrapper">
            <i className="fa-solid fa-circle-exclamation" style={{color: "#b01111"}}></i> {error}
        </div>}
        </>
    )
}