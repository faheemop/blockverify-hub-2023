
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { 
  CheckCircle, 
  ArrowRight, 
  Building, 
  ShieldCheck, 
  Coins, 
  Wallet, 
  Users, 
  Lock,
  CreditCard,
  Building2,
  Handshake
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/10 text-primary">
              ✅ Bitcoin Company Verification
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Turn Your Business into a Real Bitcoin Company
            </h1>
            <p className="text-lg mb-8 text-muted-foreground">
              Put your business directly on the Bitcoin blockchain through BlockStone.
              Fast, transparent, and reliable
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/verify">
                  <span>✅ Verify your business today!</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our verification process is simple, secure, and leverages the immutable nature of the Bitcoin blockchain
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-background p-6 rounded-2xl shadow-subtle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verify Your Bitcoin Wallet</h3>
              <p className="text-muted-foreground">
                Validate ownership of your Bitcoin wallet through OP_RETURN transactions.
              </p>
            </motion.div>

            <motion.div 
              className="bg-background p-6 rounded-2xl shadow-subtle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Use MultiSig for Secure Agreements</h3>
              <p className="text-muted-foreground">
                Implement MultiSig technology for secure and transparent agreements between parties.
              </p>
            </motion.div>

            <motion.div 
              className="bg-background p-6 rounded-2xl shadow-subtle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Leverage Bitcoin Without Selling It</h3>
              <p className="text-muted-foreground">
                Utilize your Bitcoin assets while maintaining full ownership.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose BlockSt.one Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose BlockStone?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers unique benefits for businesses looking to leverage their Bitcoin holdings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Your Bitcoin Stays Yours</h3>
                <p className="text-muted-foreground">
                  Maintain full ownership without selling. Your assets remain under your control at all times.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure & Transparent Transactions</h3>
                <p className="text-muted-foreground">
                  Our blockchain verification ensures only authorized transactions occur, providing peace of mind.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Unlock Liquidity Without Selling</h3>
                <p className="text-muted-foreground">
                  Use your Bitcoin as collateral to access liquidity while maintaining long-term investment strategy.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Build Trust & Credibility</h3>
                <p className="text-muted-foreground">
                  Prove your business Bitcoin ownership with a verifiable blockchain record that enhances your credibility.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Ways to Use Bitcoin Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Smart Ways to Use Bitcoin Beyond Holding</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leverage your Bitcoin assets strategically for business growth and security
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-subtle">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Bitcoin as Loan Collateral</h3>
                <p className="text-muted-foreground">
                  Use your verified Bitcoin holdings as collateral for business loans without selling your assets.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-subtle">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Business Payments</h3>
                <p className="text-muted-foreground">
                  Enable secure and verified payment channels for your business operations leveraging blockchain technology.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-subtle">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Establish Trust with Partners</h3>
                <p className="text-muted-foreground">
                  Demonstrate financial capability and commitment to business relationships through verified Bitcoin holdings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about our Bitcoin verification service
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does the verification process work?</AccordionTrigger>
                <AccordionContent>
                  Our verification process uses Bitcoin's OP_RETURN feature to create a permanent record on the blockchain. 
                  You'll make a small Bitcoin transaction that includes your business information, which we then verify and 
                  record. This creates an immutable proof of ownership.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Is my Bitcoin safe during this process?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. You maintain complete control of your Bitcoin at all times. The verification requires only 
                  a small transaction fee, and your funds remain in your wallet under your control.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What are the benefits of verification for my business?</AccordionTrigger>
                <AccordionContent>
                  Verification provides transparent proof of Bitcoin ownership, enhances your business credibility, 
                  enables you to use Bitcoin as collateral without selling, and opens opportunities for secure 
                  business transactions and partnerships.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How long does the verification process take?</AccordionTrigger>
                <AccordionContent>
                  Once your transaction is confirmed on the blockchain (typically within 10-60 minutes), our system 
                  will verify your information. The complete process usually takes less than 24 hours.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I verify multiple Bitcoin wallets for my business?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can verify multiple wallets associated with your business. Each verification creates a 
                  separate record on the blockchain, providing transparent proof of all your business Bitcoin holdings.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Start Leveraging Your Bitcoin Today</h2>
            <p className="text-muted-foreground mb-8">
              Join the companies leveraging blockchain technology for transparent and secure business verification.
            </p>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/verify">
                <span>Get Verified Now</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
