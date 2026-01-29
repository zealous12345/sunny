import { Card, CardContent } from "@/components/ui/Card";

const About = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-6">About SunnyMotors</h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                    Driven by passion, defined by quality. We are your premier destination for luxury and performance vehicles.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
                    <p className="text-slate-600 leading-relaxed">
                        At SunnyMotors, we believe that buying a car should be as exhilarating as driving one.
                        Our mission is to provide an unmatched selection of high-quality vehicles
                        paired with a transparent, personalized buying experience.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        Founded in 2023, we have quickly established ourselves as a leader in the automotive market,
                        serving thousands of satisfied customers who trust us for our integrity and expertise.
                    </p>
                </div>
                <div className="bg-slate-200 rounded-2xl h-80 overflow-hidden relative">
                    {/* Placeholder for About Image */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                        Showroom Image
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center p-6 bg-slate-50 border-0">
                    <CardContent className="pt-6">
                        <h3 className="text-4xl font-bold text-brand-600 mb-2">500+</h3>
                        <p className="text-slate-600 font-medium">Cars Sold</p>
                    </CardContent>
                </Card>
                <Card className="text-center p-6 bg-slate-50 border-0">
                    <CardContent className="pt-6">
                        <h3 className="text-4xl font-bold text-brand-600 mb-2">98%</h3>
                        <p className="text-slate-600 font-medium">Customer Satisfaction</p>
                    </CardContent>
                </Card>
                <Card className="text-center p-6 bg-slate-50 border-0">
                    <CardContent className="pt-6">
                        <h3 className="text-4xl font-bold text-brand-600 mb-2">24/7</h3>
                        <p className="text-slate-600 font-medium">Support Available</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default About;
