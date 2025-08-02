"use client";

import { Search, MapPin, Building2, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface SearchFiltersProps {
  searchTerm: string;
  selectedCity: string;
  selectedHospital: string;
  selectedSpecialty: string;
  onSearchChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onHospitalChange: (value: string) => void;
  onSpecialtyChange: (value: string) => void;
  cities: string[];
  hospitals: string[];
  specialties: string[];
}

export default function SearchFilters({
  searchTerm,
  selectedCity,
  selectedHospital,
  selectedSpecialty,
  onSearchChange,
  onCityChange,
  onHospitalChange,
  onSpecialtyChange,
  cities,
  hospitals,
  specialties,
}: SearchFiltersProps) {
  return (
    <Card className="mb-8 shadow-lg border-0">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by doctor name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
            <Select value={selectedCity} onValueChange={onCityChange}>
              <SelectTrigger className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
            <Select value={selectedHospital} onValueChange={onHospitalChange}>
              <SelectTrigger className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Select hospital" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hospitals</SelectItem>
                {hospitals.map((hospital) => (
                  <SelectItem key={hospital} value={hospital}>
                    {hospital}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
            <Select value={selectedSpecialty} onValueChange={onSpecialtyChange}>
              <SelectTrigger className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}