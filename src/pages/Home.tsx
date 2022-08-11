import React, { Component } from 'react';
import { CardContext } from '../context/CardContext';
import { toast } from 'react-toastify'
import { withRouter } from '../utils/withRouter'
//mui imports
import {
    Box, Card, CardActions, CardContent, Button, TextField, Typography
} from '@mui/material';

export interface Homeprops {
    navigate: (path: string) => void
}

export interface HomeStates {
    slot: string | number
}

class Home extends Component<Homeprops> {
    static contextType = CardContext;
    context! : React.ContextType<typeof CardContext>

    state: HomeStates = {
        slot: ''
    }

    

    handleChange = (event: any) => {
        const num = event.target.value;
        this.setState({ slot: num });
    }

    create = (e: React.FormEvent) => {
        e.preventDefault()

        const slot_number = Number(this.state.slot);

        if (this.state.slot > 0) {
            this.context.createSlots(slot_number)
            this.props.navigate('/details')
        } else {
            toast.error("Please enter a vaild number");
            return
        }
    }

    render = () => (
        <div>
            <Box 
                component="form"
                onSubmit={this.create}
                sx={{
                    maxWidth: 400,
                    margin: 2,
                    mx: 'auto'
            }}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h6'>Enter the parking space</Typography>
                        <CardActions sx={{ display: 'block' }}>
                            <TextField
                                type='number'
                                fullWidth
                                margin="dense"
                                variant='outlined'
                                label='Enter the require parking space'
                                onChange={this.handleChange}
                                value={this.state.slot}
                            />
                            <Button
                                sx={{ mt: 2 }}
                                variant="contained"
                                disabled={!this.state.slot.toString().trim().length}
                                type='submit'
                            >
                                Book
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Box>
      </div>
  )
}

export default withRouter(Home);