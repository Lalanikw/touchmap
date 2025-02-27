// components/map/SidePanel.tsx
'use client'

import React, {useState} from 'react';
import { SidePanelProps } from './types';
import { XCircle } from 'lucide-react';
import { BillDialog } from '../BillDialog';
import { LawsSection } from '../LawsSection';
import { fetchBillDetails } from './services/stateService';

interface BillDetails {
  id: string;
  title: string;
  description: string;
  status: string;
  lastUpdated: string;
  summary: string; 
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, stateInfo, stateDetails, onClose }) => {
  const [selectedBill, setSelectedBill] = useState<BillDetails | null>(null);
  const [isBillDialogOpen, setIsBillDialogOpen] = useState(false);

  const handleBillClick = async (billId: string) => {
    try {
      const billDetails = await fetchBillDetails(billId);
      setSelectedBill(billDetails);
      setIsBillDialogOpen(true);
    } catch (error) {
      console.error('Error fetching bill details:', error);
      // You might want to show an error toast here
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-80 z-50`}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 bg-white border-b p-4 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-blue-500">{stateInfo?.name}</h2>
              <p className="text-gray-600 text-sm">State Information</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <XCircle className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100vh-5rem)] overflow-y-auto px-4 pb-20">
          {stateDetails ? (
            <div className="space-y-4 py-4">
              <LawsSection 
                laws={stateDetails.laws} 
                onBillClick={handleBillClick}
              />

              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2 text-md">Security Exception</h3>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
                  {stateDetails.Security_Exception}
                </p>
              </section>

              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2 text-md">Litigation Risk</h3>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
                  {stateDetails.Litigation_Risk}
                </p>
              </section>

              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2 text-md">Notes</h3>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
                  {stateDetails.Notes}
                </p>
              </section>

              <section className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2 text-md">Security</h3>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
                  {stateDetails.Security}
                </p>
              </section>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      </div>

    <BillDialog
        bill={selectedBill}
        isOpen={isBillDialogOpen}
        onClose={() => setIsBillDialogOpen(false)}
      />
    </>
  );
};

export default SidePanel;