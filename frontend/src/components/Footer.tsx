import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-900 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-6">
                        <Link to="/" className="inline-block">
                            <span className="text-2xl font-display font-bold text-white tracking-tight">
                                Sunny<span className="text-brand-500">Motors</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Your premium destination for luxury and reliable vehicles. Experience the thrill of driving with our curated collection of top-tier automobiles.
                        </p>
                        <div className="flex space-x-4">
                            <SocialLink icon={<Facebook className="h-5 w-5" />} href="#" />
                            <SocialLink icon={<Twitter className="h-5 w-5" />} href="#" />
                            <SocialLink icon={<Instagram className="h-5 w-5" />} href="#" />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-display font-semibold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <FooterLink to="/" label="Home" />
                            <FooterLink to="/cars" label="Browse Cars" />
                            <FooterLink to="/services" label="Our Services" />
                            <FooterLink to="/about" label="About Us" />
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-display font-semibold text-white mb-6">Support</h4>
                        <ul className="space-y-3">
                            <FooterLink to="/contact" label="Contact Support" />
                            <FooterLink to="/faq" label="FAQs" />
                            <FooterLink to="/privacy" label="Privacy Policy" />
                            <FooterLink to="/terms" label="Terms of Service" />
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-display font-semibold text-white mb-6">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-sm text-slate-400">
                                <MapPin className="h-5 w-5 text-brand-500 flex-shrink-0 mt-0.5" />
                                <span>12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm text-slate-400">
                                <Phone className="h-5 w-5 text-brand-500 flex-shrink-0" />
                                <span>+234 800 SUNNY MOTORS</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm text-slate-400">
                                <Mail className="h-5 w-5 text-brand-500 flex-shrink-0" />
                                <span>info@sunnymotors.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">&copy; {currentYear} SunnyMotors. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">Terms</Link>
                        <Link to="/sitemap" className="text-xs text-slate-500 hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
    <a
        href={href}
        className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white hover:border-brand-500 transition-all duration-300"
    >
        {icon}
    </a>
);

const FooterLink = ({ to, label }: { to: string, label: string }) => (
    <li>
        <Link to={to} className="text-sm text-slate-400 hover:text-brand-400 transition-colors flex items-center group">
            <ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-brand-500" />
            <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
        </Link>
    </li>
);

export default Footer;
