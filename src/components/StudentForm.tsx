import {
  Button,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import React, { useRef } from "react";
import type { Student } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type FormChangeEvent = InputChangeEvent | SelectChangeEvent;

interface StudentFormProps {
  editStudent?: Student | null;
}

const StudentForm: React.FC<StudentFormProps> = ({ editStudent }) => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.student);

  const [form, setForm] = React.useState<Student & { age?: number }>({
    id: "",
    name: "",
    gender: "Nam",
    birthday: "",
    hometown: "",
    address: "",
    age: undefined,
  });

  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const firstInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (editStudent) {
      setForm({ ...editStudent, age: editStudent.age ?? undefined });
      setEditingId(editStudent.id ?? null);
      setTimeout(() => firstInputRef.current?.focus(), 0);
    }
  }, [editStudent]);

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;
    let newValue: any = value;
    if (name === "age") {
      newValue = Number(value);
    }
    setForm({ ...form, [name]: newValue });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.id?.trim()) newErrors.id = "Mã sinh viên là bắt buộc";
    else if (!editingId && students.some((s) => s.id === form.id))
      newErrors.id = "Mã sinh viên đã tồn tại";

    if (!form.name?.trim()) newErrors.name = "Tên sinh viên là bắt buộc";
    else if (!editingId && students.some((s) => s.name === form.name))
      newErrors.name = "Tên sinh viên đã tồn tại";

    if (!form.birthday) newErrors.birthday = "Ngày sinh là bắt buộc";
    else if (new Date(form.birthday) > new Date())
      newErrors.birthday = "Ngày sinh không được trong tương lai";

    if (form.age == null || isNaN(form.age)) newErrors.age = "Tuổi là bắt buộc";
    else if (form.age < 0) newErrors.age = "Tuổi không được nhỏ hơn 0";

    if (!form.hometown?.trim()) newErrors.hometown = "Nơi sinh là bắt buộc";
    if (!form.address?.trim()) newErrors.address = "Địa chỉ là bắt buộc";

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingId) {
      dispatch({ type: "EDIT", payload: form });
      setEditingId(null);
    } else {
      dispatch({ type: "ADD", payload: form });
    }

    setForm({
      id: "",
      name: "",
      gender: "Nam",
      birthday: "",
      hometown: "",
      address: "",
      age: undefined,
    });

    setTimeout(() => firstInputRef.current?.focus(), 0);
  };

  return (
    <div className="w-1/3 p-4 border rounded-xl shadow">
      <h2 className="font-semibold mb-4">Thông Tin Sinh Viên</h2>
      <div className="flex flex-col gap-4">
        <TextField
          label="Mã sinh viên"
          name="id"
          value={form.id}
          onChange={handleChange}
          fullWidth
          error={!!errors.id}
          helperText={errors.id}
          inputRef={firstInputRef}
        />
        <TextField
          label="Tên sinh viên"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
        />
        <Select name="gender" value={form.gender} onChange={handleChange} fullWidth>
          <MenuItem value="Nam">Nam</MenuItem>
          <MenuItem value="Nữ">Nữ</MenuItem>
        </Select>
        <TextField
          type="date"
          label="Ngày sinh"
          name="birthday"
          value={form.birthday}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errors.birthday}
          helperText={errors.birthday}
        />
        <TextField
          type="number"
          label="Tuổi"
          name="age"
          value={form.age ?? ""}
          onChange={handleChange}
          fullWidth
          error={!!errors.age}
          helperText={errors.age}
          inputProps={{ min: 0 }}
        />
        <TextField
          label="Nơi sinh"
          name="hometown"
          value={form.hometown}
          onChange={handleChange}
          fullWidth
          error={!!errors.hometown}
          helperText={errors.hometown}
        />
        <TextField
          label="Địa chỉ"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          error={!!errors.address}
          helperText={errors.address}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {editingId ? "Cập nhật" : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default StudentForm;

