import React, { useState } from 'react';
import { AlertTriangle, X, ShieldAlert } from 'lucide-react';

export default function CancelSaleModal({ sale, onConfirm = () => {}, onClose = () => {} }) {
  if (!sale) return null;

  const [reason, setReason] = useState('Désistement client avant délivrance de carte grise');

  const handleConfirm = () => {
    onConfirm(sale.id, reason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full border border-gray-200 shadow-2xl overflow-hidden flex flex-col">
        <div className="bg-red-50 border-b border-red-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[#E30613]">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h3 className="text-sm font-bold text-[#191919]">Confirmer l'Annulation de la Vente</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3 text-xs">
          <p className="text-gray-600 leading-relaxed">
            Êtes-vous certain de vouloir annuler la vente <strong className="text-[#191919]">{sale.id}</strong> ({sale.modelName}) d'un montant de <strong className="text-[#191919]">{sale.price.toLocaleString()} DZD</strong> ?
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 text-[11px] space-y-1">
            <span className="font-bold block">Conséquences de l'annulation :</span>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>Le numéro de châssis (VIN: {sale.vin}) sera réintégré au stock de la concession.</li>
              <li>Le certificat IZRI Mobile sera révoqué.</li>
            </ul>
          </div>

          <div>
            <label className="font-bold text-[#191919] block mb-1">Motif réglementaire d'annulation :</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
            >
              <option value="Désistement client avant délivrance de carte grise">Désistement client avant carte grise</option>
              <option value="Refus de dossier de crédit bancaire">Refus de dossier de crédit bancaire</option>
              <option value="Erreur de saisie concessionnaire sur le numéro VIN">Erreur de saisie concessionnaire sur VIN</option>
              <option value="Défaut de conformité ou rappel constructeur">Défaut de conformité ou rappel constructeur</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-white"
          >
            Conserver la vente
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1.5 rounded-lg bg-[#E30613] text-white text-xs font-bold hover:bg-[#C40510] shadow-sm"
          >
            Confirmer l'Annulation
          </button>
        </div>
      </div>
    </div>
  );
}
