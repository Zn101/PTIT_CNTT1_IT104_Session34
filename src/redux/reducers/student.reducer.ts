import type { Student } from "../../utils/types";

const defaultStudents: Student[] = [
  { id: 'SV001', name: 'Nguyễn Văn A', gender: 'Nam', birthday: '2003-01-01', hometown: 'Hanoi', address: '123 ABC', age: 20 },
  { id: 'SV002', name: 'Nguyễn Văn B', gender: 'Nữ', birthday: '2002-02-02', hometown: 'HCM', address: '456 DEF', age: 21 },
  { id: 'SV003', name: 'Nguyễn Văn C', gender: 'Nam', birthday: '2004-03-03', hometown: 'Da Nang', address: '789 GHI', age: 19 },
];

const studentLocal = localStorage.getItem('students');
let studentInitial: Student[] = defaultStudents;

if (studentLocal) {
  const savedStudents = JSON.parse(studentLocal) as Student[];
  const merged = [
    ...defaultStudents.filter(d => !savedStudents.find(s => s.id === d.id)),
    ...savedStudents
  ];
  studentInitial = merged;
  localStorage.setItem('students', JSON.stringify(merged));
}

type ActionTypes = {
  type: "ADD" | "EDIT" | "DELETE" | "SEARCH" | "FILTER";
  payload: Student;
};

const studentReducer = (state = studentInitial, action: ActionTypes): Student[] => {
  switch (action.type) {
    case "ADD": {
      const studentClones = [...state, action.payload];
      localStorage.setItem("students", JSON.stringify(studentClones));
      return studentClones;
    }

    case "DELETE": {
      const filtered = state.filter((st) => st.id !== action.payload.id);
      localStorage.setItem("students", JSON.stringify(filtered));
      return filtered;
    }

    case "EDIT": {
      const updated = state.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
      localStorage.setItem("students", JSON.stringify(updated));
      return updated;
    }

    case "SEARCH": {
      if (action.payload.name) {
        return state.filter((student) =>
          (student.name ?? "")
            .toLowerCase()
            .includes((action.payload.name ?? "").toLowerCase())
        );
      }
      return state;
    }

    default:
      return state;
  }
};

export default studentReducer;
