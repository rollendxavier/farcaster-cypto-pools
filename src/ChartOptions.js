export const getChartOptions = (tokenName, ohlc, pool, chain) => {
    return {
      series: [{
        name: tokenName,
        data: ohlc.map(([x, o, h, l, c]) => ({ x: new Date(x * 1000), y:[o, c, l, h] })).reverse()
      }],
      chart: {
        type: "area",
        height: '100%',
        width: '100%',
        zoom: {
          enabled: true,
          type: 'x', // Can be 'x', 'y' or 'xy'
        },
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        x: {
          show: false,
        },
        marker: {
          show: false,
        },
        y: {
          formatter: (value) => {
            return `$${(value).toLocaleString([], {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}`;
          },
          title: {
            formatter: () => "",
          }
        },
      },
      grid:{
        yaxis:{
          lines:{
            show: false
          }
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
          colorStops: []
        }
      },
      title: {
        text: `${pool.attributes.name} on ${chain.charAt(0).toUpperCase() + chain.slice(1)}`,
        align: 'left'
      },
      subtitle: {
        text: `24h price ${pool.attributes.price_change_percentage.h24}% • ${Number(pool.attributes.volume_usd.h24).toLocaleString([], { style: 'currency', currency: 'usd' })} 24h volume • ${Number(pool.attributes.market_cap_usd).toLocaleString([], { style: 'currency', currency: 'usd' })} marketcap • ${Number(pool.attributes.reserve_in_usd).toLocaleString([], { style: 'currency', currency: 'usd' })} liquidity`,
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
        min: ohlc.length ? new Date(Date.now() - (ohlc.length * 24 * 60 * 60 * 1000)).getTime() : undefined,
        max: ohlc.length ? new Date((ohlc[0]?.[0] ?? 0) * 1000).getTime() : undefined,
      },
      yaxis: {
        opposite: true,
        labels: {
          show: true,
          formatter: (value) => {
            return `$${(value).toLocaleString([], {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}`;
          }
        },
      },
    }
  }