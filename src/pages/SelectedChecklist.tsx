import Dashboard from "@/components/Dashboard";
import { getSelectedChecklist, postChecklist } from "@/lib/api";
import { CheckItem, Checklist, OccasionItem } from "@/lib/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { notification } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SelectedChecklist = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { driveNumber } = useParams();
  const {
    data: selectedChecklist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["selectedChecklist", driveNumber], // need to include the driveNumber for always fetch the correct data
    queryFn: async () => getSelectedChecklist(driveNumber as string),
  });

  const initialValues = {
    id: selectedChecklist?.id,
    driveNumber: selectedChecklist?.driveNumber,
    name: selectedChecklist?.name,
    checkOccasion: selectedChecklist?.checkOccasion ?? [],
  };

  const [checklistForm, setChecklistForm] = useState(initialValues);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const changeChecklistMutation = useMutation(
    ({
      checklist,
      driveNumber,
    }: {
      checklist: Checklist;
      driveNumber: string;
    }) => {
      return postChecklist(checklist, driveNumber);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["selectedChecklist", driveNumber]);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checklistForm.driveNumber || !checklistForm.name) {
      notification.error({
        message: "Error",
        description: "Please fill all the required fields",
      });
      return;
    }
    try {
      await changeChecklistMutation.mutateAsync({
        checklist: checklistForm as Checklist,
        driveNumber: driveNumber as string,
      });
      notification.success({
        message: "Success",
        description: "Checklist updated successfully",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Something went wrong",
      });
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <Dashboard>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-7xl py-6 sm:px-6  lg:px-8"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {driveNumber} checklist adatok
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
              <div className="sm:col-span-1">
                <label
                  htmlFor="id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ID
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md bg-gray-300">
                    <input
                      type="text"
                      name="id"
                      id="id"
                      value={checklistForm.id}
                      disabled
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 "
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="driveNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  DriveNumber
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="driveNumber"
                      id="driveNumber"
                      autoComplete="driveNumber"
                      required
                      value={checklistForm.driveNumber}
                      onChange={(e) =>
                        setChecklistForm({
                          ...checklistForm,
                          driveNumber: e.target.value,
                        })
                      }
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      required
                      value={checklistForm.name}
                      onChange={(e) =>
                        setChecklistForm({
                          ...checklistForm,
                          name: e.target.value,
                        })
                      }
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {checklistForm.checkOccasion &&
              checklistForm.checkOccasion.map(
                (occasion: OccasionItem, occasionIndex: number) => (
                  <div
                    key={occasion.id}
                    className="border-b border-gray-900/10 pb-12 mt-4"
                  >
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">
                      {occasion.title}
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      {occasion.checkItem.map(
                        (item: CheckItem, itemIndex: number) => (
                          <div key={item.code} className="sm:col-span-2">
                            <label
                              htmlFor={`${item.code}_${occasionIndex}_${itemIndex}`}
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              {item.title}
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <select
                                  id={`${item.code}_${occasionIndex}_${itemIndex}`}
                                  name={`${item.code}_${occasionIndex}_${itemIndex}`}
                                  value={item.status}
                                  onChange={(e) => {
                                    const updatedChecklistForm = {
                                      ...checklistForm,
                                    };
                                    updatedChecklistForm.checkOccasion[
                                      occasionIndex
                                    ].checkItem[itemIndex].status = e.target
                                      .value as CheckItem["status"];
                                    setChecklistForm(updatedChecklistForm);
                                  }}
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                >
                                  <option value="CHECKED">Checked</option>
                                  <option value="NOT_RELEVANT">
                                    Not Relevant
                                  </option>
                                  <option value="FAILED">Failed</option>
                                  <option value="NOT_CHECKED">
                                    Not Checked
                                  </option>
                                </select>
                              </div>

                              <div className=" mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  type="text"
                                  name={`${item.code}_remark_${occasionIndex}_${itemIndex}`}
                                  id={`${item.code}_remark_${occasionIndex}_${itemIndex}`}
                                  value={item.checkResultRemark}
                                  onChange={(e) => {
                                    const updatedChecklistForm = {
                                      ...checklistForm,
                                    };
                                    updatedChecklistForm.checkOccasion[
                                      occasionIndex
                                    ].checkItem[itemIndex].checkResultRemark =
                                      e.target.value;
                                    setChecklistForm(updatedChecklistForm);
                                  }}
                                  placeholder="Remark"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </Dashboard>
  );
};

export default SelectedChecklist;
