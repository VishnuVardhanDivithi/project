"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Users, Building2, MapPin } from "lucide-react";
import DoctorCard from "@/components/DoctorCard";
import SearchFilters from "@/components/SearchFilters";
import { Card, CardContent } from "@/components/ui/card";
import {database} from "@/lib/firebase";
import { ref, get } from "firebase/database";

// import doctorsData from "@/data/doctors.json";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  city: string;
  experience: number;
  rating: number;
  image: string;
  education: string;
  phone: string;
  email: string;
  languages: string[];
  consultationFee: number;
  availability: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedHospital, setSelectedHospital] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsRef = ref(database, 'doctors');
        const snapshot = await get(doctorsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Convert object to array and add id property
          const doctorsArray = Object.keys(data).map(key => ({
            id: parseInt(key),
            ...data[key]
          }));
          setDoctors(doctorsArray);
        } else {
          console.log('No doctors data available');
        }
      } catch (error) {
        console.error('Error fetching doctors data:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Get unique values for filters
  const cities = useMemo(() => [...new Set(doctors.map(doctor => doctor.city))], [doctors]);
  const hospitals = useMemo(() => [...new Set(doctors.map(doctor => doctor.hospital))], [doctors]);
  const specialties = useMemo(() => [...new Set(doctors.map(doctor => doctor.specialty))], [doctors]);

  // Filter doctors based on search criteria
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity === "all" || doctor.city === selectedCity;
      const matchesHospital = selectedHospital === "all" || doctor.hospital === selectedHospital;
      const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;

      return matchesSearch && matchesCity && matchesHospital && matchesSpecialty;
    });
  }, [doctors, searchTerm, selectedCity, selectedHospital, selectedSpecialty]);

  // Calculate statistics
  const stats = useMemo(() => ({
    totalDoctors: doctors.length,
    totalCities: cities.length,
    totalHospitals: hospitals.length,
    totalSpecialties: specialties.length,
  }), [doctors, cities, hospitals, specialties]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Search className="w-8 h-8 mr-3 text-blue-600" />
                DoctorFinder
              </h1>
              <p className="text-gray-600 mt-1">Find the best doctors near you</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 mr-3" />
                <div>
                  <p className="text-sm opacity-90">Total Doctors</p>
                  <p className="text-2xl font-bold">{stats.totalDoctors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center">
                <MapPin className="w-8 h-8 mr-3" />
                <div>
                  <p className="text-sm opacity-90">Cities</p>
                  <p className="text-2xl font-bold">{stats.totalCities}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Building2 className="w-8 h-8 mr-3" />
                <div>
                  <p className="text-sm opacity-90">Hospitals</p>
                  <p className="text-2xl font-bold">{stats.totalHospitals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Search className="w-8 h-8 mr-3" />
                <div>
                  <p className="text-sm opacity-90">Specialties</p>
                  <p className="text-2xl font-bold">{stats.totalSpecialties}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          selectedCity={selectedCity}
          selectedHospital={selectedHospital}
          selectedSpecialty={selectedSpecialty}
          onSearchChange={setSearchTerm}
          onCityChange={setSelectedCity}
          onHospitalChange={setSelectedHospital}
          onSpecialtyChange={setSelectedSpecialty}
          cities={cities}
          hospitals={hospitals}
          specialties={specialties}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {filteredDoctors.length === doctors.length 
              ? "All Doctors" 
              : `Search Results (${filteredDoctors.length} found)`}
          </h2>
        </div>

        {/* Doctor Cards Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No doctors found</h3>
              <p className="text-gray-500">
                Try adjusting your search criteria to find more results.
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">DoctorFinder</h3>
            <p className="text-gray-400">
              Connecting patients with healthcare professionals across New York, Los Angeles, and Chicago
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}