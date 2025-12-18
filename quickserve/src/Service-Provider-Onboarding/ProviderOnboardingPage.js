import { Link } from "react-router-dom";
import ServiceCategorySelector from "./ServiceCategorySelector";
import "./provider-onbording.css";

export default function ProviderOnboardingPage() {
    return (
        <div className="provider-onboarding min-h-screen bg-white">
            {/* Navigation Bar */}
            <header className="border-b border-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                                <span className="text-lg font-bold text-white">Q</span>
                            </div>
                            <span className="text-xl font-semibold text-gray-900">
                QUICKSERVE
              </span>
                        </Link>

                        <nav className="hidden items-center gap-8 md:flex">
                            <Link
                                to="/services"
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Services
                            </Link>
                            <Link
                                to="/help"
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Help
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900">
                        Complete Your Provider Profile
                    </h1>
                    <p className="text-lg text-gray-600">
                        Tell us about the services you offer so customers can find you.
                    </p>
                </div>

                {/* Categories */}
                <div className="mb-12">
                    <h2 className="mb-6 text-xl font-semibold text-gray-900">
                        Select Your Service Categories
                    </h2>
                    <ServiceCategorySelector />
                </div>

                {/* Basic Info Card */}
                <div className="mb-12">
                    <h2 className="mb-6 text-xl font-semibold text-gray-900">
                        Basic Information
                    </h2>

                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        <div className="space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Business / Service Name
                                </label>
                                <input
                                    placeholder="e.g. Expert Plumbing Services"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    City / Location
                                </label>
                                <input
                                    placeholder="e.g. San Francisco, CA"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Short Service Description
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe your services, experience, and what makes you unique..."
                                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <button className="w-full rounded-xl bg-blue-500 px-8 py-4 text-base font-medium text-white hover:bg-blue-600 sm:w-auto">
                        Continue to Dashboard
                    </button>

                    <button className="w-full rounded-xl text-base font-medium text-gray-600 hover:text-gray-900 sm:w-auto">
                        Skip for now
                    </button>
                </div>
            </main>

            {/* Decorative Blobs */}
            <div className="pointer-events-none fixed left-0 top-0 -z-10 h-full w-full overflow-hidden">
                <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-100 opacity-40 blur-3xl" />
                <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-blue-100 opacity-40 blur-3xl" />
            </div>
        </div>
    );
}
