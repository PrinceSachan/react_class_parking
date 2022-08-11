import React, { Component } from 'react'
import { toast } from 'react-toastify'
import PaymentModal from '../components/PaymentModal'
import CardSlot from '../components/CardSlot';
import { makePayment } from '../utils/makePayment';
import { CardContext } from '../context/CardContext';
import 'react-toastify/dist/ReactToastify.css'
import Popup from '../components/Popup';
import { withRouter } from '../utils/withRouter';

export interface SingleItemProps {
    carnumber: string,
    bookingid: number,
    available: boolean,
    cartiming: string | Date
}

export interface DetailsStates {
    paymentModal: boolean,
    singleItem: SingleItemProps
}

interface DetailsProps {
    navigate: (path: string) => void;
}

class Details extends Component<DetailsProps> {

    static contextType = CardContext;
    context! : React.ContextType<typeof CardContext>

    state: DetailsStates = {
        paymentModal: false,
        singleItem: {
            carnumber: "",
            bookingid: 1,
            available: true,
            cartiming: ""
        }
    }

    //toggle payment model
    handlePayment = () => {
        this.setState({ paymentModal: !this.state.paymentModal});
    }

    //handle payment
    payment = async () => {
        const res = await makePayment(this.state.singleItem);

        if (res) {
            this.context.removeFromSlot(this.state.singleItem.bookingid);
            toast.success("Payment Successfull.")
        } else {
            toast.error("Payment Failed.")
        }
        this.handlePayment();
    }

    handleSetSingleItem = (Item: SingleItemProps) => {
        this.setState({ singleItem: Item })
    }

    componentDidMount = () => {
        if (this.context.boxes.length === 0) {
            // twecks to navigate to home page
            setTimeout(() => {
                this.props.navigate('/');
            }, 10);
        }
    }
  
    render = () => (
        <div>
            <Popup />
            {this.state.paymentModal && (
                <PaymentModal
                    isOpen={this.state.paymentModal}
                    toggleModal={this.handlePayment}
                    car={this.state.singleItem}
                    payment = {this.payment}
                />
            )}
            {this.context.boxes.map((car: any) => <CardSlot
                key={car.bookingid}
                details={car}
                setSingleItem={this.handleSetSingleItem}
                handlePayment={this.handlePayment}
            />)}
        </div>
    )
}

export default withRouter(Details);
