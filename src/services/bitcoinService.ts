
// Primary blockchain explorer API (Blockcypher)
const BLOCKCYPHER_API = 'https://api.blockcypher.com/v1/btc/main';
const BLOCKCYPHER_TOKEN = '9f78f0aedf3a4c0b8641f1bf63fb1d30';

// Secondary blockchain explorer API (Blockstream)
const BLOCKSTREAM_API = 'https://blockstream.info/api';

// Get transaction details using Blockcypher API (primary)
export const getTransactionDetails = async (txId: string) => {
  try {
    console.log(`Fetching transaction ${txId} from BlockCypher...`);
    const response = await fetch(`${BLOCKCYPHER_API}/txs/${txId}?token=${BLOCKCYPHER_TOKEN}`);
    
    if (!response.ok) {
      console.error(`BlockCypher API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch transaction details from Blockcypher: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('BlockCypher transaction data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching transaction details from Blockcypher:', error);
    // Don't fall back to Blockstream, just throw the error
    throw error;
  }
};

// Get transaction details using Blockstream API (only used if specifically requested)
export const getTransactionDetailsFromBlockstream = async (txId: string) => {
  try {
    console.log(`Fetching transaction ${txId} from Blockstream...`);
    const response = await fetch(`${BLOCKSTREAM_API}/tx/${txId}`);
    
    if (!response.ok) {
      console.error(`Blockstream API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch transaction details from Blockstream: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Blockstream transaction data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching transaction details from Blockstream:', error);
    throw error;
  }
};

// Verify OP_RETURN data in a transaction
export const verifyOpReturn = async (txId: string, expectedData: string): Promise<boolean> => {
  try {
    // Only use BlockCypher API now
    console.log(`Verifying OP_RETURN for transaction ${txId}, expecting: ${expectedData}`);
    const txBlockcypher = await getTransactionDetails(txId);
    
    // Look for OP_RETURN outputs in Blockcypher format
    if (txBlockcypher && txBlockcypher.outputs) {
      for (const output of txBlockcypher.outputs) {
        if (
          output.script_type === 'null-data' && 
          output.data_hex && 
          hexToAscii(output.data_hex).includes(expectedData)
        ) {
          console.log('OP_RETURN verification succeeded with BlockCypher');
          return true;
        }
      }
    }
    
    console.log('OP_RETURN verification failed: expected data not found');
    return false;
  } catch (error) {
    console.error('Error verifying OP_RETURN:', error);
    return false; // Return false instead of throwing, so verification can continue even if blockchain API fails
  }
};

// Helper function to convert hex to ASCII
function hexToAscii(hex: string): string {
  let ascii = '';
  for (let i = 0; i < hex.length; i += 2) {
    ascii += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return ascii;
}

// Get Bitcoin address details (balance, transactions)
export const getAddressDetails = async (address: string) => {
  try {
    const response = await fetch(`${BLOCKCYPHER_API}/addrs/${address}?token=${BLOCKCYPHER_TOKEN}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch address details: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching address details:', error);
    throw error;
  }
};

// Utility function to check if a Bitcoin transaction has been confirmed
export const checkTransactionConfirmations = async (txId: string): Promise<number> => {
  try {
    const txDetails = await getTransactionDetails(txId);
    return txDetails.confirmations || 0;
  } catch (error) {
    console.error('Error checking transaction confirmations:', error);
    return 0;
  }
};
