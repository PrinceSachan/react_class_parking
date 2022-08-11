import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from '../Navbar';


describe('<Navbar>', () => {
    test('should render the button', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        )
        const button = screen.getByRole('button', { name: /Home/i })
        fireEvent.click(button)
    })
})