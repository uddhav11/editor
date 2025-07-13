import {io} from 'socket.io-client';

let socket;

export const connectSocket= (token) => {
    console.log(import.meta.REACT_APP_API_URL);
    socket= io(import.meta.REACT_APP_API_URL, {
        auth: {token: localStorage.getItem('token') || token},
        withCredentials: true,
        path: '/socket.io',
    });
    return socket;
}

export const getSocket=() => {
    if(!socket) {
        throw new Error('Socket not connected')

    }
    return socket;
}


export const disconnectSocket=() => {
    if(socket){
        socket.disconnect();
    }
}