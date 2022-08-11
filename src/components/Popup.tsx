import { Component } from 'react';
import { CardContext } from '../context/CardContext';
import { toast } from 'react-toastify';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

//mui imports
import { 
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box
} from '@mui/material';


// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';

// const { boxes, bookSlot, freeSlots } = useContext(CardContext)
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


export interface PopupStates {
  open: boolean,
  carRc: string,
  datetime: Date
}

class Popup extends Component {
  static contextType = CardContext
  context!: React.ContextType<typeof CardContext>

  state: PopupStates = {
    open: false,
    carRc: "",
    datetime: new Date()
  }

  toggleModal = () => {
    this.setState({ open: !this.state.open })
    this.setState({ carRc: "" })
  };

  bookTheSlot = () => {

    var isMatch = this.context.boxes.some((car: any) => {
      return car.carnumber === this.state.carRc
    });

    if (isMatch) {
      toast.error("Already Registered.");
      return;
    }

    this.context.bookSlot(this.state.carRc, this.state.datetime);
    setTimeout(() => {
      this.toggleModal();
    }, 100);
    toast.success("Successfully Registered.")
  }

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (this.context.freeSlots === 0) {
      toast.error("Parking is Full.");
      return;
    }
    this.bookTheSlot()
  }

  render = () => (
    <div>
      <Button variant="contained" onClick={this.toggleModal}>
        Book your slot
      </Button>
      <Dialog
        // fullScreen={fullScreen}
        open={this.state.open}
        onClose={this.toggleModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          New Car Registration
        </DialogTitle>
        <DialogContent>
          <hr />
        </DialogContent>
        <Box component='form' onSubmit={this.onSubmit}>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>     
              <DateTimePicker
                label="Car Arrival Date & Time"
                maxDateTime={new Date()}
                value={this.state.datetime}
                onChange={(newValue) => {
                  this.setState({ datetime: newValue as Date })
                }}
                renderInput={(params) => <TextField
                  {...params}
                  // disabled={true}
                  required={true}
                  onKeyDown={(e: any) => {
                    e.preventDefault()
                  }}
                />}
              />   
            </LocalizationProvider>
          </DialogContent>
          <DialogContent>
            <TextField
              fullWidth
              label="Enter RC Number"
              type="string"
              variant='outlined'
              autoComplete='off'
              value={this.state.carRc}
              onChange={(e) => this.setState({ carRc: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              type='submit'
              disabled={!this.state.carRc}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Button variant="contained" sx={{ m: 2 }} >Total Spaces: {this.context.boxes.length}</Button>
      <Button variant="contained" >Availabel Spaces: {this.context.freeSlots}</Button>
    </div>
  )
}

export default Popup;