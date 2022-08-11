import { Component } from 'react';
import { calculateTime, calculateAmount } from "../utils/calculate";

//mui imports
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography
} from "@mui/material";

export default class PaymentModal extends Component<any> {
    state = {
        disable: false
    }

    conponentDidMount() {
        console.log(calculateAmount)
    }

    render = () => (
        <div>
            <Dialog open={this.props.isOpen} onClose={this.props.toggleModal}>
                <DialogTitle>Payment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        For parking exit please pay below 
                        mention amount for car number <b>{ this.props.car.carnumber }</b>
                    </DialogContentText>
                    <Typography gutterBottom>
                        { calculateTime(this.props.car) }
                    </Typography>
                    <TextField
                        label="Amount"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{ readOnly: true }}
                        variant="outlined"
                        value={ calculateAmount(this.props.car) + " $"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        type='submit'
                        disabled={this.state.disable}
                        onClick={() => {
                            this.props.payment()
                            this.setState({ disable: true })
                        }}
                        variant="outlined"
                    >
                        Pay
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
