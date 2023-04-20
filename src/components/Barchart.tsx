import React, { useEffect, useState } from 'react'
import "../styles/barchart.styles.css"
import { Chart } from 'react-google-charts'
import { FaCaretUp } from 'react-icons/fa'

interface IBarChartProps {
  data: Array<[string, number]>
  title: string
}

const BarChart: React.FC<IBarChartProps> = ({ data, title }:IBarChartProps) => {
  const chartData = [
    ['Label', 'Value'],
    ...data.map(([label, value]) => [label, value]),
  ]
  const [ isMounted, setIsMounted ] = useState(false);

  useEffect(()=>{
    setIsMounted(true);
    return ()=>{
      setIsMounted(false);
    }
  }, [])

  return (
    <section className='barchart-cover'>
      <div className="chart-container">
        <div>
          <div className="topBar">
            <h1>Trip Metrics</h1>
            <p>Current summary and activities.</p>
          </div>
          <hr />
          <div className="BarFlex">
            <div className="percbox">
              <h4>Earnings</h4>
              <div>
                <span>32%</span>
                <span className="caret">
                  <FaCaretUp  />
                  6.72%%
                </span>
              </div>
            </div>
            <div className="percbox">
              <h4>Expenses</h4>
              <div>
                <span>8%</span>
                <span className="caret">
                  <FaCaretUp />
                  0.08%
                </span>
              </div>
            </div>
            <div className="percbox">
              <h4>Profits - previous month</h4>
              <div>
                <span>26%</span>
                <span className="caret" >
                  <FaCaretUp  />
                  6.90%
                </span>
              </div>
            </div>
          </div>
        </div>
        { isMounted && <Chart
          chartType="ColumnChart"
          data={chartData}
          options={{
            title,
            legend: { position: 'none' },
            vAxis: {
              title: 'Value',
              formatOptions: { prefix: 'N', groupingSymbol: ',' },
            },
            hAxis: {
              title: 'Month',
            },
            series: {
              0: { color: '#6EE7B7' }, // set color for series 0 (the bars)
            },
          }}
          width="100%"
          height="400px"
        />
}
      </div>
    </section>
  )
}


export default BarChart
