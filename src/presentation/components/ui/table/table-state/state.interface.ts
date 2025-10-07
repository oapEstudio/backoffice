export default interface IStateProps {
    state: 'Completo' | 'Pendiente' | 'Pendiente con error';
    info?: string;
  }