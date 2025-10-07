import Button from '../components/ui/button/button.component';
import Header from '../components/ui/header/header.component';
import CustomTextInput from '../components/ui/inputs/text-input/text-input.component';
import { CustomCheckboxInput } from '../components/ui/inputs/checkbox';
import { useForm } from 'react-hook-form';

import DashboardCard from '../components/ui/card/dashboard';
import BlankCard from '../components/ui/card/blank';
import Container from '../components/ui/container';
import UserAvatar from '../components/ui/user/user-avatar.component';
import State from '../components/ui/state';

let isLoading = true;
const fetchMock = ()=>{

    isLoading = true;
    setTimeout(() => {
        console.log('finished fetch mock');
        isLoading = false;
    }, 2000);
};

export const PageTest = () => {
    const {control} = useForm<{checkTest: string}>({
    defaultValues: {
      checkTest: "",
    },
    mode: "onChange",
  })

  return (
    <>
       
         <Container description={'PAgina container general'} infinityScroll={true} isLoading={isLoading} fetchMoreData={fetchMock}>
            <Header/>
            <UserAvatar name='BO'/>
            <State label={'Prueba'}/>
        <Button variant='primary' title='Prueba boton'/>
        <CustomTextInput/>
        <CustomCheckboxInput label={'Pruebaa checl'} control={control} name={'checkTest'} disable={false} />
       
   

        <DashboardCard/>
        <BlankCard>
            <Button variant='primary' title='Prueba boton'/>
        </BlankCard>
         <Button variant='primary' title='Prueba boton'/>
          <Button variant='primary' title='Prueba boton'/>
           <Button variant='primary' title='Prueba boton'/>
            <Button variant='primary' title='Prueba boton'/>
             <Button variant='primary' title='Prueba boton'/>
              <Button variant='primary' title='Prueba boton'/>
               <Button variant='primary' title='Prueba boton'/>
                <Button variant='primary' title='Prueba boton'/>
                 <Button variant='primary' title='Prueba boton'/>
                  <Button variant='primary' title='Prueba boton'/>
                   <Button variant='primary' title='Prueba boton'/>
                    <Button variant='primary' title='Prueba boton'/>
                     <Button variant='primary' title='Prueba boton'/>
                      <Button variant='primary' title='Prueba boton'/>
                  <Button variant='primary' title='Prueba boton'/>

        </Container> 
      
        
        
    </>

  )
}
