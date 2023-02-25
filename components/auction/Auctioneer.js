const Auctioneer=(props)=>{
    return(
        <div className="border-2 border-tertiarywhite-100 flex flex-col my-2 ">
            <img src={props.imageurl||"https://pbs.twimg.com/profile_images/1490533817416925189/oDKK6UFj_400x400.jpg"} className="h-[200px] w-[200px]"></img>
             <p className="text-sm text-tertiarygrey-50 px-2">{props.name}</p>
             <p className="my-2 px-2 font-bold text-lg">{props.price}</p>
        </div>
    )
}
export default Auctioneer