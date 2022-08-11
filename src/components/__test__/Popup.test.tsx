import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { CardContext } from '../../context/CardContext';
import Popup from '../Popup';

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

const MockPopup = () => {

    return (
        <CardContext.Provider
            value={{
                bookSlot: jest.fn(),
                removeFromSlot: jest.fn(),
                boxes: MockState.boxes,
                createSlots: jest.fn(),
                freeSlots: 1,
                car_num: "",
                arrival_time: ""
            }}
        >
            <Popup />
        </CardContext.Provider>
    )
}

describe('<Popup>', () => {

    test('should render the button', () => {
        render(
            <BrowserRouter>
                <MockPopup  />
            </BrowserRouter>
        )
        const button = screen.getByRole('button', { name: /Book your slot/i })
        expect(button).toBeInTheDocument();
    });

    test('should give error if car number is registered', () => {
        render(<MockPopup />)
        const button = screen.getByRole('button', { name: /Book your slot/i })
        expect(button).toBeInTheDocument();
        fireEvent.click(button)
        const input = screen.getByLabelText(/Enter RC Number/i)
        fireEvent.change(input, { target: { value: "ABC" } });
        const btn = screen.getByRole('button', { name: /submit/i })
        fireEvent.click(btn);
        setTimeout(async () => {
            const toast = screen.getByText(/already registered/i)
            expect(toast).toBeInTheDocument();
        }, 500)
    });

    test('should give error if parking is full', () => {
        render(<MockPopup />)
        const button = screen.getByRole('button', { name: /Book your slot/i })
        expect(button).toBeInTheDocument();
        fireEvent.click(button)
        const input = screen.getByLabelText(/Enter RC Number/i)
        fireEvent.change(input, { target: { value: "ABC" } });
        const btn = screen.getByRole('button', { name: /submit/i })
        fireEvent.click(btn);
        setTimeout(async () => {
            const toast = screen.getByText(/parking is full./i)
            expect(toast).toBeInTheDocument();
        }, 500)
    });


})