import { Router } from 'react-router-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from 'history'
import CardContextProvider, { CardContext } from '../../context/CardContext'
import Details from '../Details'


export const MockState = {
    boxes: [
        {
            carnumber: "ABC",
            bookingid: 0,
            available: false,
            cartiming: "",
        },
        {
            carnumber: "XYZ",
            bookingid: 1,
            available: true,
            cartiming: "",
        },
        {
            carnumber: "",
            bookingid: 2,
            available: true,
            cartiming: "",
        },
    ]
};

const MockSpace = () => {
    const history = createMemoryHistory();
    history.push('/details', 2);

    return (
        <CardContext.Provider
            value={{
                bookSlot: jest.fn(),
                removeFromSlot: jest.fn(),
                boxes: MockState.boxes,
                createSlots: jest.fn(),
                freeSlots: 2,
                car_num: "",
                arrival_time: ""
            }}
        >
            <Router location={history.location} navigator={history}>
                <Details />
            </Router>
        </CardContext.Provider>
    )
};

describe("test for parking(details) page", () => {
    it("should render the Component", () => {
        render(<MockSpace />);
        const btn = screen.getByRole('button', { name: /book your slot/i })
        expect(btn).toBeInTheDocument();
    });

    it("should book parking space", () => {
        render(<MockSpace />);
        const btn = screen.getByRole('button', { name: /book your slot/i })
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn)
        const input = screen.getByLabelText(/enter Rc number/i);
        fireEvent.change(input, { target: { value: "MP09" } });
        const button = screen.getByRole('button', { name: /SUBMIT/i })
        fireEvent.click(button);
    });

    it("should redirect to / page if no parking space is allocated", async () => {
        const history = createMemoryHistory();
        history.push("/details");
        render(
            <CardContextProvider>
                <Router location={history.location} navigator={history}>
                    <Details />
                </Router>
            </CardContextProvider>
        )

        setTimeout(async () => {
            const toastMsg = screen.getByText(/Please enter parking space first./i);
            expect(toastMsg).toBeInTheDocument();
        }, 500)

    });

    it("should pay the amount", async () => {
        render(<MockSpace />);
        const bookedCard = screen.getByText(/BOOKED/i);
        expect(bookedCard).toBeInTheDocument();
        fireEvent.click(bookedCard);
        const paymentButton = screen.getByRole("button", { name: /PAY/i });
        // expect(paymentButton).toBeInTheDocument();
        fireEvent.click(paymentButton);

        setTimeout(async () => {
            const toast = await screen.findByText(/Payment Successful/i);
            expect(toast).toBeInTheDocument();
        }, 1500)
    });

})