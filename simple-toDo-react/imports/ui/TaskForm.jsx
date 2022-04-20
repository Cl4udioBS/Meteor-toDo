import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const TaskForm = () => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('tasks.insert', text);

    setText('');
  };
  
  return (
    <form className='task-form' onSubmit={ handleSubmit }>
      <input 
        type="text" 
        placeholder="Clique para adc novas tarefas" 
        value={ text }
        onChange = { (e) => setText(e.target.value)}
      />

      <button className='btn' type='submit'>+ tarefa</button>

    </form>
  );
};