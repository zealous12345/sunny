import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Have questions or ready to schedule a test drive? We're here to help.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-8">
                    <Card className="border-0 shadow-lg bg-brand-600 text-white">
                        <CardContent className="p-8 space-y-6">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <div className="flex items-start space-x-4">
                                <MapPin className="h-6 w-6 mt-1 text-brand-200" />
                                <div>
                                    <h4 className="font-semibold text-lg">Visit Our Showroom</h4>
                                    <p className="text-brand-100">12 Admiralty Way<br />Lekki Phase 1, Lagos</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Phone className="h-6 w-6 mt-1 text-brand-200" />
                                <div>
                                    <h4 className="font-semibold text-lg">Call Us</h4>
                                    <p className="text-brand-100">+234 800 SUNNY MOTORS</p>
                                    <p className="text-brand-100 opacity-75 text-sm">Mon-Sat: 9am - 7pm</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Mail className="h-6 w-6 mt-1 text-brand-200" />
                                <div>
                                    <h4 className="font-semibold text-lg">Email Us</h4>
                                    <p className="text-brand-100">info@sunnymotors.com</p>
                                    <p className="text-brand-100">sales@sunnymotors.com</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <div>
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">First Name</label>
                                        <Input placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Last Name</label>
                                        <Input placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Email</label>
                                    <Input type="email" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Message</label>
                                    <textarea
                                        className="w-full min-h-[150px] rounded-md border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                <Button className="w-full" size="lg">
                                    <Send className="mr-2 h-4 w-4" /> Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Contact;
