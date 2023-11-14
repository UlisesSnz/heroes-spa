import { fireEvent, render, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui/components/Navbar';
import { MemoryRouter, useNavigate } from 'react-router-dom';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar />', () => {

    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'Ulises',
        },
        logout: jest.fn(),
    }

    beforeEach(() => jest.clearAllMocks());
  
    test('debe de mostrar el nombre del usuario', () => {
    
        render(
            <MemoryRouter initialEntries={['/']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();
        expect(screen.getByText(contextValue.user.name)).toBeTruthy();

    });
    
    test('debe de llamar el logout y navigate cuando se hace click en el botón', () => {

        render(
            <MemoryRouter initialEntries={['/']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();
        const btnLogout = screen.getByRole('button');
        fireEvent.click(btnLogout);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(contextValue.logout).toHaveBeenCalledTimes(1);
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {'replace': true});
        
    });

});
