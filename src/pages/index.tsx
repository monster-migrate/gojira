import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChartIcon, GroupIcon, LockIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <BarChartIcon className="h-8 w-8" />,
      title: "Agile Project Tracking",
      description: "Manage sprints, backlogs, and releases with intuitive Kanban boards"
    },
    {
      icon: <GroupIcon className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Real-time updates and comments for seamless teamwork"
    },
    {
      icon: <LockIcon className="h-8 w-8" />,
      title: "Secure Access",
      description: "Role-based permissions and enterprise-grade security"
    }
  ];

  return (
    <div className="min-h-screen px-2 sm:px-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rose-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Streamline Your Agile Workflows
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Empower your team with intuitive project tracking, real-time collaboration,
            and powerful analytics for modern software development.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-neutral-500">
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="text-rose-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-rose-600">500+</p>
              <p className="text-gray-600">Projects Managed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-rose-600">10k+</p>
              <p className="text-gray-600">Daily Tasks Tracked</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-rose-600">99.9%</p>
              <p className="text-gray-600">Uptime Reliability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-neutral-500">Ready to Transform Your Workflow?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of teams already streamlining their Agile development process
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
