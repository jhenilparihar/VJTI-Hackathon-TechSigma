const User=(props)=>{
    return(
        <>
        <div className="flex w-full border-b-[1px] border-white py-2  my-2">
            <img src={props.img} className="w-10 h-10 rounded-full border-white border-2"></img>
            <div className="flex flex-col px-5 text-xs w-full">
               <p className="text-tertiaryred-50"> {props.name}</p>
               <p className="text-tertiarywhite-150">{props.ownerCount}<span className="mx-1">NFT's</span></p>
            </div>
            <button className="rounded-sm bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 px-4 py-1 h-[60%] font-medium text-sm">Connect</button>
        </div>
        </>
    )
}
export default User