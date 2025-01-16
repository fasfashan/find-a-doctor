"use client";
import doctors from "@/app/data/doctors";
import ScheduleTable from "@/app/components/ScheduleTable";
import Breadcumb from "@/app/components/Breadcumb";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import Link from "next/link";
export default function DoctorDetails({ params }) {
  const { doctorId } = use(params); // Gunakan React.use() untuk mengakses params
  const doctor = doctors.find((doc) => doc.id === parseInt(doctorId));

  if (!doctor) return notFound();
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "bio", name: "Biographical summary" },
    { id: "education", name: "Education" },
    { id: "awards", name: "Awards & Honor" },
    { id: "interest", name: "Interest" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map((section) => {
        const element = document.getElementById(section.id);
        if (!element) return { id: section.id, offsetTop: 0 };
        return { id: section.id, offsetTop: element.offsetTop };
      });

      const scrollPosition = window.scrollY + 100; // Offset untuk sticky navigation
      let currentSection = "";

      offsets.forEach(({ id, offsetTop }, index) => {
        const nextSection = offsets[index + 1];
        if (
          scrollPosition >= offsetTop &&
          (!nextSection || scrollPosition < nextSection.offsetTop)
        ) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="bg-primary">
        <div className="max-w-5xl m-auto p-4 flex items-center">
          <Link href="/" className="text-gray-200 font-light">
            Home
          </Link>
          <span className="text-white mx-2">/</span>
          <Link href="/" className="text-white">
            Find a Doctor
          </Link>
          <span className="text-white mx-2">/</span>
          <span className="text-white">{doctor.name}</span>
        </div>
      </div>
      <div className="max-w-5xl gap-4 p-4 grid grid-cols-12 m-auto mt-10">
        <div className="flex gap-4 col-span-4">
          <Image
            alt={doctor.name}
            src={doctor.photo}
            width={1000}
            height={1000}
            className="h-96 w-h-96 object-cover rounded-md"
          />
        </div>
        <div className="col-span-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold">{doctor.name}</h1>
              <div className="space-y-2">
                <p className="font-medium text-sm">
                  Poli: <span className="text-gray-500"> {doctor.poli}</span>
                </p>
                <p className="font-medium text-sm">
                  Specialty:{" "}
                  <span className="text-gray-500"> {doctor.specialty}</span>{" "}
                </p>
                <p className="font-medium text-sm">
                  Location:{" "}
                  <span className="text-gray-500"> {doctor.branch}</span>{" "}
                </p>
              </div>
            </div>
          </div>
          <ScheduleTable schedule={doctor.schedule} />
        </div>
      </div>

      <div className="max-w-5xl m-auto mt-10 p-4 grid grid-cols-12 gap-6 mb-60">
        {/* Content */}
        <div className="col-span-9 space-y-10">
          <div id="bio" className="space-y-4">
            <h2 className="text-4xl font-medium">Biographical summary</h2>
            <p className="text-gray-600 max-w-xl text-lg">{doctor.bio}</p>
          </div>
          <hr />

          <div id="education" className="space-y-4">
            <h2 className="text-4xl font-medium">Education</h2>
            {doctor.education.map((edu, index) => (
              <div key={index} className="mb-4 space-y-2">
                <p className="font-semibold text-lg">{edu.year}</p>
                <div className="space-y-1">
                  <p className="font-medium">{edu.major}</p>
                  <p className="text-gray-600">{edu.university}</p>
                </div>
              </div>
            ))}
          </div>
          <hr />

          <div id="awards" className="space-y-4">
            <h2 className="text-4xl font-medium">Awards & Honor</h2>
            {doctor.awards.map((award, index) => (
              <div key={index} className="mb-4 space-y-2">
                <p className="font-semibold text-lg">{award.year}</p>
                <div className="space-y-1">
                  <p className="font-medium">{award.title}</p>
                  <p className="text-gray-600">{award.organization}</p>
                </div>
              </div>
            ))}
          </div>
          <hr />

          <div id="interest" className="space-y-4">
            <h2 className="text-4xl font-medium">Interest</h2>
            <ul className="mb-4 list-disc pl-4 space-y-1">
              {doctor.interested.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* Sticky Navigation */}
        <div className="col-span-3">
          <nav className="sticky top-20  rounded-md space-y-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block pl-3 text-sm ${
                  activeSection === section.id
                    ? "border-l-2 border-primary"
                    : "text-neutral-500"
                } hover:underline`}
              >
                {section.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
