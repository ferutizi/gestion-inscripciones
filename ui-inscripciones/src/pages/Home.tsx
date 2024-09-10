import React from 'react';
/* import { useNavigate } from 'react-router-dom'; */
import Requeriments from '../components/requeriments';
import Training from '../components/training';
import Banner from '../components/Banner';
import Courses from '../components/courses';
import Projects from '../components/projects';
import DrawerAppBar from '../components/NavBar';
// import Footer from '../components/footer';
// import { Auth } from '../auth';


const Home: React.FC = () => {
/*   const navigate = useNavigate();

  const handleProfileClick = () => {
    const isLogged = localStorage.getItem('isLogged') === 'true';
    if (isLogged) {
      navigate('/profile');
    } else {
      alert('Debes iniciar sesión para acceder al perfil.');
      navigate('/login')
    }
  };
 */
  return (
    <div style={{}}>
      {/* <button onClick={handleProfileClick}>Perfil de usuario</button> */}
      <DrawerAppBar />
      <Banner />
      {/* <Auth /> */}
      <Courses />
      <Projects />
      <Requeriments />
      <Training/>
      {/* <Footer /> */}
    </div>
    

  );
};

export default Home;
