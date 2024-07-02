import { ChecklistCardProps } from "@/lib/interfaces";
import { useNavigate } from "react-router-dom";

export default function ChecklistCard({ checklist }: ChecklistCardProps) {
  const navigate = useNavigate();

  const handleClick = (driveNumber: string) => {
    return () => {
      navigate(`/check/start/${driveNumber}`);
    };
  };

  return (
    <div
      className="bg-white shadow sm:rounded-lg w-full sm:col-span-2 hover:bg-slate-400 cursor-pointer"
      onClick={handleClick(checklist.driveNumber)}
    >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">{checklist.name}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {checklist.driveNumber}
        </p>
        <p className="text-right text-sm">{checklist.id}</p>
      </div>
    </div>
  );
}
