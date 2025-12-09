"use client"
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Search, Menu, Link2, TrendingUp, Sparkles, Code, DollarSign, Home } from 'lucide-react';

interface Tool {
  id: number;
  u_Id: string;
  name: string;
  url: string;
  des: string;
  keyword: string;
  category: string;
}

const categories = [
  { id: 'all', name: 'All Tools', icon: Home },
  { id: 'urlTometa', name: 'URL to Meta', icon: Link2 },
  { id: 'popularTools', name: 'Popular Tools', icon: TrendingUp },
  { id: 'newFunction', name: 'New Function', icon: Sparkles },
  { id: 'developerTools', name: 'Developer Tools', icon: Code },
  { id: 'tradingTool', name: 'Trading Tool', icon: DollarSign },
];

export default function AdminPanel() {
  const [tools, setTools] = useState<Tool[]>([
    {
      id: 1,
      u_Id: "ip-01",
      name: "IP Tools",
      url: "developmenttool/ip-tools",
      des: "Tools to check, lookup and analyze IP details.",
      keyword: "ip address, lookup, network",
      category: "developerTools"
    }
  ]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<Omit<Tool, 'id'>>({
    u_Id: "",
    name: "",
    url: "",
    des: "",
    keyword: "",
    category: "developerTools"
  });

  const openModal = (tool?: Tool) => {
    if (tool) {
      setEditingTool(tool);
      setFormData({
        u_Id: tool.u_Id,
        name: tool.name,
        url: tool.url,
        des: tool.des,
        keyword: tool.keyword,
        category: tool.category
      });
    } else {
      setEditingTool(null);
      setFormData({
        u_Id: "",
        name: "",
        url: "",
        des: "",
        keyword: "",
        category: activeCategory === 'all' ? 'developerTools' : activeCategory
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTool(null);
  };

  const handleSubmit = () => {
    if (!formData.u_Id || !formData.name || !formData.url || !formData.des || !formData.keyword) {
      alert('Please fill in all fields');
      return;
    }
    
    if (editingTool) {
      setTools(tools.map(tool => 
        tool.id === editingTool.id 
          ? { ...formData, id: editingTool.id }
          : tool
      ));
    } else {
      const newTool: Tool = {
        ...formData,
        id: Math.max(...tools.map(t => t.id), 0) + 1
      };
      setTools([...tools, newTool]);
    }
    
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setTools(tools.filter(tool => tool.id !== id));
    }
  };

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.u_Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.des.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
            <p className="text-blue-100 text-sm mt-1">Tool Manager</p>
          </div>

          {/* Categories */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{category.name}</span>
                  {isActive && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <div className="text-center">
              <p className="text-xs text-gray-500">Total Tools</p>
              <p className="text-2xl font-bold text-gray-900">{tools.length}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu size={24} />
                </button>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {categories.find(cat => cat.id === activeCategory)?.name || 'All Tools'}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
                  </p>
                </div>
              </div>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-200 hover:shadow-xl"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Add Tool</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tools by name, ID, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-white"
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Unique ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">URL</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Keywords</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredTools.map((tool) => (
                    <tr key={tool.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{tool.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-xs font-semibold">
                          {tool.u_Id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tool.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                          {getCategoryName(tool.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{tool.url}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{tool.des}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{tool.keyword}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          onClick={() => openModal(tool)}
                          className="text-blue-600 hover:text-blue-800 mr-4 p-2 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(tool.id)}
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredTools.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Search className="text-gray-400" size={32} />
                </div>
                <p className="text-gray-500 text-lg">No tools found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-xs font-semibold">
                        {tool.u_Id}
                      </span>
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                        {getCategoryName(tool.category)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-3">
                    <button
                      onClick={() => openModal(tool)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all shadow-sm"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(tool.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-sm border-t pt-3 mt-3">
                  <p className="text-gray-600"><span className="font-semibold text-gray-700">URL:</span> {tool.url}</p>
                  <p className="text-gray-600"><span className="font-semibold text-gray-700">Description:</span> {tool.des}</p>
                  <p className="text-gray-600"><span className="font-semibold text-gray-700">Keywords:</span> {tool.keyword}</p>
                </div>
              </div>
            ))}
            {filteredTools.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Search className="text-gray-400" size={32} />
                </div>
                <p className="text-gray-500 text-lg">No tools found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {editingTool ? 'Edit Tool' : 'Add New Tool'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Unique ID
                </label>
                <input
                  type="text"
                  value={formData.u_Id}
                  onChange={(e) => setFormData({ ...formData, u_Id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., ip-01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., IP Tools"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {categories.filter(cat => cat.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., developmenttool/ip-tools"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.des}
                  onChange={(e) => setFormData({ ...formData, des: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Brief description of the tool..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  value={formData.keyword}
                  onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., ip address, lookup, network"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg"
                >
                  {editingTool ? 'Update Tool' : 'Create Tool'}
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}