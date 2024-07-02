import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Info = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log(id)
    console.log(user.id)
    if (user.id && id && user.id != id) {
      if (confirm('אל תנסה לגנוב אותי')) {
        console.log('confirm')
        navigate('..')
      }
    }
  }, [navigate])

  return (
    <div className='info'>
      <h2>User Details</h2>
      <ul>
        <li><strong className='bold'>ID:</strong> {user.id}</li>
        <li><strong className='bold'>Name:</strong> {user.name}</li>
        <li><strong className='bold'>Username:</strong> {user.username}</li>
        <li><strong className='bold'>Email:</strong> {user.email}</li>
        <li>
          <strong className='bold'>Address:</strong>
          <ul>
            <li><strong className='bold'>Street:</strong> {user.address.street}</li>
            <li><strong className='bold'>Suite:</strong> {user.address.suite}</li>
            <li><strong className='bold'>City:</strong> {user.address.city}</li>
            <li><strong className='bold'>Zipcode:</strong> {user.address.zipcode}</li>
            <li>
              <strong className='bold'>Geo:</strong>
              <ul>
                <li><strong className='bold'>Lat:</strong> {user.address.geo.lat}</li>
                <li><strong className='bold'>Lng:</strong> {user.address.geo.lng}</li>
              </ul>
            </li>
          </ul>
        </li>
        <li><strong className='bold'>Phone:</strong> {user.phone}</li>
        <li>
          <strong className='bold'>Company:</strong>
          <ul>
            <li><strong className='bold'>Name:</strong> {user.company.name}</li>
            <li><strong className='bold'>Catch Phrase:</strong> {user.company.catchPhrase}</li>
            <li><strong className='bold'>BS:</strong> {user.company.bs}</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Info;
