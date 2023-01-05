import React from 'react'
import {BsGearWideConnected} from 'react-icons/bs';


function MyCommandes() {
  const handleNickname = () => {
    document.getElementById('inputMessage').value = '/nick ';
  }

  const handleChannel = () => {
    document.getElementById('inputMessage').value = '/list ';
  }

  const handleCreate = () => {
    document.getElementById('inputMessage').value = '/Create ';
  }

  const handleDelete = () => {
    document.getElementById('inputMessage').value = '/delete ';
  }

  const handleJoin = () => {
    document.getElementById('inputMessage').value = '/join ';
  }

  const handleLeave = () => {
    document.getElementById('inputMessage').value = '/leave ';
  }

  const handleUsers = () => {
    document.getElementById('inputMessage').value = '/users ';
  }

  const handleMsg = () => {
    document.getElementById('inputMessage').value = '/msg ';
  }

  const handleMessage = () => {
    document.getElementById('inputMessage').value = '/message ';
  }
  return (
    <div className="dropdown">
      <button type="button" className="btn btn-sm" data-bs-toggle="dropdown" style={{ marginTop: '8px', fontSize: '20px', height: '4vh'}}><BsGearWideConnected /></button>              
      <ul className="dropdown-menu p-2" style={{backgroundColor: '#243A73', color: 'white'}}>
        <li><p onClick={handleNickname}><strong style={{cursor: 'pointer'}}>/nick</strong> : <i>Définir un surnom</i> </p></li>
        <li><p onClick={handleChannel}><strong style={{cursor: 'pointer'}}>/list</strong> : <i>Channels disponibles</i></p></li>
        <li><p onClick={handleCreate}><strong style={{cursor: 'pointer'}}>/create</strong> : <i>Créer un channel</i></p></li>
        <li><p onClick={handleDelete}><strong style={{cursor: 'pointer'}}>/delete</strong> : <i>Supprimer un channel</i></p></li>
        <li><p onClick={handleJoin}><strong style={{cursor: 'pointer'}}>/join</strong> : <i>Rejoindre un channel</i></p></li>
        <li><p onClick={handleLeave}><strong style={{cursor: 'pointer'}}>/leave</strong> : <i>Quitter le channel</i></p></li>
        <li><p onClick={handleUsers}><strong style={{cursor: 'pointer'}}>/users</strong> : <i>Utilisateurs connectés</i></p></li>
        <li><p onClick={handleMsg}><strong style={{cursor: 'pointer'}}>/msg</strong> : <i>Envoier un message à un utilisateur spécifique</i></p></li>
        <li><p onClick={handleMessage}><strong style={{cursor: 'pointer'}}>/message</strong> : <i>Envoier un message à tous les utilisateurs</i></p></li>
      </ul>
    </div>
  )
}

export default MyCommandes