import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const SellGraph=()=>{
    const data = {
        
        labels: ["RoundHouse", "Lightning", "Fire", "Gray Man", "Junior Tree", "Wednesday"],
        datasets: [
          {
            label: " NFT Bought vs Price",
            data: [6.33, 10.4, 15.6, 26.2, 15.8,5.55],
            fill: false,
            backgroundColor: "#ff1818",

          },

        ],
      };
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          maintainAspectRatio:true,
          scales: {
            xAxes: [{
                barPercentage:0.9
            }]
        }

          
        },
      };


    return(
        <>
        <Bar data={data} options={options}></Bar>
        </>
    )
}
export default SellGraph