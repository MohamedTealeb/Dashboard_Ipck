import React, { useState } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, useTheme, useMediaQuery} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'

import Sidebar from './../../Components/Shared/Sidebar';
import Table from '../../Components/Table';

export default function Admin() {
 

  return (
    <>
     <Table />
    </>
  );
}
