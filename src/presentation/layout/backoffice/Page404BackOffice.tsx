import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ContainerPage } from '../../components/containers/container-page/ContainerPage';
import { PageError } from '../../components/widgets/page-error/PageError';

export const Page404BackOffice: React.FC = () => {

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <ContainerPage description={'404'} title={'404'} titleSEO="Página 404">
      <PageError cod='404' error='Página no encontrada' details='La página a la que intentaste acceder no existe o no está disponible.' redirectPath='/' ></PageError>
    </ContainerPage>
  )
}
