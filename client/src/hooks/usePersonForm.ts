import { useState } from 'react';
import axios from 'axios';

interface NewPerson {
  name: string;
  age: string;
  city: string;
}

export const usePersonForm = (fetchData: () => void) => {
  const [newPerson, setNewPerson] = useState<NewPerson>({ name: '', age: '', city: '' });
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/people`, newPerson);
      setNewPerson({ name: '', age: '', city: '' });
      fetchData();
    } catch (err) {
      setError('Error adding new person');
    }
  };

  return { newPerson, handleInputChange, handleSubmit, error };
};
