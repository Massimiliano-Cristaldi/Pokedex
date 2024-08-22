import { useRouteError, useNavigate } from "react-router-dom"

export default function ErrorPage(){

    const navigate = useNavigate();
    const error = useRouteError();
    console.error(error);

    return(
        <div className="errorPage">
            <h1>Oops! Something went wrong</h1>
            <h3 className="my-4">{`${error.status || "??"} - ${error.statusText || "Unidentified error"}`}</h3>
            <h3>{error?.message}</h3>
            <button className="mb-2" onClick={()=>{navigate(-1)}}>Back</button>
        </div>
    )
}