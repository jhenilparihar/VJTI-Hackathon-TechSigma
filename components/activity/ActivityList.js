const { default: ActivityBar } = require("./ActivityBar")

const ActivityList=()=>{
    const activity=[
        {
            image:'https://itp.live/cloud/2021/12/14/SH2a0coo-nftmonkey_2.png',
            title:'You bought the LightningHouse for 5.45 ETH ',
            name:'@par222',
            time:"25th Feb ,2023"

        },
        {
            image:'https://itp.live/cloud/2021/12/14/SH2a0coo-nftmonkey_2.png',
            title:'You bought the Wednesday for 6.45 ETH ',
            name:'@par222',
            time:"25th Feb ,2023"

        },
        {
            image:'https://itp.live/cloud/2021/12/14/SH2a0coo-nftmonkey_2.png',
            title:'You bought the LightningHouse for 5.45 ETH ',
            name:'@par222',
            time:"25th Feb ,2023"
        }
    ]
    return(
        <div className="flex flex-col py-5 px-5 h-[450px] overflow-y-auto">
        <h1 className="font-medium text-xl my-3">My Activity</h1>
        {activity .map((activity)=><ActivityBar {...activity}></ActivityBar>)}
        </div>
    )
}
export default ActivityList