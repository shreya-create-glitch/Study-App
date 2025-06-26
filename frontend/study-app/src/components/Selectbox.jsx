import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropDown from './DropDown';
import Input from './Input';

const Selectbox = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // added to control DropDown

  const handleChange = (e) => {
    const token = localStorage.getItem("token");
    const value = e.target.value;

    if (!token) {
      setOpen(true); // show login modal
      return;
    }

    if (value === 'book') {
      navigate('/addbook');
    } else if (value === 'library') {
      navigate('/library');
    }
  };

  return (
    <div className="mt-4">
      <select
        className="p-2 rounded border border-gray-300"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled>Select:</option>
        <option value="book">Book</option>
        <option value="library">Library</option>
      </select>

      {open && (
        <DropDown onClose={() => setOpen(false)}>
          <Input onClose={() => setOpen(false)} />
        </DropDown>
      )}
    </div>
  );
};

export default Selectbox;
