import { useRouteError, useNavigate } from "react-router-dom"

export default function ErrorPage(){

    const navigate = useNavigate();
    const error = useRouteError();
    console.error(error);

    return(
        <div className="errorPage">
            <h1>Oops! Something went wrong</h1>
            <div className="my-4">{`${error.status} - ${error.statusText}` || error.message}</div>
            <button className="mb-2" onClick={()=>{navigate(-1)}}>Back</button>
        </div>
    )
}