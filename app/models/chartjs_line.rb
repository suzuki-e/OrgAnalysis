class ChartjsLine
  include ActiveModel::Model
  attr_accessor :groupdates

  # ref. https://www.chartjs.org/docs/latest/charts/line.html
  def with_default_style
    labels, data = chart_data(groupdates)
    {
      labels: labels,
      datasets: [
        {
          label: 'count',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data
        }
      ]
    }
  end

  private

  def chart_data(groupdates)
    [groupdates.keys.map { |ts| ts.strftime('%m/%d %k:%M') }, groupdates.values]
  end
end
