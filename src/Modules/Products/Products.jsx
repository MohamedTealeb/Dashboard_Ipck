import Sidebar from '../../Components/Shared/Sidebar'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import logo from '../../assets/304305481_470478301760187_6739104333513463181_n.jpg'

export default function Products() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#046584',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return <>
    <div className='min-h-screen flex'>
      <Sidebar onSidebarChange={setSidebarOpen} />
      
      <Box sx={{ flexGrow: 1, p: 3 ,marginBottom:'100px'}}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                <img src={logo} alt="Product" style={{ maxWidth: '100%', height: 'auto' }} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  </>
}
