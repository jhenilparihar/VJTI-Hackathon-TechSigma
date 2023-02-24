const Owner=(props)=>{
    return(
        <>
        <div className="px-2 py-1 rounded-sm border border-tertiarygrey-150 my-2 mx-2 flex items-center w-[45%]">
            <div>
                <img src={props.img} className="h-10 w-10 rounded-full"></img>
            </div>
            <div className="font-Heading text-sm px-4">
                <p className="text-tertiarygrey-50">{props.deg}</p>
                <p className="font-medium text-xs my-1">{props.name}</p>
            </div>
        </div>
        </>
    )
}
export default Owner