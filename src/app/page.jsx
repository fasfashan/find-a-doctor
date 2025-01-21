"use client";
import doctors from "@/app/data/doctors";
import DoctorCard from "@/app/components/DoctorCard";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Extract unique branches and specialties from doctors data
  const branches = [...new Set(doctors.map((doctor) => doctor.branch))].sort();
  const specialtys = [
    ...new Set(doctors.map((doctor) => doctor.specialty)),
  ].sort();

  // State untuk filter
  const [filters, setFilters] = useState({
    specialty: "",
    branch: "",
    doctorName: "",
  });

  // State untuk data asli, data yang sudah difilter, dan status data kosong
  const [originalData, setOriginalData] = useState(
    [...doctors].sort((a, b) => a.name.localeCompare(b.name))
  );
  const [filteredData, setFilteredData] = useState(
    [...doctors].sort((a, b) => a.name.localeCompare(b.name))
  );
  const [isNoData, setIsNoData] = useState(false);

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

    // Sort the filtered results alphabetically by name
    result.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredData(result);
    setIsNoData(result.length === 0);
  };

  // Gunakan useEffect untuk menerapkan filter setiap kali filters berubah
  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <>
      <div className="bg-primary">
        <div className="max-w-5xl m-auto p-4 flex items-center">
          <Link href="/" className="text-white ">
            Home
          </Link>
          <span className="text-white mx-2">/</span>
          <spa className="text-gray-100">Find a Doctor</spa>
        </div>
      </div>
      <img
        className="w-full h-[500px] object-cover "
        alt="hero Image"
        src="/Hero Image.jpg"
        width={1000}
        height={400}
      />
      <div className="max-w-5xl m-auto p-4">
        {/* Filter Section */}
        <div className="col-span-12 space-y-4 max-w-2xl m-auto -mt-40 bg-white p-10 rounded-md shadow-md border border-neutral-200 relative z-9">
          <h1 className="mb-8 font-medium text-2xl tracking-tighter ">
            Find a Doctor
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label htmlFor="" className="mb-4 font-medium text-sm">
                Choose Hospital
              </label>
              <select
                name="branch"
                value={filters.branch}
                onChange={handleFilterChange}
                className="shadow minimal appearance-none border rounded text-sm w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-primary focus:shadow-outline"
              >
                <option value="">All hospital</option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label htmlFor="" className="mb-4 font-medium text-sm">
                Choose Specialty
              </label>
              <select
                name="specialty"
                value={filters.specialty}
                onChange={handleFilterChange}
                className="shadow border minimal round appearance-none rounded text-sm w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-primary focus:shadow-outline"
              >
                <option value="">All Specialty</option>
                {specialtys.map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-item">
            <label htmlFor="" className="mb-4 font-medium text-sm">
              Search by Name
            </label>
            <input
              type="text"
              name="doctorName"
              value={filters.doctorName}
              onChange={handleFilterChange}
              placeholder="Enter doctor's name"
              className="shadow border round rounded mt-2 text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-primary focus:shadow-outline"
            />
          </div>
        </div>

        <div className="mt-10 mb-2 font-medium">
          Results ({filteredData.length})
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-6">
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
