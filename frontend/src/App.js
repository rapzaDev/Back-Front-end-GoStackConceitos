import React, {useState, useEffect} from 'react';
import api from './services/api';

import './App.css';
import "./styles.css";

import Header from './components/Header';

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect( () => {
        api.get('repositories').then(response => {
            setRepositories(response.data);
        });
    }, []);

    async function handleAddRepository() {
        //setProjects([...projects, `Novo projeto ${Date.now()}`]);

       /* const response = await api.post('projects',{
            title: `Novo projeto ${Date.now()}`,
	        owner: "Rafael Pérez"
        });

        const project = response.data;

        setProjects([...projects,project]);*/

        const response = await api.post('repositories',{
            title: 'Proffy',
            url: 'https://github.com/rapzaDev/Proffy',
            techs: ['Node.js', 'ReactJS'],
          });
      
          setRepositories([...repositories,response.data]);                                                                 

    }

    async function handleRemoveRepository(id) {
        await api.delete(`repositories/${id}`);
    
        setRepositories(repositories.filter(
          repository => repository.id !== id
        ));
        
      }

    return (
        <>
            <Header title="Repositories" />

            <ul>
                {repositories.map(repository => (
            
                    <li key={repository.id}>
                        {repository.title}

                        <button onClick={() => handleRemoveRepository(repository.id)}>
                        Remover
                        </button>
                    </li>

                ))}
            </ul>

            
            <button onClick={handleAddRepository}>Adicionar</button>
        </>
    );
}

export default App;