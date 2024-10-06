import React, { useState, useEffect } from 'react';
import { UserDataType } from './types';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import GoogleButton from './components/GoogleButton';
import api from './utils/axiosConfig';

const clientId = '27875311198-j2cbmbhmid8llm2bu30be5s8dljret50.apps.googleusercontent.com';

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Auth: React.FC = () => {
  const initialUser: UserDataType = {
    email: "",
    email_verified: false,
    family_name: "",
    given_name: "",
    name: "",
    picture: "",
    sub: "",
    birthday: "",
    rol: "",
    id: ""
  };

  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState<UserDataType>(initialUser);
  const [, setUsuarios] = useState<any[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const storedIsLogged = localStorage.getItem('isLogged') === 'true';
    if (storedUserData && storedIsLogged) {
      setUserData(JSON.parse(storedUserData));
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      const fetchUsuarios = async () => {
        try {
          const response = await api.get('/api/usuario/listar');
          const usuarios = response.data.content;

          const loggedUser = usuarios.find((usuario: any) => usuario.email === userData.email);

          if (loggedUser) {
            localStorage.setItem('userRole', loggedUser.rol);
            console.log('Usuario logueado encontrado:', loggedUser);

            const loggedUserData = {
              ...userData,
              rol: loggedUser.rol,
              id: loggedUser.id 
            };

            localStorage.setItem('userData', JSON.stringify(loggedUserData));
            localStorage.setItem('userDataLogin', JSON.stringify(loggedUserData));
            localStorage.setItem('userDataLogin.id', loggedUser.id.toString());

            console.log('Datos guardados en userData:', loggedUserData);
            console.log('ID guardado en userDataLogin.id:', loggedUser.id);

            setUserData(loggedUserData);
          } else {
            console.error('No se encontró el usuario logueado en la lista.');
          }

          setUsuarios(usuarios);
          alert('Inicio de sesión exitoso. Haz clic en Aceptar para continuar.');

          navigate('/'); 
        } catch (error) {
          console.error('Error fetching usuarios:', error);
        }
      };

      fetchUsuarios();
    }
  }, [isLogged, navigate, userData]);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.birthday.read',
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;

        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const peopleApiResponse = await axios.get('https://people.googleapis.com/v1/people/me?personFields=birthdays', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const birthdayData = peopleApiResponse.data.birthdays?.[1] || peopleApiResponse.data.birthdays?.[0];
        const birthday = birthdayData?.date || {};

        const userDataWithBirthday: UserDataType = {
          ...userInfoResponse.data,
          birthday: formatDate(new Date(birthday.year, birthday.month - 1, birthday.day)),
        };

        console.log('Datos del usuario después del login:', userDataWithBirthday);

        localStorage.setItem('userData', JSON.stringify(userDataWithBirthday));
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('userDataLogin', JSON.stringify(userDataWithBirthday));
        localStorage.setItem('userDataLogin.id', userDataWithBirthday.sub);

        console.log('Datos guardados en userData:', userDataWithBirthday);
        console.log('ID guardado en userDataLogin.id:', userDataWithBirthday.sub);

        setUserData(userDataWithBirthday);
        setIsLogged(true);

        await api.post('/api/usuario/crear', {
          nombre: userDataWithBirthday.given_name,
          apellido: userDataWithBirthday.family_name,
          email: userDataWithBirthday.email,
          fechaNacimiento: userDataWithBirthday.birthday,
          rol: 'VISITANTE',
          password: "Admin123!" 
        });

      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (error) => console.log('Login failed:', error),
  });

  const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('isLogged');
    localStorage.removeItem('userDataLogin');
    localStorage.removeItem('userDataLogin.id');
    setIsLogged(false);
    setUserData(initialUser);
  };

  return (
    <div>
      {!isLogged ? (
        <div onClick={() => login()}> 
          <GoogleButton />
        </div>
      ) : (
        <button onClick={logout}>Cerrar sesión</button>
      )}
    </div>
  );
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <GoogleOAuthProvider clientId={clientId}>
    {children}
  </GoogleOAuthProvider>
);

export { Auth, AuthProvider };
