import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // mainBkg: {
  //   background-image: url('../background.jpg');
  // width: 100%;
  // height: 100vh;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // background-position: 50%;
  // background-repeat: no-repeat;
  // background-size: cover;
  // overflow: hidden;
  // },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
  },
});

export default theme

