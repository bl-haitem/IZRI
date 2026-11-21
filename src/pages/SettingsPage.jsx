import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Bell, 
  Database, 
  RotateCcw, 
  Save, 
  Building2, 
  Smartphone,
  CheckCircle2
} from 'lucide-react';

export default function SettingsPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [settings, setSettings] = useState({
    companyName: "VMS Industrie Algérie",
    factoryLocation: "Zone Industrielle Taharacht, Akbou, Béjaïa",
    currency: "DZD (Dinar Algérien)",
    defaultAlertStockThreshold: 50,
    smsAlertEnabled: true,
    emailNotificationEnabled: true,
    autoDemandRecalculation: true,
    izriAppSyncIntervalHours: 6,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDemo = () => {
    if (window.confirm("Réinitialiser les données de démonstration aux valeurs d'usine ?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Toast Alert */}
      {savedSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191919] text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">Paramètres de la plateforme VMS IZRI sauvegardés.</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-card flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-[#191919]">
            Paramètres
          </h2>
          <p className="text-xs text-[#777777]">
            Configuration du système
          </p>
        </div>

        <button
          onClick={handleResetDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
          title="Réinitialise le localStorage"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Réinitialiser Démo</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Company & Plant Details */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-card space-y-3.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#191919] border-b border-gray-100 pb-2">
            <Building2 className="w-4 h-4 text-[#E30613]" />
            <span>Informations Constructeur & Usine d'Assemblage</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#191919] block mb-1">Raison Sociale</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-[#E30613] font-semibold text-[#191919]"
              />
            </div>
            <div>
              <label className="font-bold text-[#191919] block mb-1">Localisation Usine Principale</label>
              <input
                type="text"
                value={settings.factoryLocation}
                onChange={(e) => setSettings({ ...settings, factoryLocation: e.target.value })}
                className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-[#E30613] text-[#191919]"
              />
            </div>
          </div>
        </div>

        {/* Stock & Operational Rules */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-card space-y-3.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#191919] border-b border-gray-100 pb-2">
            <ShieldCheck className="w-4 h-4 text-[#E30613]" />
            <span>Règles Opérationnelles & Seuils d'Alerte Logistique</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#191919] block mb-1">
                Seuil d'Alerte Rupture Modèle (Unités minimales par modèle)
              </label>
              <input
                type="number"
                value={settings.defaultAlertStockThreshold}
                onChange={(e) => setSettings({ ...settings, defaultAlertStockThreshold: Number(e.target.value) })}
                className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 font-mono font-bold text-[#191919] focus:outline-none focus:border-[#E30613]"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">Déclenche un badge rouge sur le tableau de bord</span>
            </div>

            <div>
              <label className="font-bold text-[#191919] block mb-1">
                Fréquence de Synchronisation Données Mobiles IZRI
              </label>
              <select
                value={settings.izriAppSyncIntervalHours}
                onChange={(e) => setSettings({ ...settings, izriAppSyncIntervalHours: Number(e.target.value) })}
                className="w-full bg-[#F5F5F7] border border-gray-200 rounded-lg p-2 text-[#191919] focus:outline-none focus:border-[#E30613]"
              >
                <option value={1}>Toutes les heures (Temps réel)</option>
                <option value={6}>Toutes les 6 heures (Recommandé)</option>
                <option value={12}>Toutes les 12 heures</option>
                <option value={24}>Une fois par jour</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoDemandRecalculation}
                onChange={(e) => setSettings({ ...settings, autoDemandRecalculation: e.target.checked })}
                className="w-4 h-4 text-[#E30613] rounded border-gray-300 focus:ring-[#E30613]"
              />
              <span className="font-semibold text-[#191919]">Recalcul automatique de la moyenne mobile de demande sur 14 jours</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smsAlertEnabled}
                onChange={(e) => setSettings({ ...settings, smsAlertEnabled: e.target.checked })}
                className="w-4 h-4 text-[#E30613] rounded border-gray-300 focus:ring-[#E30613]"
              />
              <span className="font-semibold text-[#191919]">Alertes SMS automatiques aux gérants de concession en cas de stock &lt; 20 unités</span>
            </label>
          </div>
        </div>

        {/* Submit Save */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#E30613] text-white text-xs font-bold hover:bg-[#C40510] shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer les Paramètres</span>
          </button>
        </div>
      </form>
    </div>
  );
}
