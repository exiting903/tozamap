
import React, { useState, useRef } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
  t: any;
}

// Mock database of taken nicknames for demonstration
const TAKEN_NICKNAMES = ['admin', 'root', 'support', 'elonmusk'];

export const Auth: React.FC<AuthProps> = ({ onLogin, t }) => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = () => {
    setError('');

    // 1. Validation
    if (!nickname || !name || !password) {
      setError(t.auth.errorFillAll);
      return;
    }

    // 2. Unique Nickname Check
    if (TAKEN_NICKNAMES.includes(nickname.toLowerCase())) {
      setError(t.auth.errorNickTaken);
      return;
    }

    // 3. Create User
    // In a real app, you would send this data to a backend server.
    // The password would be hashed, not stored in plain text.
    const newUser: User = {
      id: `u_${Date.now()}`,
      name: name,
      nickname: nickname,
      rank: 'Novice',
      points: 0,
      avatarUrl: avatarPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff`
    };

    onLogin(newUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600 text-3xl">
            <i className="fa-solid fa-leaf"></i>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{t.auth.title}</h1>
          <p className="text-slate-500 text-sm mt-1">{t.auth.subtitle}</p>
        </div>

        <div className="space-y-4">
          {/* Photo Upload */}
          <div className="flex flex-col items-center mb-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative w-24 h-24 rounded-full bg-slate-100 cursor-pointer hover:bg-slate-200 transition overflow-hidden border-2 border-dashed border-slate-300 flex items-center justify-center"
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <i className="fa-solid fa-camera text-slate-400 text-2xl"></i>
              )}
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-emerald-600 text-xs font-bold mt-2 uppercase tracking-wide"
            >
              {t.auth.uploadPhoto}
            </button>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>

          {/* Nickname */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
              {t.auth.nickname}
            </label>
            <div className="relative">
              <i className="fa-solid fa-at absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value.replace(/\s/g, ''))}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                placeholder="username"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
              {t.auth.name}
            </label>
            <div className="relative">
              <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
              {t.auth.password}
            </label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-500 text-sm rounded-xl text-center font-medium animate-fade-in">
              {error}
            </div>
          )}

          <button 
            onClick={handleRegister}
            className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 active:scale-95 transition-transform mt-4"
          >
            {t.auth.register}
          </button>
        </div>
      </div>
    </div>
  );
};