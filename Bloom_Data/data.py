
import pandas as pd

# 1. اقرأ ملف CSV
df = pd.read_csv(r"F:\Nasa project\Bloom_Data\Final Data\MASTER_WeatherFromBloom_2013_2025_full.csv")

# 2. حوّله إلى JSON (list of rows)
json_data = df.to_json(orient="records")

# 3. خزّنه في ملف جديد
with open("data.json", "w", encoding="utf-8") as f:
    f.write(json_data)

print("✅ Conversion done! Saved as data.json")
