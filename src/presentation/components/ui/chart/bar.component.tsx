import { useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import { getColors } from "../../../utils/getColors";
import fonts from "../../../common/fonts";

const Bar: React.FC<{
  data: { label: string; value: number }[];
  colors?: string[];
}> = ({ data = [], colors }) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const _colors =
    colors && data.length === colors.length
      ? colors
      : getColors(primary, secondary, data.length);

  // chart
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const optionsColumnChart: any = {
    chart: {
      type: "bar",
      fontFamily: fonts.plusJackartaSans,
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: _colors,
    fill: {
      colors: _colors,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: data?.length,
    },
    xaxis: {
      categories: data?.map((i) => i.label),
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };

  return (
    <Chart
      options={optionsColumnChart}
      type="bar"
      height="370px"
      series={[
        {
          data: data.map((item, index) => {
            return {
              x: item.label,
              y: item.value,
              fillColor: _colors[index],
            };
          }),
        },
      ]}
    />
  );
};

export default Bar;
