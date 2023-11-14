import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Pruebas en <PublicRoute />', () => {
  
    test('debe de mostrar el children si no está autenticado', () => {
      
        const contextValue = {
            logged: false,
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        // screen.debug();

        expect(screen.getByText('Ruta pública')).toBeTruthy();

    });
    
    test('debe de navegar si está autenticado', () => {
      
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Ulises',
            }
        }
        
        render(
            // Cremos el HOC con el contexto esencial para que la logica del componente a evaluar funcione
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}> {/* Esencial para simular en Navigate y dirigirnos al login */}
                    <Routes> {/* Creamos un conjunto de rutas entre las que se encuentra el login */}
                        <Route path='login' element={ // Como logged es true, login no se mostrara
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        } />
                        <Route path='/' element={<h1>Página de inicio</h1>} /> {/* Al logged ser true nos mostrara el contenido de la página de inicio */}
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Página de inicio')).toBeTruthy();

    });

})
