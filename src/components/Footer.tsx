import { Shield, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-trust-accent" />
              <span className="text-2xl font-bold">Legacy Ledger</span>
            </div>
            <p className="text-blue-soft mb-6 leading-relaxed max-w-md">
              Helping families discover and manage financial accounts with dignity, security, and peace of mind 
              during life's most important transitions.
            </p>
            <div className="text-blue-soft text-sm">
              <p className="mb-2">🏛️ Backed by estate attorneys & fintech experts</p>
              <p>🔒 Bank-level security & HIPAA compliance</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-blue-soft">
              <li><a href="#" className="hover:text-white transition-colors">Discovery Report</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Concierge Closure</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Legacy Protection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-blue-soft">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-navy-medium pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="font-semibold mb-3">Stay Informed</h4>
            <p className="text-blue-soft text-sm mb-4">
              Get estate planning tips and Legacy Ledger updates
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-navy-medium border border-navy-light text-white placeholder-blue-soft focus:outline-none focus:ring-2 focus:ring-trust-accent"
              />
              <Button variant="trust" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-navy-medium pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-blue-soft text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1-800-LEGACY-1</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@legacyledger.xyz</span>
              </div>
            </div>
            <div className="text-blue-soft text-sm">
              © 2024 Legacy Ledger. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;