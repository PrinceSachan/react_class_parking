import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter'

//mui imports
import {
  AppBar, Box, Toolbar, Typography, Button
} from '@mui/material';

interface NavbarProps {
    navigate: (path: string) => void;
}

class Navbar extends Component<NavbarProps> {
    render(): React.ReactNode {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ mr: 'auto' }}>
                            PARKING SPACE ALLOCATION
                        </Typography>
                        <Button color="inherit" onClick={() => this.props.navigate('/')}>Home</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}

export default withRouter(Navbar);