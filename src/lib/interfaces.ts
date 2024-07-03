export interface DashboardProps {
  children: React.ReactNode;
}

export interface Checklist {
  id: number;
  driveNumber: string;
  name: string;
  checkOccasion: OccasionItem[];
}

export interface ChecklistCardProps {
  checklist: Checklist;
  onUpdate?: () => void;
}

export interface OccasionItem {
  id: number;
  title: string;
  code: string;
  checkItem: CheckItem[];
}

export interface CheckItem {
  title: string;
  code: string;
  status: "CHECKED" | "NOT_RELEVANT" | "FAILED" | "NOT_CHECKED";
  checkResultRemark?: string;
}

export interface CustomInputProps {
  type: string;
  name: string;
  id: string;
  autoComplete?: string;
  required?: boolean;
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  placeholder?: string;
}
