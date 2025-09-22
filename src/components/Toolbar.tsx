import { Button, TextField } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../hooks/useRedux";

const Toolbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = React.useState("");

  const handleSearch = () => {
    dispatch({ type: "SEARCH", payload: { name: keyword } });
  };

  return (
    <div className="flex justify-between mb-4">
      <Button variant="contained" color="primary">
        Thêm mới sinh viên
      </Button>
      <div className="flex gap-2">
        <TextField
          size="small"
          placeholder="Search Here"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Tìm kiếm
        </Button>
        <Button variant="outlined">Sắp xếp</Button>
      </div>
    </div>
  );
};

export default Toolbar;
