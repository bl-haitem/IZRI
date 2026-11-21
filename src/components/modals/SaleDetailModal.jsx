import React from 'react';
import { X, CheckCircle2, Clock, AlertTriangle, FileText, Printer, ShieldCheck, MapPin, Calendar, CreditCard } from 'lucide-react';

export default function SaleDetailModal({ sale, onClose = () => {} }) {
  if (!sale) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-gray-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#191919] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E30613] flex items-center justify-center font-bold text-xs">
              VMS
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Détail de la Transaction</span>
                <span className="text-xs font-mono text-gray-400">{sale.id}</span>
              </h3>
              <p className="text-[11px] text-gray-400">Certificat de conformité & immatriculation VMS Industrie</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Status Banner */}
          <div className={`p-3 rounded-xl border flex items-center justify-between ${
            sale.registrationStatus === 'Verified'
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              : sale.registrationStatus === 'Pending'
              ? 'bg-amber-50/80 border-amber-200 text-amber-900'
              : sale.registrationStatus === 'Cancelled'
              ? 'bg-red-50/80 border-red-200 text-red-900'
              : 'bg-gray-50 border-gray-200 text-gray-800'
          }`}>
            <div className="flex items-center gap-2">
              {sale.registrationStatus === 'Verified' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {sale.registrationStatus === 'Pending' && <Clock className="w-4 h-4 text-amber-600" />}
              {sale.registrationStatus === 'Cancelled' && <AlertTriangle className="w-4 h-4 text-red-600" />}
              <span className="text-xs font-bold">
                Statut IZRI Mobile : {sale.registrationStatus === 'Verified' ? 'Propriétaire Vérifié & Certifié' : sale.registrationStatus}
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white shadow-2xs">
              {sale.registrationStatus}
            </span>
          </div>

          {/* Motorcycle & VIN Details */}
          <div className="bg-[#F9F9FB] rounded-xl p-3.5 border border-gray-200">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-2">
              Véhicule & Immatriculation
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-500 block text-[11px]">Modèle Moto</span>
                <span className="font-extrabold text-[#191919] text-sm">{sale.modelName}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Numéro de Châssis (VIN)</span>
                <span className="font-mono font-bold text-[#E30613] text-xs select-all bg-white px-2 py-1 rounded border border-gray-200 block truncate">
                  {sale.vin}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Montant de la Vente</span>
                <span className="font-mono font-bold text-[#191919] text-sm">
                  {sale.price.toLocaleString()} DZD
                </span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Canal de Vente</span>
                <span className="font-medium text-[#191919]">{sale.channel}</span>
              </div>
            </div>
          </div>

          {/* Dealership & Customer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#F9F9FB] rounded-xl p-3 border border-gray-200 text-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#E30613]" /> Concessionnaire
              </span>
              <div className="font-bold text-[#191919]">{sale.dealershipName}</div>
              <div className="text-[11px] text-gray-500">{sale.wilaya}</div>
              <div className="text-[11px] text-gray-400 mt-1">Date: {sale.saleDate}</div>
            </div>

            <div className="bg-[#F9F9FB] rounded-xl p-3 border border-gray-200 text-xs">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1.5 flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-[#E30613]" /> Paiement & Client
              </span>
              <div className="font-bold text-[#191919]">{sale.customerName || "Client Particulier"}</div>
              <div className="text-[11px] text-gray-500">{sale.paymentMethod}</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">Garantie VMS 2 ans activée</div>
            </div>
          </div>

          {/* Notes */}
          {sale.notes && (
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Observations Réseau</span>
              <p className="text-gray-700 italic">"{sale.notes}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-[#F9F9FB] flex items-center justify-between">
          <button
            onClick={() => alert("Impression du bon de livraison VMS et certificat de conformité lancée.")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-white transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer Bon de Sortie</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#191919] text-white text-xs font-bold hover:bg-black transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
