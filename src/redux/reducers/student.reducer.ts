import type { Student } from "../../utils/types";

const defaultStudents: Student[] = [
  { id: 'SV001', name: 'Nguyễn Văn A', gender: 'Nam', birthday: '2003-01-01', hometown: 'Hanoi', address: '123 ABC' },
  { id: 'SV002', name: 'Nguyễn Văn B', gender: 'Nữ', birthday: '2002-02-02', hometown: 'HCM', address: '456 DEF' },
  { id: 'SV003', name: 'Nguyễn Văn C', gender: 'Nam', birthday: '2004-03-03', hometown: 'Da Nang', address: '789 GHI' },
];

const studentLocal = localStorage.getItem('students');
let studentInitial: Student[] = defaultStudents;

if (studentLocal) {
  const savedStudents = JSON.parse(studentLocal);
  // Merge: only add default if not already in localStorage
  const merged = [...defaultStudents.filter(d => !savedStudents.find(s => s.id === d.id)), ...savedStudents];
  studentInitial = merged;
}

type ActionTypes = {
  type: "ADD" | "EDIT" | "DELETE" | "SEARCH" | "FILTER";
  payload: Student;
};

const studentReducer = (state = studentInitial, action: ActionTypes) => {
  switch (action.type) {
    case "ADD": {
      const studentClones = [...state, action.payload];
      localStorage.setItem("students", JSON.stringify(studentClones));
      return studentClones;
    }

    case "DELETE": {
      const filterStudent = state.filter((st) => st.id !== action.payload.id);
      localStorage.setItem("students", JSON.stringify(filterStudent));
      return filterStudent;
    }

    case "EDIT": {
      const updatedStudents = state.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      return updatedStudents;
    }

    case "SEARCH": {
      const studentClones = [...state];
      if (action.payload.name) {
        const searchStudent = studentClones.filter((student) =>
          (student.name ?? "")
            .toLowerCase()
            .includes((action.payload.name ?? "").toLowerCase())
        );
        return searchStudent;
      } else {
        return studentInitial;
      }
    }

    default:
      break;
  }

  return state;
};

export default studentReducer;
