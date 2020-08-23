const express = require('express');
const cors = require('cors');

const { v4:uuid, isUuid } = require('uuid');

const app = express();

app.use( express.json() );
app.use(cors());

const repositories = [];

function logRequests(request, response, next) {
    const { method, url} = request;

    const logLabel  = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();  

    console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if(!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid project ID' });
    }

    return next();
}

app.use(logRequests);
app.use('/repositories:id', validateProjectId);

app.get('/repositories', (request, response) => {    
    return response.json(repositories);
});

app.post('/repositories', (request, response) => {
    /*const {title, owner} = request.body;

    const project = {id: uuid(), title, owner}

    projects.push(project);

    return response.json(project);  
    */
   const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);

});

app.put('/repositories/:id', (request, response) => {
    
    /*const { id } = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex <0){
        return response.status(400).json({error: 'Project not found'});
    }
    
    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);*/

  const { id } = request.params;
  const {title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex<0) return response.status(400).json({error: 'Repository does not exist.'})

  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0,
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex<0) return response.status(400).json({error: 'Repository does not exist.'});

  repositories.splice(repositoryIndex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;
  
    const repository =  repositories.find(repository => repository.id === id);
  
    if(!repository) {
      return response.status(400).send();
    }
  
    repository.likes++;
  
    return response.json(repository);
  });


app.listen(3333, () => {
    console.log('🚀️ Back-end started!');
});
