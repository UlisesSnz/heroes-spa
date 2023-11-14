import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <SearchPage />', () => {
    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrarse correctamente con valores por defecto', () => {
    
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        // screen.debug();

        expect(container).toMatchSnapshot();

    });

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {
    
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/heroes/dc-batman.jpg');

        const alert = screen.getByTestId('alert-danger'); // Con aria-label usamos getByLabelText
        expect(alert.style.display).toBe('none');

    });
    
    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => {
    
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>    
        );

        // screen.debug();

        const alert = screen.getByTestId('alert-danger');
        expect(alert.style.display).not.toBe('none');

    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        const inputValue = 'batman';

        render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        const btnSearch = screen.getByRole('button');

        fireEvent.change(input, {target: {value: inputValue}});
        fireEvent.click(btnSearch);

        expect(mockedUseNavigate).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);

    });
        
});
