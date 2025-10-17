import React from 'react'

interface IStepNumberProps{
    number: number;
}
export const StepNumber: React.FC<IStepNumberProps> = ({number}) => {
  return (
    <div>{number}</div>
  )
}
