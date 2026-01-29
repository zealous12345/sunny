import { Button } from "@/components/ui/Button";
import { CheckCircle, Shield, Wrench, RefreshCw, Truck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
    const services = [
        {
            icon: <Truck className="h-8 w-8 text-brand-600" />,
            title: "Nationwide Delivery",
            description: "We deliver your dream car right to your doorstep, anywhere in the country.",
        },
        {
            icon: <Shield className="h-8 w-8 text-brand-600" />,
            title: "Extended Warranty",
            description: "Drive with confidence knowing you're covered with our comprehensive protection plans.",
        },
        {
            icon: <CreditCard className="h-8 w-8 text-brand-600" />,
            title: "Flexible Financing",
            description: "Competitive rates and terms tailored to fit your budget and lifestyle.",
        },
        {
            icon: <Wrench className="h-8 w-8 text-brand-600" />,
            title: "Expert Maintenance",
            description: "Our certified technicians ensure your vehicle stays in peak condition.",
        },
        {
            icon: <RefreshCw className="h-8 w-8 text-brand-600" />,
            title: "Trade-In Service",
            description: "Get the best value for your current vehicle with our hassle-free trade-in process.",
        },
        {
            icon: <CheckCircle className="h-8 w-8 text-brand-600" />,
            title: "Certified Pre-Owned",
            description: "Rigorously inspected vehicles that meet our strict quality standards.",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Premium Services</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Beyond selling cars, we provide a full suite of automotive services designed to make your ownership experience seamless.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {services.map((service, index) => (
                    <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="mb-4 bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                        <p className="text-slate-600">{service.description}</p>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 rounded-2xl p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to Experience the Best?</h2>
                <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                    Contact our team today to learn more about how we can serve you.
                </p>
                <Link to="/contact">
                    <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white border-0">
                        Contact Us
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Services;
