import {useState, useEffect, useCallback} from 'react';
import useSocket from './useSoket';

const useSuperheroes = () => {
  const { socket, isConnected } = useSocket();
  const [superheroes, setSuperheroes] = useState<any[]>([]);

  const fetchSuperheroes = useCallback(
    (sortBy = "humility", order = "desc") => {
      if (socket && isConnected) {
        socket.emit("getSuperheroes", { sortBy, order }, (responseData: any[]) => {
          setSuperheroes(responseData);
        });
      }
    },
    [socket, isConnected]
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("superheroesUpdated", fetchSuperheroes);

    return () => {
      socket.off("superheroesUpdated", fetchSuperheroes);
    };
  }, [socket, fetchSuperheroes]);

  return { superheroes, fetchSuperheroes, isConnected };
};

export default useSuperheroes;
