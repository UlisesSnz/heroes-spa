import { authReducer, types } from '../../../src/auth';

describe('Pruebas en authReducer', () => {
    const initialState = {
        logged: false,
    }

    test('debe de retornar el estado por defecto', () => {
        const newState = authReducer(initialState, {});

        expect(newState).toBe(initialState);
    });
    
    test('debe de (login) llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: {
                id: 'ABC',
                user: 'Ulises',
            }
        }

        const newState = authReducer(initialState, action);

        expect(newState).toEqual({
            logged: true,
            user: action.payload,
        });
    });
    
    test('debe de (logout) borrar el name del usuario y logged en false', () => {
        const state = {
            logged: true,
            user: {id: 'ABC', name: 'Ulises',}
        }
        
        const action = {
            type: types.logout,
        }
        
        const newState = authReducer(state, action);

        expect(newState).toEqual({logged: false});
    });
});
