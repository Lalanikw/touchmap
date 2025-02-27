// components/BillDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

interface BillDetails {
  id: string;
  title: string;
  description: string;
  status: string;
  lastUpdated: string;
  summary: string;
}

interface BillDialogProps {
  bill: BillDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BillDialog: React.FC<BillDialogProps> = ({ bill, isOpen, onClose }) => {
  if (!bill) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-500">
            {bill.id} - {bill.title}
          </DialogTitle>
          <DialogDescription className="text-md font-bold text-blue-500">
            Last updated: {bill.lastUpdated}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
            <p className="text-gray-700">{bill.status}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {bill.summary}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {bill.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};