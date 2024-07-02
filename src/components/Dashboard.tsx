import { DashboardProps } from "../lib/interfaces";

function Dashboard({ children }: DashboardProps) {
  return (
    <div className="">
      <div className="relative">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            Star-Trac Homework
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
