import { createContext } from 'react';

export const UserContext = createContext({
    loggedIn: false,
    userName: null,
    cart: [],
    cartTotal: 0
});

export default UserContext;