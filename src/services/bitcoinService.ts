
// Primary blockchain explorer API (Blockcypher)
const BLOCKCYPHER_API = 'https://api.blockcypher.com/v1/btc/main';
const BLOCKCYPHER_TOKEN = '9f78f0aedf3a4c0b8641f1bf63fb1d30';

// Secondary blockchain explorer API (Blockstream)
const BLOCKSTREAM_API = 'https://blockstream.info/api';

// Get transaction details using Blockcypher API (primary)
export const getTransactionDetails = async (txId: string) => {
  try {
    const response = await fetch(`${BLOCKCYPHER_API}/txs/${txId}?token=${BLOCKCYPHER_TOKEN}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch transaction details from Blockcypher: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching transaction details from Blockcypher:', error);
    // Try fallback to Blockstream if primary API fails
    return getTransactionDetailsFromBlockstream(txId);
  }
};

// Get transaction details using Blockstream API (fallback)
export const getTransactionDetailsFromBlockstream = async (txId: string) => {
  try {
    const response = await fetch(`${BLOCKSTREAM_API}/tx/${txId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch transaction details from Blockstream: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching transaction details from Blockstream:', error);
    throw error;
  }
};

// Verify OP_RETURN data in a transaction
export const verifyOpReturn = async (txId: string, expectedData: string): Promise<boolean> => {
  try {
    // First try Blockcypher API (primary)
    try {
      const txBlockcypher = await getTransactionDetails(txId);
      
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
    } catch (blockcypherError) {
      console.log('Blockcypher verification failed, trying Blockstream...', blockcypherError);
      // If Blockcypher fails, we continue to try Blockstream
    }

    // If we reach here, try with Blockstream API
    const tx = await getTransactionDetailsFromBlockstream(txId);
    
    // Look for OP_RETURN outputs in Blockstream format
    if (tx && tx.vout) {
      for (const output of tx.vout) {
        if (
          output.scriptpubkey_type === 'op_return' && 
          output.scriptpubkey_asm.includes('OP_RETURN') && 
          output.scriptpubkey_asm.includes(expectedData)
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
    const txDetails = await getTransactionDetails(txId);
    return txDetails.confirmations || 0;
  } catch (error) {
    console.error('Error checking transaction confirmations:', error);
    return 0;
  }
};
