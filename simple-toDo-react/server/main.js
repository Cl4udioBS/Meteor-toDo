import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';
import { ServiceConfiguration } from 'meteor/service-configuration';

const SEED_USERNAME = 'admin';
const SEED_PASSWORD = '123456';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME) ){
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);


  // sE A COLEÇÃO ESTIVER VAZIA, ADICIONA DADOS.
  if (TasksCollection.find().count() === 0){
    [
      'Adicione uma tarefa', 
      'Adicione uma tarefa'
    ].forEach(insertTask, user);
  }

  //Autenticação GITHUB
  ServiceConfiguration.configurations.upsert(
    { service: 'github' },
    {
      $set: {
        loginStyle: 'popup',
        clientId: '', // insert your clientId here
        secret: '', // insert your secret here
      },
    }
  );
  
});
