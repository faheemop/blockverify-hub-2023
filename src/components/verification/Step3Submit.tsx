
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { Link } from '@/components/ui/link';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CheckCircle, ExternalLink } from 'lucide-react';

interface Step3SubmitProps {
  onSubmit: (txId: string) => void;
}

const formSchema = z.object({
  txId: z.string().min(64, { message: 'Transaction ID must be 64 characters' }).max(64, { message: 'Transaction ID must be 64 characters' }),
});

export function Step3Submit({ onSubmit }: Step3SubmitProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      txId: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.txId);
  };
  
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Submit Transaction Proof
        </CardTitle>
        <CardDescription>
          Enter the transaction ID (TXID) of your Bitcoin payment
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="txId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction ID (TXID)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. 6a95d3f2a50c4c9addd6311d45af13ba10bca8e9f4afa2e3bb63bf8d1c611d14" 
                      {...field} 
                      className="font-mono"
                    />
                  </FormControl>
                  <FormDescription>
                    The 64-character transaction ID from your Bitcoin transaction
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>You can find the TXID in your wallet or on a</span>
              <a 
                href="https://mempool.space/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:underline"
              >
                blockchain explorer
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            
            <div className="bg-secondary p-4 rounded-lg text-sm">
              <p className="font-medium mb-2">What happens next?</p>
              <p className="text-muted-foreground">
                After submitting, our team will verify your transaction on the Bitcoin blockchain. 
                Once confirmed, your business will receive a verification badge and a dedicated 
                verification page to share with your customers.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button type="submit">
              Submit Transaction ID
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  );
}
