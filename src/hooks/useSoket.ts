import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'localhost:4321';

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [superheroes, setSuperheroes] = useState<any[]>([]);

  useEffect(() => {
    const socketInstance = io(SOCKET_SERVER_URL, {transports: ['websocket']});
    setSocket(socketInstance);

    socketInstance.on('superheroesUpdated', (data) => {
      setSuperheroes(data);
    });


    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const fetchSuperheroes = (sortBy = 'humility', order = 'desc') => {
    if (socket) {
      socket.emit('getSuperheroes', { sortBy: 'humility', order: 'desc' });
    }
  };

  return { superheroes, fetchSuperheroes };
};

export default useSocket;
