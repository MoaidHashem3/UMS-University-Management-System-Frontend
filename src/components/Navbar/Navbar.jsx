import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', color: 'darkgrey' }}>
                    <Typography variant="h6" component="div" sx={{ fontSize: '40px' }}>
                        UMS
                    </Typography>

                    <Button
                        color='secondary.main'
                        sx={{
                            fontSize: '40px',
                            width: '200px',
                            height: '70px',
                            borderRadius: '0',
                            '&:hover': {
                                backgroundColor: 'secondary.main', // Optional hover effect
                                color:'white'
                            }
                        }}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
