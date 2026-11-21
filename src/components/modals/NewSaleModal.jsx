import React, { useState } from 'react';
import { X, Plus, Sparkles, Store } from 'lucide-react';
import { INITIAL_MOTORCYCLES, INITIAL_DEALERSHIPS } from '../../data/mockData';

export default function NewSaleModal({ 
  onAddSale = () => {}, 
  onClose = () => {},
  defaultDealershipId = null,
  lockDealership = false,
}) {
  const [modelId, setModelId] = useState(INITIAL_MOTORCYCLES[0].id);
  const [dealershipId, setDealershipId] = useState(defaultDealershipId || INITIAL_DEALERSHIPS[0].id);
  const [customerName, setCustomerName] = useState('');
  const [channel, setChannel] = useState(lockDealership ? 'Showroom Walk-in' : 'Dealership Direct');
  const [paymentMethod, setPaymentMethod] = useState('Virement Bancaire (BEA)');
  const [notes, setNotes] = useState('Livraison neuve sortie de stock avec carnet d\'entretien');

  const selectedModel = INITIAL_MOTORCYCLES.find(m => m.id === modelId) || INITIAL_MOTORCYCLES[0];
  const selectedDealer = INITIAL_DEALERSHIPS.find(d => d.id === dealershipId) || INITIAL_DEALERSHIPS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newSale = {
      id: `VMS-SL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      vin: `DZ-VMS-${selectedModel.name.replace(/\s+/g, '').slice(0, 3).toUpperCase()}-${randomSuffix}-DZ`,
      modelId: selectedModel.id,
      modelName: selectedModel.name,
      dealershipId: selectedDealer.id,
      dealershipName: selectedDealer.name,
      wilaya: selectedDealer.wilaya,
      price: selectedModel.priceDZD,
      saleDate: new Date().toISOString().split('T')[0],
      channel,
      paymentMethod,
      registrationStatus: 'Verified',
      customerName: customerName || 'Client Particulier',
      notes,
    };

    onAddSale(newSale);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#191919] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E30613] text-white flex items-center justify-center font-bold text-xs">
              +
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lockDealership ? "Nouvelle Vente au Comptoir Showroom" : "Enregistrer une Nouvelle Vente"}
              </h3>
              <p className="text-[11px] text-gray-400">Émission de certificat de vente VMS & liaison IZRI</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
          {/* Motorcycle Model */}
          <div>
            <label className="font-bold text-[#191919] block mb-1">Modèle de Moto VMS</label>
            <select
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs font-semibold text-[#191919] focus:outline-none focus:border-[#E30613] cursor-pointer"
            >
              {INITIAL_MOTORCYCLES.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.category}) — {m.priceDZD.toLocaleString()} DZD
                </option>
              ))}
            </select>
          </div>

          {/* Dealership */}
          <div>
            <label className="font-bold text-[#191919] block mb-1">
              Concessionnaire {lockDealership && "(Verrouillé pour ce Showroom)"}
            </label>
            {lockDealership ? (
              <div className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2 text-xs font-bold text-[#191919] flex items-center gap-2">
                <Store className="w-4 h-4 text-[#E30613]" />
                <span>{selectedDealer.name} ({selectedDealer.wilaya})</span>
              </div>
            ) : (
              <select
                value={dealershipId}
                onChange={(e) => setDealershipId(e.target.value)}
                className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613] cursor-pointer"
              >
                {INITIAL_DEALERSHIPS.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.wilaya})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#191919] block mb-1">Canal de Vente</label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613] cursor-pointer"
              >
                <option value="Showroom Walk-in">Showroom VMS (Comptoir)</option>
                <option value="Dealership Direct">Concessionnaire Direct</option>
                <option value="Online Booking">Réservation Digitale IZRI</option>
                <option value="Fleet B2B">Flotte Entreprise</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[#191919] block mb-1">Mode de Règlement</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613] cursor-pointer"
              >
                <option value="Virement Bancaire (BEA)">Virement Bancaire (BEA)</option>
                <option value="Virement Bancaire (BADR)">Virement Bancaire (BADR)</option>
                <option value="Chèque Certifié (BNA)">Chèque Certifié (BNA)</option>
                <option value="Espèces au comptoir">Espèces au comptoir</option>
                <option value="Facilité Bancaire (CPA)">Facilité Bancaire (CPA)</option>
              </select>
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="font-bold text-[#191919] block mb-1">Nom Complet du Client / Entreprise</label>
            <input
              type="text"
              required
              placeholder="Ex: Mourad Belkacem"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="font-bold text-[#191919] block mb-1">Notes & Spécificités de Vente</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-xs text-[#191919] focus:outline-none focus:border-[#E30613]"
            />
          </div>

          {/* Summary Box */}
          <div className="bg-red-50/60 rounded-xl p-3 border border-red-200/60 flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-500 block text-[11px]">Prix Public TTC VMS</span>
              <span className="font-extrabold text-[#E30613] font-mono text-base">
                {selectedModel.priceDZD.toLocaleString()} DZD
              </span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 block text-[11px]">Garantie Constructeur</span>
              <span className="font-bold text-[#191919]">24 Mois ou 20,000 km</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#E30613] text-white text-xs font-bold hover:bg-[#C40510] shadow-sm cursor-pointer"
            >
              Enregistrer & Émettre Facture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
