import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';


export default function Verify() {
  const [userVerifications, setUserVerifications] = React.useState([]);
 React.useEffect(()=>{
  const getallusersverified = async () => {
    try {
     const response = await axios.get(`${import.meta.env.VITE_BASEURL}/verification`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
     setUserVerifications(response.data.verifications);
    } catch (err) {
      console.log("Failed to verify");
    } 
  };
  getallusersverified();
 },[])

  
  return <>
 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 850, marginTop: 20 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">productName</TableCell>
            <TableCell align="right">imageCover</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userVerifications.map((user) => (
            <TableRow
              key={user.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.userId.firstName} {user.userId.lastName}
              </TableCell>
              <TableCell align="right">{user.productId.name}</TableCell>
              <TableCell align="right">
                <div className="flex justify-end">
                  <img
                    src={`${import.meta.env.VITE_IMAGEURL}/${user.verificationImage}`}
                    alt={`${user.userId.firstName} ${user.userId.lastName} Verification Image`}
                    className="w-24 h-24 object-contain rounded-md shadow-md"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </>
}
