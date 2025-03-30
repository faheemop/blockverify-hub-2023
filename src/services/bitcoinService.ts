
// Primary blockchain explorer API (Blockstream)
const BLOCKCHAIN_API = 'https://blockstream.info/api';

// Secondary blockchain explorer API (Blockcypher)
const BLOCKCYPHER_API = 'https://api.blockcypher.com/v1/btc/main';
const BLOCKCYPHER_TOKEN = '9f78f0aedf3a4c0b8641f1bf63fb1d30';

// Get transaction details using Blockstream API (primary)
export const getTransactionDetails = async (txId: string) => {
  try {
    const response = await fetch(`${BLOCKCHAIN_API}/tx/${txId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch transaction details: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching transaction details from Blockstream:', error);
    // Try fallback to Blockcypher if primary API fails
    return getTransactionDetailsFromBlockcypher(txId);
  }
};

// Get transaction details using Blockcypher API (fallback)
export const getTransactionDetailsFromBlockcypher = async (txId: string) => {
  try {
    const response = await fetch(`${BLOCKCYPHER_API}/txs/${txId}?token=${BLOCKCYPHER_TOKEN}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch transaction details from Blockcypher: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching transaction details from Blockcypher:', error);
    throw error;
  }
};

// Verify OP_RETURN data in a transaction
export const verifyOpReturn = async (txId: string, expectedData: string): Promise<boolean> => {
  try {
    // First try Blockstream API
    try {
      const tx = await getTransactionDetails(txId);
      
      // Look for OP_RETURN outputs in Blockstream format
      if (tx && tx.vout) {
        for (const output of tx.vout) {
          if (
            output.scriptpubkey_type === 'op_return' && 
            output.scriptpubkey_asm.includes(expectedData)
          ) {
            return true;
          }
        }
      }
    } catch (blockstreamError) {
      console.log('Blockstream verification failed, trying Blockcypher...', blockstreamError);
      // If Blockstream fails, we continue to try Blockcypher
    }

    // If we reach here, try with Blockcypher API
    const txBlockcypher = await getTransactionDetailsFromBlockcypher(txId);
    
    // Look for OP_RETURN outputs in Blockcypher format
    if (txBlockcypher && txBlockcypher.outputs) {
      for (const output of txBlockcypher.outputs) {
        if (
          output.script_type === 'null-data' && 
          output.data_hex && 
          hexToAscii(output.data_hex).includes(expectedData)
        ) {
          return true;
        }
      }
    }
    
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
    const txDetails = await getTransactionDetailsFromBlockcypher(txId);
    return txDetails.confirmations || 0;
  } catch (error) {
    console.error('Error checking transaction confirmations:', error);
    return 0;
  }
};
