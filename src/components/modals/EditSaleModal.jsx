import React, { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

export default function EditSaleModal({ sale, onSave = () => {}, onClose = () => {} }) {
  if (!sale) return null;

  const [formData, setFormData] = useState({
    price: sale.price,
    channel: sale.channel,
    paymentMethod: sale.paymentMethod,
    registrationStatus: sale.registrationStatus,
    customerName: sale.customerName || '',
    notes: sale.notes || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...sale,
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#191919] text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Modifier la Vente</h3>
            <p className="text-[11px] text-gray-400 font-mono">{sale.id} · {sale.modelName}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="font-bold text-[#191919] block mb-1">Montant Vente (DZD)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs font-mono font-bold text-[#191919] focus:outline-none focus:border-[#E30613]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#191919] block mb-1">Canal de Vente</label>
              <select
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
              >
                <option value="Dealership Direct">Concessionnaire Direct</option>
                <option value="Showroom Walk-in">Showroom VMS</option>
                <option value="Online Booking">Réservation Digitale IZRI</option>
                <option value="Fleet B2B">Flotte Entreprise</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[#191919] block mb-1">Statut Enregistrement</label>
              <select
                value={formData.registrationStatus}
                onChange={(e) => setFormData({ ...formData, registrationStatus: e.target.value })}
                className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
              >
                <option value="Verified">Verified (Certifié)</option>
                <option value="Pending">Pending (En attente)</option>
                <option value="Unregistered">Unregistered (Non inscrit)</option>
                <option value="Cancelled">Cancelled (Annulé)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-[#191919] block mb-1">Mode de Paiement</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
            >
              <option value="Virement Bancaire (BEA)">Virement Bancaire (BEA)</option>
              <option value="Virement Bancaire (BADR)">Virement Bancaire (BADR)</option>
              <option value="Chèque Certifié (BNA)">Chèque Certifié (BNA)</option>
              <option value="Espèces au comptoir">Espèces au comptoir</option>
              <option value="Facilité Bancaire (CPA)">Facilité Bancaire (CPA)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-[#191919] block mb-1">Nom du Client</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
            />
          </div>

          <div>
            <label className="font-bold text-[#191919] block mb-1">Notes / Remarques</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#E30613] text-white text-xs font-bold hover:bg-[#C40510] shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Enregistrer Modifications</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
