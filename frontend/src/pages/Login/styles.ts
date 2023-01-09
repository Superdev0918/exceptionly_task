import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  loginPageMainBkg: {
    backgroundImage: 'url("background.jpg")',
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundPosition: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
})

export default useStyles
