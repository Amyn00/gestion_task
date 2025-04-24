import React, { useState, useContext } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import TaskEditForm from './components/TaskEditForm';
import Login from './components/Login';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import './App.css';

function AppContent() {
  const { isAuthenticated, logout } = useContext(AuthContext); // Utiliser le contexte d'authentification
  const [tasks, setTasks] = useState([]); // État pour la liste des tâches
  const [view, setView] = useState('list');
  const [selectedTask, setSelectedTask] = useState(null); // Tâche sélectionnée pour édition
  const [selectedTaskId, setSelectedTaskId] = useState(null); // ID de la tâche pour les détails

  // Fonction pour ajouter une nouvelle tâche à la liste
  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]); // Ajouter la nouvelle tâche en haut de la liste
    setView('list'); // Retour à la vue liste après ajout
  };

  // Gestionnaire pour la mise à jour d'une tâche
  const handleTaskUpdated = () => {
    setView('list'); // Retour à la vue liste après mise à jour
  };

  // Gestionnaire pour afficher les détails d'une tâche
  const handleViewTask = (taskId) => {
    setSelectedTaskId(taskId);
    setView('detail');
  };

  // Gestionnaire pour éditer une tâche
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setView('edit');
  };

  // Gestionnaire pour revenir à la liste
  const handleBackToList = () => {
    setView('list');
    setSelectedTask(null);
    setSelectedTaskId(null);
  };

  // Fonction pour rendre la vue active en fonction de l'état
  const renderView = () => {
    switch (view) {
      case 'detail':
        return (
          <TaskDetail 
            taskId={selectedTaskId} 
            onBack={handleBackToList} 
          />
        );
      case 'edit':
        return (
          <TaskEditForm 
            task={selectedTask} 
            onTaskUpdated={handleTaskUpdated} 
            onCancel={handleBackToList} 
          />
        );
      case 'list':
      default:
        return (
          <>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <TaskList 
              tasks={tasks} 
              setTasks={setTasks} 
              onEditTask={handleEditTask}
              onViewTask={handleViewTask}
            />
          </>
        );
    }
  };

  // Si l'utilisateur n'est pas authentifié, afficher un bouton de déconnexion
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="App">
      {/* En-tête de l'application */}
      <header className="App-header">
        <h1>Gestionnaire de Tâches</h1>
        <button onClick={logout} className="logout-button">
          Déconnexion
        </button>
      </header>

      {/* Contenu principal */}
      <main>
        {renderView()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
