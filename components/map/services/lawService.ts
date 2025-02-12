// services/lawService.ts
import * as XLSX from 'xlsx';

interface StateLaw {
  State: string;
  Laws: string;
}

let lawsCache: StateLaw[] | null = null;

const S3_URL = 'https://touchmap.s3.us-east-2.amazonaws.com/LawByState.xlsx';

export const fetchStateLaws = async (stateAbbr: string): Promise<string | null> => {
  try {
    // If cache doesn't exist, fetch and parse the Excel file
    if (!lawsCache) {
      // Replace with your S3 URL when deployed
      const response = await fetch(S3_URL);
      const arrayBuffer = await response.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer, {
        type: 'array',
        cellDates: true,
      });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      lawsCache = XLSX.utils.sheet_to_json(worksheet) as StateLaw[];
    }

    // Find the matching state law
    const stateLaw = lawsCache.find(law =>
      law.State.toLowerCase() === stateAbbr.toLowerCase() ||
      law.State.toLowerCase().includes(stateAbbr.toLowerCase())
    );

    return stateLaw ? stateLaw.Laws : null;
  } catch (error) {
    console.error('Error fetching state laws:', error);
    return null;
  }
}