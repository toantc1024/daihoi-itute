import pandas as pd

# Đọc file Excel
file_path = "dataweb.xlsx"
df = pd.read_excel(file_path)

# Lưu dưới dạng CSV
csv_path = "dataweb.csv"
df.to_csv(csv_path, index=False, encoding='utf-8')

print(f"File CSV đã được tạo: {csv_path}")
