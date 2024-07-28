import { useState, useEffect } from 'react';
import axios from 'axios';

const columnFields = [
    { value: 'id', label: 'Id' },
    { value: 'name', label: 'Name', enableSearch: true },
    { value: 'email', label: 'Email', enableSearch: true },
    { value: 'username', label: 'Username' },
    { value: 'phone', label: 'Phone' },
    { value: 'website', label: 'Website' },
  ];

const useUserData = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [sortColumn, setSortColumn] = useState(columnFields[0].value);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: users } = await axios.get('/api/v1/users');
        setUsers(users);
        setFilteredUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleOnSearch = (event) => {
    const { name, value } = event.target;
  
    if (name === 'name') {
      setSearchName({ searchName: value });
    } else if (name === 'email') {
      setSearchEmail({ searchEmail: value });
    } else {
      throw new Error('Unknown search element');
    }
  };
  


  const handleSort = (column) => {
    const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);
    const sortedUsers = [...users].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
  };
  

  return {
    users,
    filteredUsers,
    searchName,
    setSearchName,
    searchEmail,
    setSearchEmail,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    handleSort,
    handleOnSearch,
  };
};

export default useUserData;

