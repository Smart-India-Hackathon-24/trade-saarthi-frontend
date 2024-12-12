"use client";
import React, { useState, useEffect } from 'react';
import { getBackendUrl } from '@/utils/getBackendUrl';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'words' | 'prefix' | 'suffix';


const RestrictedLists = () => {
    const [activeTab, setActiveTab] = useState<TabType>('words');
    const [newItem, setNewItem] = useState('');
    const [items, setItems] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const backendUrl = getBackendUrl();

    const endpoints = {
        words: '/restricted_words',
        prefix: '/restricted_prefix',
        suffix: '/restricted_suffix'
    };

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}${endpoints[activeTab]}/get`);
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, [activeTab]);

    const handleAddItem = async () => {
        if (!newItem.trim()) return;

        try {
            const response = await fetch(`${backendUrl}${endpoints[activeTab]}/add?${activeTab === 'words' ? 'word' : activeTab}=${encodeURIComponent(newItem)}`, {
                method: 'POST',
            });
            
            if (response.ok) {
                await fetchItems();
                setNewItem('');
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleDeleteItem = async (item: string) => {
        try {
            const response = await fetch(`${backendUrl}${endpoints[activeTab]}/delete?${activeTab === 'words' ? 'word' : activeTab}=${encodeURIComponent(item)}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                await fetchItems();
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div className="w-full h-[90vh] p-6">
            <div className="flex flex-col h-full md:flex-row">
                {/* Left Section - Input */}
                <div className="md:w-1/2 flex flex-1 p-4 flex-col">
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-primary-100">
                        <div className="flex space-x-2 mb-6">
                            {(['words', 'prefix', 'suffix'] as TabType[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-md ${
                                        activeTab === tab
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                placeholder={`Enter new ${activeTab === 'words' ? 'restricted word' : activeTab}`}
                                className="w-full p-3 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-400"
                            />
                            <button
                                onClick={handleAddItem}
                                className="w-full p-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                            >
                                Add {activeTab === 'words' ? 'Word' : activeTab}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section - List */}
                <div className="md:w-1/2 flex-1 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-primary-100 h-full overflow-hidden">
                        <h2 className="text-xl font-semibold mb-4">
                            {activeTab === 'words' ? 'Restricted Words' : `Restricted ${activeTab}es`}
                        </h2>
                        <div className="overflow-y-auto h-[calc(100%-3rem)]">
                            <AnimatePresence>
                                {loading ? (
                                    <div className="flex justify-center items-center h-full">
                                        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    <motion.div className="space-y-2">
                                        {items.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                                            >
                                                <span>{item}</span>
                                                <button
                                                    onClick={() => handleDeleteItem(item)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestrictedLists; 