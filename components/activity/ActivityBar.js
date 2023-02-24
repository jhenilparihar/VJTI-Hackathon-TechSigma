const ActivityBar=(props)=>{
    return(
        <div>
            <div className=" bg-[#232323] flex my-3 py-3 px-3 rounded-md items-center w-[100%] border bb">
                <img src={props.image} className="h-[60px] w-[60px] border-white border-2 rounded-full mx-1"></img>
                <div className="flex flex-col px-3 w-[90%]">
                <p className="text-lg font-medium">{props.title}</p>
                <span className="text-tertiarygrey-150 text-sm ">{props.time}</span>
                </div>

            </div>

        </div>
    )
}
export default ActivityBar;
