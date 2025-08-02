"use client";

import { Star, MapPin, Phone, Mail, Clock, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-gray-800 hover:bg-white">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              {doctor.rating}
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
            <Badge variant="secondary" className="mb-2 bg-blue-50 text-blue-700 hover:bg-blue-100">
              {doctor.specialty}
            </Badge>
            <p className="text-sm text-gray-600">{doctor.education}</p>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              {doctor.hospital}, {doctor.city}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              {doctor.experience} years experience
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
              ${doctor.consultationFee} consultation
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Languages:</p>
            <div className="flex flex-wrap gap-1">
              {doctor.languages.map((language) => (
                <Badge key={language} variant="outline" className="text-xs">
                  {language}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Availability:</p>
            <p className="text-sm text-gray-700">{doctor.availability}</p>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Book Appointment
            </Button>
            <Button variant="outline" size="icon" className="shrink-0">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="shrink-0">
              <Mail className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}