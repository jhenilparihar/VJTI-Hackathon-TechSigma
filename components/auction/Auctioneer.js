const Auctioneer=(props)=>{
    return(
        <div className="border-2 border-tertiarywhite-100 flex flex-col my-2 ">
            <img src={props.profile_img} className="h-[200px] w-[200px]"></img>
             <p className="text-sm text-tertiarygrey-50 px-2">{props.name}</p>
             <p className="my-2 px-2 font-bold text-lg">{props.bid_price}</p>
        </div>
    )
}
export default Auctioneer