import { Button } from '@material-tailwind/react';
import { Users, BookOpenText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navegacion() {
  const [ clickClients, setClickClients ] = useState(false);
  const [ clickLibrary, setClickLibrary ] = useState(false);

  const navigate = useNavigate();
  const currentRoute = useLocation();

  useEffect(() => {
    if (currentRoute.pathname === "/admin/clientes") {
      setClickClients(true);
      setClickLibrary(false);
    } else if (currentRoute.pathname === "/admin/libreria/activity/exercises" || currentRoute.pathname === "/admin/libreria/activity/workouts") {
      setClickLibrary(true);
      setClickClients(false);
    }
  }, [currentRoute]);

  const handleClickClientes = () => {
    setClickClients(true);
    setClickLibrary(false);
    navigate('/admin/clientes'); // Redirige a la página de clientes
  };

  const handleClickLibreria = () => {
    setClickLibrary(true);
    setClickClients(false);
    navigate('/admin/libreria/activity/exercises'); // Redirige a la página de librería
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-50">
      <div className="flex justify-around py-2">
        {/* @ts-expect-error */}
        <Button
          onClick={handleClickClientes}
          variant={clickClients ? 'filled' : 'text'}
          size='sm'
          className="flex flex-col items-center p-1 min-w-0"
        >
          <Users size={16} />
          <span className='text-[10px]'>Clientes</span>
        </Button>
        {/* @ts-expect-error */}
        <Button
          onClick={handleClickLibreria}
          variant={clickLibrary ? 'filled' : 'text'}
          size='sm'
          className="flex flex-col items-center p-1 min-w-0"
        >
          <BookOpenText size={16} />
          <span className='text-[10px]'>Libreria</span>
        </Button>
      </div>
    </div>
  );
}
