import PriceChart from "../profileHeader/NFTDetails/PriceChart"
const UserGraph=()=>{
    const data = {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July","October","September","October","November","Decemeber"],
        datasets: [
          {
            label: "Total NFT's Price Sold Over Months in Year",
            data: [6.33, 10.4, 15.6, 26.2, 15.8, 26.7, 37.1,34.5,44.4,40,42,38.9],
            fill: false,
            borderColor: "#ff1818",

          },
        ],
      };
      let years=[2018,2019,2020,2021,2022,2023]
    return(
       
        <div className="mt-[5%]">
        <form className=" flex justify-end items-center space-x-6">
            <label className="text-sm">Filter Year</label>
            <select className="bg-[#353535] py-1 px-3 border border-tertiarywhite-100">
            {years.map((y)=><option value={y} >{y}</option>)}
            </select>

        </form>
        <PriceChart data={data} size={true}></PriceChart>
        </div>

    )
}
export default UserGraph