"use client";
import doctors from "@/app/data/doctors";
import DoctorCard from "@/app/components/DoctorCard";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import Breadcumb from "@/app/components/Breadcumb";

export default function Home() {
  // Extract unique branches and specialties from doctors data
  const branches = [...new Set(doctors.map((doctor) => doctor.branch))];
  const specialtys = [...new Set(doctors.map((doctor) => doctor.specialty))];

  // State untuk filter
  const [filters, setFilters] = useState({
    specialty: "",
    branch: "",
    doctorName: "",
  });

  // State untuk data asli, data yang sudah difilter, dan status data kosong
  const [originalData, setOriginalData] = useState(doctors);
  const [filteredData, setFilteredData] = useState(doctors);
  const [isNoData, setIsNoData] = useState(false); // Tambahkan state ini

  // Function untuk handle perubahan filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function untuk menerapkan filter
  const applyFilters = () => {
    let result = [...originalData];

    if (filters.specialty) {
      result = result.filter((item) =>
        (item.specialty || "")
          .toLowerCase()
          .includes(filters.specialty.toLowerCase())
      );
    }

    if (filters.branch) {
      result = result.filter((item) =>
        (item.branch || "").toLowerCase().includes(filters.branch.toLowerCase())
      );
    }

    if (filters.doctorName) {
      result = result.filter((item) =>
        (item.name || "")
          .toLowerCase()
          .includes(filters.doctorName.toLowerCase())
      );
    }

    setFilteredData(result);
    setIsNoData(result.length === 0); // Update status data kosong
  };

  // Gunakan useEffect untuk menerapkan filter setiap kali filters berubah
  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <>
      <Breadcumb divider="/" />
      <div className="max-w-5xl m-auto p-4">
        {/* Filter Section */}
        <div className="grid grid-cols-12 py-10 gap-8 mb-10 items-center">
          <div className="col-span-7 space-y-4">
            <h1 className="mb-8 font-medium text-4xl tracking-tighter ">
              Find a doctor at Murni Hospital
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-full">
                <label htmlFor="" className="mb-4 font-medium text-sm">
                  Pilih rumah sakit
                </label>
                <select
                  name="branch"
                  value={filters.branch}
                  onChange={handleFilterChange}
                  className="shadow minimal appearance-none border rounded text-sm w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-primary focus:shadow-outline"
                >
                  <option value="">Semua Rumah Sakit</option>
                  {branches.map((branch, index) => (
                    <option key={index} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label htmlFor="" className="mb-4 font-medium text-sm">
                  Pilih Specialty
                </label>
                <select
                  name="specialty"
                  value={filters.specialty}
                  onChange={handleFilterChange}
                  className="shadow border minimal round appearance-none rounded text-sm w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-primary focus:shadow-outline"
                >
                  <option value="">Semua Specialty</option>
                  {specialtys
                    .slice() // Buat salinan array untuk menghindari mutasi
                    .sort((a, b) => a.localeCompare(b)) // Mengurutkan A-Z
                    .map((specialty, index) => (
                      <option key={index} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="filter-item">
              <label htmlFor="" className="mb-4 font-medium text-sm">
                Cari bedasarkan nama
              </label>
              <input
                type="text"
                name="doctorName"
                value={filters.doctorName}
                onChange={handleFilterChange}
                placeholder="Cari nama dokter..."
                className="shadow border round rounded mt-2 text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-primary focus:shadow-outline"
              />
            </div>
          </div>
          <div className="col-span-5">
            <Image
              src="/hero-image.png"
              width={10000}
              height={300}
              alt="Hero Image"
            />
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-6">
          {isNoData ? (
            <p className="text-center col-span-full text-gray-500">
              Dokter tidak ditemukan
            </p>
          ) : (
            filteredData.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
