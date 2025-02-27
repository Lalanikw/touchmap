// services/stateService.ts
import * as XLSX from 'xlsx';
import { StateDetails } from '../types';

interface BillDetails {
  id: string;
  title: string;
  description: string;
  status: string;
  lastUpdated: string;
  summary: string;
}

const S3_FILE_URL = 'https://touchmap.s3.us-east-2.amazonaws.com/LawByState.xlsx';

let stateDataCache: Map<string, StateDetails> | null = null;
let billDataCache: Map<string, BillDetails> | null = null;

async function initializeStateData(): Promise<Map<string, StateDetails>> {
  if (stateDataCache) {
    return stateDataCache;
  }

  try {
    const response = await fetch(S3_FILE_URL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': '*/*',
        'Cache-Control': 'no-cache'
      }});

    if (!response.ok) {
      console.error('S3 response error:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
      type: 'array',
      cellDates: true,
      cellText: false
    });

    console.log('Available sheets:', workbook.SheetNames); // Debug log

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    console.log('First row of data:', jsonData[0]); // Debug log

    const stateMap = new Map<string, StateDetails>();

    jsonData.forEach((row: any) => {
      const stateDetails: StateDetails = {
        name: row.StateName || row.State || '',
        laws: row.Laws || row.Column1 || '',
        Security_Exception: row.Security_Exception || row.Exception || row.Column2 || '',
        Litigation_Risk: row.Litigation_Risk || row.Risk || row.Column3 || '',
        Notes: row.Details || row.Notes || row.Column4 || '',
        Security: row.Security || row.Column5 || '',
      };

      if (stateDetails.name) {
        const normalizedName = stateDetails.name.toUpperCase().trim();
        stateMap.set(stateDetails.name.toUpperCase(), stateDetails);

        // Log successful mapping
        console.log(`Mapped state: ${normalizedName}`);
      } else {
        console.warn('Row missing state name:', row);
      }
    });

    console.log('Total states mapped:', stateMap.size); // Debug log
    console.log('Available state names:', Array.from(stateMap.keys())); // debug log

    stateDataCache = stateMap;
    return stateMap;
  } catch (error) {
    console.error('Error initializing state data:', error);
    throw error;
  }
}

async function initializeBillData(): Promise<Map<string, BillDetails>> {
  if (billDataCache) {
    return billDataCache;
  }

  try {
    const response = await fetch(S3_FILE_URL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': '*/*',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      console.error('S3 response error:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
      type: 'array',
      cellDates: true,
      cellText: false
    });

    // Look for 'Bills' sheet
    const billsSheet = workbook.Sheets['Bills'];
    if (!billsSheet) {
      console.error('Bills sheet not found. Available sheets:', workbook.SheetNames);
      throw new Error('Bills sheet not found in Excel file');
    }

    const jsonData = XLSX.utils.sheet_to_json(billsSheet);
    console.log('First row of bills data:', jsonData[0]); // Debug log

    const billMap = new Map<string, BillDetails>();

    jsonData.forEach((row: any) => {

      //Normalize the bill ID format
      let billId = row.BillID || '';
      // Remove "BILL" prefix if it exists
      billId = billId.replace(/^BILL\s+/, '').trim();

      const billDetails: BillDetails = {
        id: billId,
        title: row.Title || '',
        description: row.Description || '',
        status: row.Status || '',
        lastUpdated: row.LastUpdated || '',
        summary: row.Summary || '',
      };

      if (billDetails.id) {
        billMap.set(billDetails.id, billDetails);
        console.log(`Mapped bill: ${billDetails.id}`); // Debug log
      } else {
        console.warn('Row missing bill ID:', row);
      }
    });

    console.log('Total bills mapped:', billMap.size); // Debug log
    console.log('Available bill IDs:', Array.from(billMap.keys())); // Debug log

    billDataCache = billMap;
    return billMap;
  } catch (error) {
    console.error('Error initializing bill data:', error);
    throw error;
  }
}

export async function fetchStateDetails(stateName: string): Promise<StateDetails> {
  try {
    if (!stateName) {
      throw new Error('State name is required');
    }

    const normalizedStateName = stateName.toUpperCase().trim();
    console.log('Fetching details for state:', normalizedStateName); // Debug log

    const stateData = await initializeStateData();
    const stateDetails = stateData.get(normalizedStateName);

    if (!stateDetails) {
      console.log('Available states:', Array.from(stateData.keys())); // Debug log
      throw new Error(`No data found for state: ${stateName}`);
    }

    return stateDetails;
  } catch (error) {
    console.error(`Error fetching details for state ${stateName}:`, error);
    throw error;
  }
}

export async function fetchBillDetails(billId: string): Promise<BillDetails> {
  try {
    if (!billId) {
      throw new Error('Bill ID is required');
    }
    
    // Remove "BILL" prefix if it exists in the incoming ID
    const normalizedBillId = billId.replace(/^BILL\s+/, '').trim();
    console.log('Fetching details for bill:', normalizedBillId);

    const billData = await initializeBillData();
    const billDetails = billData.get(normalizedBillId);

    if (!billDetails) {
      console.log('Available bills:', Array.from(billData.keys())); // Debug log
      throw new Error(`No data found for bill: ${billId}`);
    }

    return billDetails;
  } catch (error) {
    console.error(`Error fetching details for bill ${billId}:`, error);
    throw error;
  }
}

export function clearStateDataCache(): void {
  stateDataCache = null;
  billDataCache = null;
}