import doctors from "@/app/data/doctors";
import ScheduleTable from "@/app/components/ScheduleTable";
import Breadcumb from "@/app/components/Breadcumb";
import Image from "next/image";
export default function DoctorDetails({ params }) {
  const doctorId = params.doctorId;
  const doctor = doctors.find((doc) => doc.id === parseInt(doctorId));

  if (!doctor) return <p>Dokter tidak ditemukan.</p>;

  return (
    <>
      <Breadcumb name={doctor.name} divider="/" />
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
        <div className=" p-8 col-span-8 space-y-6 bg-neutral-50 rounded-md ">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">{doctor.name}</h1>
            <p>Poli: {doctor.poli}</p>
            <p>Specialty: {doctor.specialty}</p>
            <p>Education: {doctor.background}</p>
            <p>Location: {doctor.branch}</p>
          </div>
        </div>
        <div className="col-span-12">
          <ScheduleTable schedule={doctor.schedule} />
        </div>
      </div>
    </>
  );
}
