'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_ROUTES } from '../../../../constants/app-routes';
import { checkUserAuthenticated } from '../../../../function/check_user_authenticated';

export function PrivateRoute({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Inicialmente null (ainda não sabe)

  useEffect(() => {
    const authStatus = checkUserAuthenticated();

    if (!authStatus) {
      router.push(APP_ROUTES.public.login);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    // Enquanto ainda está verificando, pode retornar null, um loading ou skeleton
    return null;
  }

  return <>{children}</>;
}

export default PrivateRoute;
