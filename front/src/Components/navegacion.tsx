import { Button } from '@material-tailwind/react';
import { Users, BookOpenText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navegacion() {

  const navigate = useNavigate();

  const handleClickClientes = () => {
    navigate('/clientes'); // Redirige a la página de clientes
  };

  const handleClickLibreria = () => {
    navigate('/libreria'); // Redirige a la página de librería
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-50">
      <div className="flex justify-around py-2">
        {/* @ts-expect-error */}
        <Button onClick={handleClickClientes} variant='outlined' size='sm' className="flex flex-col items-center p-1 min-w-0">
            <Users size={16}/>
          <span className="text-[10px]">Clientes</span>          
        </Button>
        {/* @ts-expect-error */}
        <Button onClick={handleClickLibreria} variant='outlined' size='sm' className="flex flex-col items-center p-1 min-w-0">
            <BookOpenText size={16} />
          <span className="text-[10px]">Libreria</span>
        </Button>
      </div>
    </div>
  );
}
