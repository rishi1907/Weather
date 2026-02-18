import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    onSearch: (city: string) => void;
    isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md relative">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search city..."
                    className="w-full px-4 py-3 pl-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    disabled={isLoading}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
            </div>
        </form>
    );
}
