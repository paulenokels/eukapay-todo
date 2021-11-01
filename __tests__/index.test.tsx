import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../src/pages/index';
import todoItem from '../src/interfaces/todoItem.type';
import { todoStatus } from '../src/utils/constants';

const uniqid = require('uniqid')
const moment = require('moment');



describe('Home', () => {

  let todoItems : todoItem[] | [] = [];


  const item: todoItem = {
    id: uniqid(),
    content: 'Meet Tomo',
    status: todoStatus.UNFINISHED,
    dueDate: moment(new Date()).format("YYYY-MM-DD"),
  }

  it('Should Add todo item',  () => {

    render(<Home todos={todoItems}/>);

    //act
    
    todoItems = [...todoItems, item];

    render(<Home todos={todoItems}/>);

    expect(screen.getByText(/Tomo/i)).toBeInTheDocument();
  })

  it('Should Update todo item',  () => {
    render(<Home todos={todoItems}/>);

    const checkbox = screen.getByLabelText(/change-status/i)
    fireEvent.click(checkbox)    
    expect(screen.getByText(todoStatus.DONE)).toBeInTheDocument();
  })

 
  
 
})