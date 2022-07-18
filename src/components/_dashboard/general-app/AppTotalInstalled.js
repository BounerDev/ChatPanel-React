import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Box, Card, Typography, Stack } from '@material-ui/core';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

const PERCENT = 0.15;
const CHART_DATA = [{ data: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20] }];

AppTotalInstalled.prototype = {
  totalInstalled: PropTypes.any
};

export default function AppTotalInstalled({ totalInstalled }) {
  const theme = useTheme();

  const chartOptions = {
    colors: [theme.palette.chart.blue[0]],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => ''
        }
      },
      marker: { show: false }
    }
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Total Installed</Typography>

        <Typography variant="h3">{fNumber(totalInstalled)}</Typography>
      </Box>

      <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} width={60} height={36} />
    </Card>
  );
}
