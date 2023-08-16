import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    // Adicione ouvintes de rota para detectar a mudança de página
    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', stopLoading);
    router.events.on('routeChangeError', stopLoading);

    // Limpe os ouvintes quando o componente for desmontado
    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', stopLoading);
      router.events.off('routeChangeError', stopLoading);
    };
  }, []);

  return <div className={`h-2 fixed top-0 transition-[width] bg-red-500 z-50 ${loading ? ' w-full' : ''}`} />;
}

export default LoadingBar;
