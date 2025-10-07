import { Avatar, Box, Grid, Typography, useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import { getColors } from "../../../utils/getColors";
import fonts from "../../../common/fonts";

const Donut: React.FC<{ data: { label: string; value: number }[], colors?: string[] }> = ({
  data,
  colors
}) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";
  const _colors = (colors && data.length === colors.length) ? colors : getColors(primary, primarylight, data.length);

  // chart
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: fonts.plusJackartaSans,
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: _colors,
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    labels: data?.map((i) => i.label),
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  return (
    <Grid container spacing={3}>
      <Grid size={{xs: 12}}>
        <Chart
          options={optionscolumnchart}
          series={data?.map((i) => i.value)}
          type="donut"
          height="150px"
        />
      </Grid>
      <Grid size={{xs: 12}}>
        <Grid container spacing={2}>
          {data?.map((dt, index) => (
            <Grid size={{xs: 12, sm: 6, md: 4}} key={index?.toString()}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 9,
                    height: 9,
                    bgcolor: _colors[index],
                    svg: { display: "none" },
                  }}
                ></Avatar>
                <Typography variant="subtitle2" color="textSecondary" sx={{ marginLeft: 1 }}>
                  {dt.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Donut;
