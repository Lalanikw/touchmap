// services/stateService.ts
import * as XLSX from 'xlsx';
import { StateDetails } from '../types';

const S3_FILE_URL = 'https://touchmap.s3.us-east-2.amazonaws.com/LawByState.xlsx';

let stateDataCache: Map<string, StateDetails> | null = null;

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
    Security_Exception: row.Security_Exception || row.Exception || row.Column2 || '',  // Updated to match interface
    Litigation_Risk: row.Litigation_Risk || row.Risk || row.Column3 || '',            // Updated to match interface
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
      }});

    console.log('Total states mapped:', stateMap.size); // Debug log
    console.log('Available state names:', Array.from(stateMap.keys())); // debug log

    stateDataCache = stateMap;
    return stateMap;
  } catch (error) {
    console.error('Error initializing state data:', error);
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
  }}

export function clearStateDataCache(): void {
  stateDataCache = null;
}