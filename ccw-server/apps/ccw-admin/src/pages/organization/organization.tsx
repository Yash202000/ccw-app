import React, { useState, useEffect } from 'react';
import './organization.css';
// Define the organization data interface
interface OrganizationData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
  countryCode: string;
  stateCode: string;
  logoUrl: string;
  users: string[];
}

const OrganizationPage: React.FC = () => {
  const [organization, setOrganization] = useState<OrganizationData | null>(null);

  // Comment this part to use dummy data
  // Replace 'apiUrl' with your actual API endpoint
  
  const apiUrl = 'https://localhost:3000/organization';

  useEffect(() => {
    // Fetch organization data from the API
    const fetchOrganizationData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setOrganization(data);
        } else {
          console.error('Failed to fetch organization data');
        }
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    };

    fetchOrganizationData();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts
  

  // Uncomment this part to use dummy data
  // useEffect(() => {
  //   // Define your dummy organization data here
  //   const dummyOrganization: OrganizationData = {
  //     id: 1,
  //     name: 'Example Organization',
  //     email: 'info@example.com',
  //     phoneNumber: '+1234567890',
  //     address: '123 Main Street',
  //     city: 'Sampleville',
  //     postalCode: '12345',
  //     countryCode: 'US',
  //     stateCode: 'CA',
  //     logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_YT1HBTzGJutmrEriz9yUr0tRrXoeSzg74f7LHOh4qA&s', // Replace with actual logo URL
  //     users: ['User1', 'User2', 'User3'], // Dummy user names
  //   };

  //   // Set the organization state with the dummy data
  //   setOrganization(dummyOrganization);
  // }, []);

  return (
    <div className='content' >
      <div className='heading'><h1>Organization Details</h1></div>
      {organization ? (
        <div className='container'>
          {/* Display the organization's logo */}
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_YT1HBTzGJutmrEriz9yUr0tRrXoeSzg74f7LHOh4qA&s' alt="Organization Logo" />
          {/* Display organization details */}
          <p ><b>ID: </b> {organization.id}</p>
          <p ><b>Name: </b> {organization.name}</p>
          <p ><b>Email:</b> {organization.email}</p>
          <p ><b>Phone Number:</b> {organization.phoneNumber}</p>
          <p ><b>Address: </b>{organization.address}</p>
          <p ><b>City:</b> {organization.city}</p>
          <p ><b>Postal Code:</b> {organization.postalCode}</p>
          <p><b>Country Code: </b>{organization.countryCode}</p>
          <p><b>State Code:</b> {organization.stateCode}</p>
          <h2>Users:</h2>
          {/* Display the list of organization users */}
          <ul>
            {organization.users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading organization data...</p>
      )}
    </div>
  );
};

export default OrganizationPage;
