import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const PriceChart=(props)=>{
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        },
      };
    console.log(props.data)
    return(
        <div className='h-[190px] overflow-y-auto'>
            <Line data={props.data} options={options} ></Line>

        </div>
    )
}
export default PriceChart