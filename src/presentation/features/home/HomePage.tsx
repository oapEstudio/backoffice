import { ContainerPage } from '../../components/containers/container-page/ContainerPage';
import IMG_HOME from './../../../../public/assets/img/home.png';

export const HomePage = () => {
  return (
    <ContainerPage description={'Home'} title={'Inicio'} titleSEO="Inicio">
      <img
        src={IMG_HOME}
        alt="Imagen de inicio"
        style={{
          width: '100%',                           
          height: 'auto',     
          maxHeight: '80vh',        
          objectFit: 'cover',        
          objectPosition: 'center',  
          display: 'block',
          margin: 'auto',          
          marginTop: '3%'
        }}
      />
    </ContainerPage>
  );
};
