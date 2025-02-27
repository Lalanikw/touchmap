// components/LawsSection.tsx
import React from 'react';
import { FileText } from 'lucide-react';

interface LawsSectionProps {
  laws: string;
  onBillClick: (billId: string) => void;
}

export const LawsSection: React.FC<LawsSectionProps> = ({ laws, onBillClick }) => {
  const extractBillsAndPDFs = (text: string) => {
    // Pattern for Bills: [Bill ABC 123]
    const billPattern = /\[BILL\s+[A-Z]+\s+\d+\]/g;
    
    //Pattern for PDFs: [pdf: some Title|https://example.com/document.pdf]
    const pdfPattern = /\[PDF:\s+([^|]+)\|([^[\]]+)\]/g;

    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    // Create a combined regex that matches both patterns
    const combinedPattern = new RegExp(`${billPattern.source}|${pdfPattern.source}`, 'g');
    
    const matches = Array.from(text.matchAll(combinedPattern));
    
    matches.forEach((match, index) => {
      const fullMatch = match[0];
      const startIndex = match.index!;
      
      // Add text before the bill reference
      if (startIndex > lastIndex) {
        parts.push(text.slice(lastIndex, startIndex));
      }

      //Check if it's a bill or PDF
      if (fullMatch.startsWith("[BILL")) {
      
        // Extract the bill ID by removing brackets and trimming
        const billId = fullMatch.slice(1, -1).trim();
      
        // Add the clickable bill reference wrapped in a div for vertical layout
        parts.push(
          <div key={`bill-${index}`} className="mb-2">
            <button
              onClick={() => onBillClick(billId)}
              className="text-blue-500 hover:text-blue-700 hover:underline font-medium"
            >
              {fullMatch}
            </button>
          </div>
        );
      } else if (fullMatch.startsWith("[PDF:")) {
        //It's a PDF link
        //Extract title and URL
        const pdfMatch = fullMatch.match(/\[PDF:\s+([^|]+)\|([^[\]]+)\]/);
        if (pdfMatch) {
          const title = pdfMatch[1].trim();
          const url = pdfMatch[2].trim();

      parts.push(
            <div key={`pdf-${index}`} className="mb-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:text-blue-700 hover:underline font-medium"
              >
                <FileText className="h-4 w-4 mr-1" />
                <span>PDF: {title}</span>
              </a>
            </div>
          );
        }
      }
      
      lastIndex = startIndex + fullMatch.length;
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    
    return parts;
  };

  return (
    <section className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-2 text-md">Laws</h3>
      <div className="text-gray-700 leading-relaxed text-sm flex flex-col">
        {extractBillsAndPDFs(laws)}
      </div>
    </section>
  );
};