import { Component } from 'react';
import { SingleItemProps } from '../pages/Details'
import {
    Card, CardContent, Typography, Button
} from '@mui/material';

interface CardSlotProps {
  details: SingleItemProps;
  setSingleItem: (item: SingleItemProps) => void;
  handlePayment: () => void
}
  
export default class CardSlot extends Component<CardSlotProps> {

  isAvailable = this.props.details.available;

  render = () => {

    const isAvailable = this.props.details.available;

    return (
      <div>
        <Button disabled={isAvailable}
          onClick={() => {
            if (!isAvailable) {
              this.props.handlePayment();
              this.props.setSingleItem(this.props.details)
            }
          }}
        >
          <Card sx={{
            backgroundColor: isAvailable ? "green" : "red",
            alignItems: 'center',
            width: 400,
          }}>
            <CardContent>
              <Typography variant="h6">{this.props.details.available ? "Available" : "Booked"}</Typography>
              <Typography variant="h6">PSA - {this.props.details.bookingid}</Typography>
            </CardContent>
          </Card>
        </Button>
      </div>
    )
    
  }
}
  
  // export default CardSlot;