export default function SideBar( {handleToggleModal}){
    
    return(
        <div className="sidebar">
            <div onClick = {handleToggleModal} className="bdoverlay"></div>
            <div className="sidebarContents">
                <h2>The SideBar Mars Landscape</h2>

                <div>
                    <p>Descripition</p>
                    <p>Tag1 tag2 tag3 tag4 tag5</p>
                </div>
                <button onClick= {handleToggleModal} >
                    <i className="fa-solid fa-right-long"></i>
                </button>
            </div>
        </div>
    )
}