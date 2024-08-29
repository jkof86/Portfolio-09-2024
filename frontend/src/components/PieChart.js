import React from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'

export default function PieChart({carb, protein, fat}) {
    Chart.register(ArcElement);

    const data = {
      labels: [
        'Red', 'Blue', 'Green', 
        // 'Yellow', 'Purple', 'Orange'
    ],
      datasets: [
        {
          label: '# of Votes',
        //   data: [40, 40, 20],
        data: [carb, protein, fat],

          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            // 'rgba(255, 206, 86, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            // 'rgba(255, 206, 86, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    return <Pie data={data} />;
  };
  