import React from 'react';
import { useFetchPeople } from '@/hooks/useFetchPeople';
import { usePersonForm } from '@/hooks/usePersonForm';
import CustomDataTable from '@/components/organisms/CustomDataTable';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/Card';

function App() {
  const { data, loading, error, fetchData } = useFetchPeople();
  const { newPerson, handleInputChange, handleSubmit, error: formError } = usePersonForm(fetchData);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'city', label: 'City' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">People Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Add New Person</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="name"
                value={newPerson.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
              <Input
                type="number"
                name="age"
                value={newPerson.age}
                onChange={handleInputChange}
                placeholder="Age"
                required
              />
              <Input
                type="text"
                name="city"
                value={newPerson.city}
                onChange={handleInputChange}
                placeholder="City"
                required
              />
              <Button type="submit">Add Person</Button>
            </form>
            {formError && <p className="text-red-500">{formError}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total People: {data.length}</p>
            <p>Average Age: {data.length > 0 ? (data.reduce((sum, person) => sum + parseInt(person.age), 0) / data.length).toFixed(2) : 0}</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <CustomDataTable initialData={data} columns={columns} />
      )}
    </div>
  );
}

export default App;
