import csv
import json

# Đọc dữ liệu từ file CSV
csv_file = "users_data.csv"
json_file = "data.json"
csv_output_file = "data.csv"

data = []

with open(csv_file, mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        data.append({
            "fullName": row.get("fullName", ""),
            "representativeID": row.get("representativeID", ""),
            "role": row.get("role", ""),
            "sex": row.get("sex", ""),
            "communistUnionID": row.get("communistUnionID", ""),
            "email": row.get("email", ""),
            "studentID": row.get("studentID", "")
        })

# Xuất dữ liệu ra file JSON
with open(json_file, mode='w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

# Tạo bản sao của file CSV đầu vào
with open(csv_file, mode='r', encoding='utf-8') as file_in, open(csv_output_file, mode='w', encoding='utf-8') as file_out:
    file_out.write(file_in.read())

print(f"Đã xuất JSON: {json_file}")
print(f"Đã tạo bản sao CSV: {csv_output_file}")
