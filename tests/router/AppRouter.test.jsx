import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter />', () => {
  
    test('debe de mostar el login si no está autenticado', () => {
      
        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']} >
                <AuthContext.Provider value={contextValue} >
                    <AppRouter />  
                </AuthContext.Provider>
            </MemoryRouter>
        )
        
        // screen.debug();

        expect(screen.getAllByText('Login').length).toBe(2);
    });

    test('debe de mostrar el componente de Marvel', () => {
      
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Ulises',
            },
        }
        
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        // screen.debug();

        expect(screen.getByText('Marvel')).toBeTruthy();
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);

    });
    
});
