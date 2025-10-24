// NetworkGraphChart.jsx
import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/modules/networkgraph';  // Cukup di-import
import  'highcharts/modules/exporting';
import  'highcharts/modules/offline-exporting';

// Aktifkan modul
// exporting(Highcharts);
// offlineExporting(Highcharts);

const options = {
  chart: {
    type: 'networkgraph',
    // height: '300px',
    // width: '100%'
  },
  title: {
    text: 'Contoh Network Graph'
  },
  plotOptions: {
    networkgraph: {
      keys: ['from', 'to'],
      layoutAlgorithm: {
        enableSimulation: true
      }
    }
  },
  series: [
    {
      dataLabels: {
        enabled: true,
        linkFormat: ''
      },
      data: [
        ['A', 'B'],
        ['A', 'C'],
        ['A', 'D'],
        ['B', 'E']
      ],
      nodes: [
        {
          id: 'A',
          marker: {
            symbol: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png)',
            width: 40,
            height: 40
          }
        },
        {
          id: 'B',
          marker: {
            symbol: 'url(https://cdn-icons-png.flaticon.com/512/25/25231.png)',
            width: 40,
            height: 40
          }
        },
        {
          id: 'C',
          marker: {
            symbol: 'circle' // fallback
          }
        },
        {
          id: 'D',
          marker: {
            symbol: 'square' // fallback
          }
        },
        {
          id: 'E',
          marker: {
            symbol: 'triangle' // fallback
          }
        }
      ]
    }
  ]
};

const NetworkGraphChart = () => (
  <HighchartsReact highcharts={Highcharts} options={options} />
);


export default NetworkGraphChart;
