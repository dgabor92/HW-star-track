import ChecklistCard from "@/components/ChecklistCard";
import Dashboard from "@/components/Dashboard";
import { getChecklist } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const Checklist = () => {
  const {
    data: checklist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["checklist"],
    queryFn: getChecklist,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <Dashboard>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {checklist.map((checklist) => (
          <ChecklistCard key={checklist.id} checklist={checklist} />
        ))}
      </div>
    </Dashboard>
  );
};

export default Checklist;
