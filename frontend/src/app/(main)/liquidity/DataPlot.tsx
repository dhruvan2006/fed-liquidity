'use client';

import React from 'react';
import dynamic from 'next/dynamic'
import { SeriesData } from './page';

function DataPlotSkeleton() {
  return (
    <div className='w-full h-full pb-3 pt-1 animate-pulse bg-[#f0f0f0] flex items-center justify-center rounded-md'>
      <span className='text-[#191919]'>Chart Loading...</span>
    </div>
  );
}

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => <DataPlotSkeleton /> });

type DataPlotProps = {
  ticker: string;
  color: string;
  data: SeriesData[];
}

function DataPlot({ ticker, color, data }: DataPlotProps): React.ReactElement {
  const trace: Plotly.Data = {
    type: 'scatter',
    mode: 'lines+markers',
    name: ticker,
    x: data.map(d => d.date),
    y: data.map(d => d.value),
    line: {color: color}
  };

  const layout: Partial<Plotly.Layout> = {
    autosize: true,
    title: {
      text: `<b>${ticker}</b>`,
      font: { size: 20, color: '#191919',  }
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#191919', family: 'monospace', size: 14 },
    margin: { t: 50, b: 70, l: 65, r: 50 },
    xaxis: {
      showgrid: false,
      linecolor: '#191919',
      title: {
        text: 'Date',
        font: { size: 16 }
      }
    },
    yaxis: {
      showgrid: false,
      linecolor: '#191919',
      title: {
        text: ticker,
        font: { size: 16 }
      }
    },
    hovermode: 'closest',
    hoverlabel: {
      bgcolor: color,
      font: { color: 'white', family: 'monospace', size: 12 }
    },
  };

  const config: Partial<Plotly.Config> = {
    displayModeBar: false,
    responsive: true,
  };
  
  return (
    <div className={ticker === 'LIQUIDITY' ? `w-full h-[80vh]` : `w-full h-[60vh]`}>
      <div className='h-full'>
        <Plot 
          className='w-full h-full' 
          data={[trace]} 
          layout={layout} 
          config={config} 
          useResizeHandler={true}
          style={{width: "100%", height: "100%"}}
          />
      </div>
    </div>
  );
}

export default DataPlot;
