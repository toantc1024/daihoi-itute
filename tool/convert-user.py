import pandas as pd

# Đọc file CSV gốc
file_path = "list.csv"
df = pd.read_csv(file_path)

# Hàm tạo communistUnionID từ MSSV bằng cách thay đổi hậu tố
def generate_union_id(mssv):
    return str(mssv)[:5] + "CLST3"  # Lấy 5 số đầu của MSSV và thêm hậu tố

# Hàm tạo email từ MSSV
def generate_email(mssv):
    return f"{mssv}@student.hcmute.edu.vn"

# Xử lý dữ liệu và tạo DataFrame mới
users_data = pd.DataFrame({
    "fullName": df["Tên"],
    "representativeID": df["Số ghế"].astype(str),
    "role": df["Chức vụ"],
    "sex": df["Đại biểu nữ"].apply(lambda x: "Nữ" if x == 1 else "Nam"),
    "communistUnionID": df["Chi Hội"].astype(str).apply(generate_union_id),
    "email": df["MSSV"].astype(str).apply(generate_email),
    "studentID": df["MSSV"].astype(str),
})

# Lưu vào file CSV mới
output_csv_path = "users_data.csv"
users_data.to_csv(output_csv_path, index=False, encoding="utf-8")

print(f"File CSV đã được tạo: {output_csv_path}")
