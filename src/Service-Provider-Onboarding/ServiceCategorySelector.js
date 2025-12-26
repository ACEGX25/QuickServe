import { useState } from "react";
import {
    Wrench,
    Sparkles,
    Zap,
    GraduationCap,
    Scissors,
    Wind,
    Paintbrush,
    Car,
    Laptop,
    Home,
} from "lucide-react";

const categories = [
    { id: "plumbing", name: "Plumbing", icon: Wrench },
    { id: "cleaning", name: "Cleaning", icon: Sparkles },
    { id: "electrical", name: "Electrical", icon: Zap },
    { id: "tutoring", name: "Tutoring", icon: GraduationCap },
    { id: "salon", name: "Salon & Beauty", icon: Scissors },
    { id: "ac-repair", name: "AC Repair", icon: Wind },
    { id: "painting", name: "Painting", icon: Paintbrush },
    { id: "car-wash", name: "Car Wash", icon: Car },
    { id: "tech-support", name: "Tech Support", icon: Laptop },
    { id: "home-repair", name: "Home Repair", icon: Home },
];

export default function ServiceCategorySelector() {
    const [selected, setSelected] = useState([]);

    const toggleCategory = (id) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selected.includes(category.id);

                return (
                    <div
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className={`cursor-pointer rounded-2xl border-2 p-6 text-center transition-all hover:shadow-md ${
                            isSelected
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className={`rounded-xl p-3 ${
                                    isSelected ? "bg-blue-500" : "bg-gray-100"
                                }`}
                            >
                                <Icon
                                    className={`h-6 w-6 ${
                                        isSelected ? "text-white" : "text-gray-600"
                                    }`}
                                />
                            </div>

                            <span
                                className={`text-sm font-medium ${
                                    isSelected ? "text-blue-700" : "text-gray-700"
                                }`}
                            >
                {category.name}
              </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
