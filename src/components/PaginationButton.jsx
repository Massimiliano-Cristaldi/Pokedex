import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PaginationButton(props){
    const pageId = props.pageId;
    const pageCount = props.pageCount;
    const inputRef = useRef();
    const navigate = useNavigate();

    if (inputRef.current?.value < 1) {
        inputRef.current.value = 1;
    } else if (inputRef.current?.value > pageCount) {
        inputRef.current.value = pageCount;
    }

    const handleClick = ()=>{
        if (inputRef.current.value > 0 && inputRef.current.value <= pageCount) {
            navigate(`/list/page/${inputRef.current.value}`);
        } else if (inputRef.current.value <= 0) {
            navigate("/list/page/1");
        } else {
            navigate(`/list/page/${pageCount}`)
        }
    }
    
    const pageButtons = [];
    // Up to page 4 all of the the first 6 buttons are displayed, then "..."  and then the button the leads to the last page
    if (pageId <= 4) {
        for (let i = 1 ; i <= 6; i++) {
            pageButtons.push(
                <a href={`/list/page/${i}`}
                key={i}>
                <button
                className={i == Number(pageId) ? "activeBtn" : ""}
                >{i}</button>
                </a>
            )
        };
        pageButtons.push(
            <span key="span1">...</span>
        );
        pageButtons.push(
            <a href={`/list/page/${pageCount}`}
            key={pageCount}>
            <button>{pageCount}</button>
            </a>
        )
        // From page 5 to the fifth-to-last page the button "1" is displayed, then "..."
        // then the buttons for the previous two pages, the current page and the next two pages, then "..." and the button for the last page
        // For example, if pageId is 5 and pageCount is 66, the button displayed will be: 1 ... 3 4 5 6 7 ... 66
    } else if (pageId > 4 && pageId <= pageCount - 4){
        
        pageButtons.push(
            <a href={"/list/page/1"}
            key={1}>
            <button>1</button>
            </a>
        )
        pageButtons.push(
            <span key="span1">...</span>
        )

        for (let i = Number(pageId) - 2; i <= Number(pageId) + 2; i++) {
            pageButtons.push(
                <a href={`/list/page/${i}`}
                key={i}>
                <button
                className={i == Number(pageId) ? "activeBtn" : ""}
                >{i}</button>
                </a>
            )
        }

        pageButtons.push(
            <span key="span2">...</span>
        )
        pageButtons.push(
            <a href={`/list/page/${pageCount}`}
            key={pageCount}>
            <button>{pageCount}</button>
            </a>
        )
        // From the fifth-to-last page onward, the button "1" is displayed, then "...", then the last five buttons
    } else if (pageId >= pageCount - 4){
        pageButtons.push(
            <a href={"/list/page/1"}
            key={1}>
            <button>1</button>
            </a>
        )
        pageButtons.push(
            <span key="span1">...</span>
        )

        for (let i = Number(pageId) - 2; i <= pageCount; i++) {
            pageButtons.push(
                <a href={`/list/page/${i}`}
                key={i}>
                <button
                className={i == Number(pageId) ? "activeBtn" : ""}
                >{i}</button>
                </a>
            )
        }
    }
    
    return(
        <>
            <div id="paginationButtonWrapper">
            {pageButtons}
            </div>
            <div id="inputSearchWrapper">
                Go to page: 
                <input type="number"
                defaultValue={pageId ? pageId : ""}
                min={1}
                max={pageCount}
                ref={inputRef}/> 
                <button onClick={handleClick}>Go</button>
            </div>
        </>
    )
}