import LegalLayout from '../layouts/LegalLayout';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <LegalLayout title="Contact Us">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="mb-8 text-lg">Have questions about our data or dashboard? Get in touch with our team of analysts. We're here to help you navigate the transition to sustainable transport.</p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-blue-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Email</h4>
                <p className="text-sm">support@ev-analytics.my</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-purple-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Location</h4>
                <p className="text-sm">Cyberjaya, Selangor, Malaysia</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-green-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Phone</h4>
                <p className="text-sm">+60 3-1234 5678</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
              <input type="text" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:border-blue-500 outline-none transition-colors" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
              <input type="email" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:border-blue-500 outline-none transition-colors" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Message</label>
              <textarea className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 h-32 focus:border-blue-500 outline-none transition-colors" placeholder="How can we help?"></textarea>
            </div>
            <button type="button" className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors mt-2">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </LegalLayout>
  );
}
