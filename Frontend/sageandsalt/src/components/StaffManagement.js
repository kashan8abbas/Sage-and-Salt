import React, { useState, useCallback, useEffect } from 'react';
import { Edit2, Trash2, Search } from 'lucide-react';
import Sidebar from './Sidebar.jsx';
import staffImage from '../../assets/staff.jpg';  // Import the background image

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    contact_number: '',
    skills: '',
    shift_schedule: [{ date: '', start_time: '', end_time: '' }]
  });

  const fetchStaff = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/staff/search?name=${searchName}&role=${searchRole}`
      );
      const data = await response.json();
      setStaff(data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  }, [searchName, searchRole]);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = selectedStaff
      ? `http://localhost:5000/api/staff/update/${selectedStaff._id}`
      : 'http://localhost:5000/api/staff/create';
    const method = selectedStaff ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(',').map((skill) => skill.trim()),
          shift_schedule: formData.shift_schedule.filter(shift =>
            shift.date && shift.start_time && shift.end_time
          ),
        }),
      });

      if (response.ok) {
        fetchStaff();
        setShowAddModal(false);
        setShowEditModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving staff:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/staff/delete/${id}`, {
        method: 'DELETE',
      });
      fetchStaff();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: '',
      contact_number: '',
      skills: '',
      shift_schedule: [{ date: '', start_time: '', end_time: '' }]
    });
    setSelectedStaff(null);
  };

  const handleAddShift = () => {
    setFormData({
      ...formData,
      shift_schedule: [
        ...formData.shift_schedule,
        { date: '', start_time: '', end_time: '' }
      ]
    });
  };

  const handleRemoveShift = (index) => {
    const newShifts = formData.shift_schedule.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      shift_schedule: newShifts
    });
  };

  const handleShiftChange = (index, field, value) => {
    const newShifts = formData.shift_schedule.map((shift, i) => {
      if (i === index) {
        return { ...shift, [field]: value };
      }
      return shift;
    });
    setFormData({
      ...formData,
      shift_schedule: newShifts
    });
  };

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-black p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const StaffForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded bg-black"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full p-2 border rounded bg-black"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            required={!selectedStaff}
            className="w-full p-2 border rounded bg-black"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            required
            className="w-full p-2 border rounded bg-black"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="waiter">Waiter</option>
            <option value="chef">Chef</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact Number</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded bg-black"
            value={formData.contact_number}
            onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Skills (comma-separated)</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded bg-black"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </div>
      </div>

      {/* Shift Schedule */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Shift Schedule</h3>
          <button
            type="button"
            onClick={handleAddShift}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Shift
          </button>
        </div>
        {formData.shift_schedule.map((shift, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                required
                className="w-full p-2 border rounded bg-black"
                value={shift.date}
                onChange={(e) => handleShiftChange(index, 'date', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                required
                className="w-full p-2 border rounded bg-black"
                value={shift.start_time}
                onChange={(e) => handleShiftChange(index, 'start_time', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                required
                className="w-full p-2 border rounded bg-black"
                value={shift.end_time}
                onChange={(e) => handleShiftChange(index, 'end_time', e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveShift(index)}
              className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove Shift
            </button>
          </div>
        ))}
      </div>

      {/* Form Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowAddModal(false);
            setShowEditModal(false);
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {selectedStaff ? 'Update Staff' : 'Add Staff'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed position */}
      <Sidebar className="w-1/4 bg-gray-800 text-white h-full fixed" />

      {/* Main content area with background */}
      <div
        className="flex-1 p-4 relative"
        style={{
          backgroundImage: `url(${staffImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-6 text-white">Staff Management</h1>

          {/* Search Filters */}
          <div className="mb-4 flex space-x-4 relative">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full p-2 text-white border rounded bg-black pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <select
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
              className="w-full p-2 border rounded bg-black"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="waiter">Waiter</option>
              <option value="chef">Chef</option>
            </select>
          </div>

          {/* Add Staff Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="mb-6 px-4 py-2 text-[#cda45e] text-white rounded hover:bg"
          >
            Add New Staff
          </button>

          {/* Staff Table */}
          <div className="bg-black bg-opacity-60 rounded-lg overflow-hidden">
            <table className="min-w-full table-auto ">
              <thead className="bg-gray-200 bg-black bg-opacity-10 text-[#cda45e]">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Skills</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((staffMember) => (
                  <tr key={staffMember._id} className="border-b">
                    <td className="border px-4 py-2">{staffMember.name}</td>
                    <td className="border px-4 py-2">{staffMember.role}</td>
                    <td className="border px-4 py-2">{staffMember.skills.join(', ')}</td>
                    <td className="border px-4 py-2 flex space-x-4 justify-center">
                      <button
                        onClick={() => {
                          setSelectedStaff(staffMember);
                          setFormData({
                            ...formData,
                            ...staffMember,
                            skills: staffMember.skills.join(', '),
                          });
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                        title="Edit Staff"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(staffMember._id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete Staff"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal show={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Staff">
        <StaffForm />
      </Modal>

      <Modal show={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Staff">
        <StaffForm />
      </Modal>
    </div>
  );
};

export default StaffManagement;