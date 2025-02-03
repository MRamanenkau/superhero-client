import { useState, useEffect } from 'react';
import useSocket from './useSoket';

const useSuperheroes = () => {
  const {socket, isConnected} = useSocket();
  const [superheroes, setSuperheroes] = useState<any[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleSuperheroesUpdate = (data: any[]) => {
      setSuperheroes(data);
    };

    socket.on('superheroesUpdated', handleSuperheroesUpdate);

    return () => {
      socket.off('superheroesUpdated', handleSuperheroesUpdate);
    };
  }, [socket]);

  const fetchSuperheroes = (sortBy = 'humility', order = 'desc') => {
    if (socket && isConnected) {
      socket.emit('getSuperheroes', {sortBy, order}, (responseData: any[]) => {
        setSuperheroes(responseData);
      });
    }
  };

  return { superheroes, fetchSuperheroes, isConnected };
};

export default useSuperheroes;
