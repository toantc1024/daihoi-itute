import pandas as pd
import json

# Đọc file CSV
file_path = "list.csv"
df = pd.read_csv(file_path)

# Hàm tạo communistUnionID từ MSSV bằng cách thay đổi hậu tố
def generate_union_id(mssv):
    return str(mssv)[:5] + "CLST3"  # Lấy 5 số đầu của MSSV và thêm hậu tố

# Chuyển đổi dữ liệu
json_data = {}
index = 1  # Bắt đầu từ số 1

for _, row in df.iterrows():
    entry = {
        "representativeID": str(row["Số ghế"]),
        "role": row["Chức vụ"],
        "fullName": row["Tên"],
        "studentID": str(row["MSSV"]),
        "communistUnionID": generate_union_id(row["Chi Hội"]),
        "sex": "Nữ" if row["Đại biểu nữ"] == 1 else "Nam"
    }
    json_data[str(index)] = entry
    index += 1  # Tăng số thứ tự lên

# Xuất ra file JSON
json_path = "dataweb.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(json_data, f, ensure_ascii=False, indent=4)

print(f"File JSON đã được tạo: {json_path}")
