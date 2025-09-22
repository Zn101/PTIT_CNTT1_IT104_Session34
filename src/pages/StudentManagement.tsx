import React from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import Toolbar from "../components/Toolbar";
import { useAppSelector } from "../hooks/useRedux";
import type { Student } from "../utils/types";

const StudentManagement: React.FC = () => {
  const students = useAppSelector((store) => store.student);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        <Toolbar />
        <StudentList students={students} onEdit={setSelectedStudent} />
      </div>

      <StudentForm editStudent={selectedStudent} />
    </div>
  );
};

export default StudentManagement;

