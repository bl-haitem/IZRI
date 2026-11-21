import React, { useState } from 'react';
import { X, Building2, MapPin, Phone, Mail, Package, ShieldCheck, Power, Save } from 'lucide-react';

export default function DealershipModal({ dealership, onUpdate = () => {}, onClose = () => {} }) {
  if (!dealership) return null;

  const [formData, setFormData] = useState({
    name: dealership.name,
    manager: dealership.manager,
    phone: dealership.phone,
    email: dealership.email || '',
    address: dealership.address,
    status: dealership.status,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...dealership,
      ...formData,
    });
  };

  const toggleStatus = () => {
    const nextStatus = formData.status === 'Actif' ? 'Inactif' : 'Actif';
    setFormData({ ...formData, status: nextStatus });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#191919] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E30613] text-white flex items-center justify-center font-bold text-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{dealership.name}</h3>
              <p className="text-[11px] text-gray-400">{dealership.code} · Wilaya {dealership.wilaya}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#F9F9FB] rounded-xl p-2.5 border border-gray-200">
              <span className="text-[10px] text-gray-500 block uppercase font-bold">Motos Livrées</span>
              <span className="text-base font-black text-[#191919] font-mono">{dealership.sales}</span>
            </div>
            <div className="bg-[#F9F9FB] rounded-xl p-2.5 border border-gray-200">
              <span className="text-[10px] text-gray-500 block uppercase font-bold">Stock Actuel</span>
              <span className="text-base font-black text-[#E30613] font-mono">{dealership.stock}</span>
            </div>
            <div className="bg-[#F9F9FB] rounded-xl p-2.5 border border-gray-200">
              <span className="text-[10px] text-gray-500 block uppercase font-bold">Taux IZRI App</span>
              <span className="text-base font-black text-emerald-700 font-mono">{dealership.registrationRate}%</span>
            </div>
          </div>

          <div>
            <label className="font-bold text-[#191919] block mb-1">Raison Sociale Concession</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs font-semibold text-[#191919] focus:outline-none focus:border-[#E30613]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#191919] block mb-1">Directeur / Gérant</label>
              <input
                type="text"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
                required
              />
            </div>
            <div>
              <label className="font-bold text-[#191919] block mb-1">Téléphone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs font-mono text-[#191919] focus:outline-none focus:border-[#E30613]"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#191919] block mb-1">Adresse Complète du Showroom</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
              required
            />
          </div>

          {/* Status Toggle Button */}
          <div className="p-3 rounded-xl border border-gray-200 bg-[#F9F9FB] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#191919] block text-xs">Statut d'Accréditation Réseau</span>
              <span className="text-[11px] text-gray-500">
                {formData.status === 'Actif' ? 'Concessionnaire autorisé aux commandes d\'usine' : 'Accès temporairement suspendu'}
              </span>
            </div>
            <button
              type="button"
              onClick={toggleStatus}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                formData.status === 'Actif'
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{formData.status}</span>
            </button>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            >
              Fermer
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#191919] text-white text-xs font-bold hover:bg-black shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Enregistrer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
