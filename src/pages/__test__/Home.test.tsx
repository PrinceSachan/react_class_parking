import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import Home from '../Home'

describe('<Home>', () => {

    test('should render the home component', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
    });

    test('should render the input box', () => {
        render(<Home />, { wrapper: BrowserRouter });
        const inputbox = screen.getByLabelText(/Enter the require parking space/i)
        fireEvent.change(inputbox, { target: { value: 'ABC' } })
        expect(inputbox).toBeInTheDocument();
    });

    test('should render the disble button', () => {
        render(<Home />, { wrapper: BrowserRouter });
        const button = screen.getByRole('button', { name: /book/i });
        expect(button).toBeDisabled();
        expect(button).toBeInTheDocument();
    });

    test('should render the clickable button', () => {
        render(<Home />, { wrapper: BrowserRouter });
        const inputbox = screen.getByLabelText(/Enter the require parking space/i)
        fireEvent.change(inputbox, { target: { value: 'ABC' } })
        const button = screen.getByRole('button', { name: /book/i });
        fireEvent.click(button);
    });

    test('should render the toast message', () => {
        render(<Home />, { wrapper: BrowserRouter });
        const inputbox = screen.getByLabelText(/Enter the require parking space/i);
        fireEvent.change(inputbox, { target: { value: "-1" } });
        expect(inputbox).toHaveValue(-1);
        const button = screen.getByRole('button', { name: /book/i });
        fireEvent.click(button);

        setTimeout(async () => {
            const toast = await screen.findByText(/please enter a valid number/i);
            expect(toast).toBeInTheDocument();
        }, 500)
    });
})