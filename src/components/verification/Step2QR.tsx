
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { QrCode, Copy, ArrowRight, Bitcoin } from 'lucide-react';
import { toast } from 'sonner';

interface Step2QRProps {
  bitcoinAddress: string;
  opReturnData: string;
  onProceed: () => void;
}

export function Step2QR({ bitcoinAddress, opReturnData, onProceed }: Step2QRProps) {
  const [qrUrl, setQrUrl] = useState<string>('');
  
  useEffect(() => {
    // Generate QR code URL for the Bitcoin address
    const qrCodeData = encodeURIComponent(`bitcoin:${bitcoinAddress}?amount=0.00001`);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrCodeData}&margin=10`);
  }, [bitcoinAddress]);
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    toast.success('Bitcoin address copied to clipboard');
  };
  
  const handleCopyOpReturnData = () => {
    navigator.clipboard.writeText(opReturnData);
    toast.success('OP_RETURN data copied to clipboard');
  };
  
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bitcoin className="h-5 w-5 mr-2" />
          Bitcoin Payment
        </CardTitle>
        <CardDescription>
          Send 1000 satoshis (0.00001 BTC) with the required OP_RETURN data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              {qrUrl && (
                <img 
                  src={qrUrl} 
                  alt="Bitcoin QR Code" 
                  className="w-48 h-48 bg-white p-2 rounded-lg shadow-subtle"
                />
              )}
            </motion.div>
            <div className="text-sm text-center text-muted-foreground">
              Scan this QR code with your Bitcoin wallet
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Bitcoin Address</label>
              <div className="flex items-center">
                <code className="flex-1 p-2 bg-secondary rounded text-sm overflow-x-auto">
                  {bitcoinAddress}
                </code>
                <Button variant="ghost" size="sm" onClick={handleCopyAddress} className="ml-2">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block">OP_RETURN Data</label>
              <div className="flex items-center">
                <code className="flex-1 p-2 bg-secondary rounded text-sm overflow-x-auto">
                  {opReturnData}
                </code>
                <Button variant="ghost" size="sm" onClick={handleCopyOpReturnData} className="ml-2">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-secondary/50 p-3 rounded-lg">
              <div className="font-medium text-sm mb-1">Amount to send:</div>
              <div className="text-xl font-bold">1000 satoshis (0.00001 BTC)</div>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary p-4 rounded-lg">
          <h3 className="font-medium mb-2">Instructions</h3>
          <ol className="text-sm text-muted-foreground space-y-2 ml-4 list-decimal">
            <li>Send <strong>exactly 1000 satoshis</strong> (0.00001 BTC) to the above address</li>
            <li>Include the OP_RETURN data in your transaction</li>
            <li>Use a wallet that supports adding OP_RETURN messages (like Electrum)</li>
            <li>After sending, click "Continue" and submit your transaction ID</li>
          </ol>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        <Button onClick={onProceed} className="flex items-center">
          <span>I've made the payment</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
}
