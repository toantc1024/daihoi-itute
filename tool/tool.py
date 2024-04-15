import firebase_admin
import csv
import json

from firebase_admin import auth, firestore, firestore_async

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Fetch the service account key JSON file contents
cred = credentials.Certificate('./key.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred)

def delete_all_users():
    
    page = auth.list_users()

    # Convert page to list of uid
    uids = [];
    db = firestore.client()
    users = db.collection('users')
    err = 0
    succ = 0
    
    for user in page.users:
        uid = user.uid 
        
        try:
            auth.delete_user(uid)
            ref = users.document(uid)
            ref.delete()
            succ += 1
        except:
            err += 1

    print("Successfully delete {0} accounts".format(succ));
    print("Fail to delete {0} accounts".format(err));
    

def make_json(csvFilePath, jsonFilePath):
    data = {}
    
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for row in csvReader:
            key = row['STT/Số ghế']
            data[key] = {
                   "representativeID": row["STT/Số ghế"],
                "role": row['Chức vụ hiện tại'],
                "fullName": row['Họ và tên'],
                "studentID": row['STK/MSSV'],
                "communistUnionID": row['Chi Đoàn'],
                "sex": "Nữ" if row["Đại biểu nữ"] == "x" else "Nam",
            }
     
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4, ensure_ascii=False))
        
  
ADMIN_PASSWORD = "FIT@123"
NORMAL_PASSWORD = 'daihoicntt'

ADMIN_ROLE = 'Admin'

def makeSchoolEmail(id):
    return str(id) + "@student.hcmute.edu.vn"

# Read data from json
def create_account():
    with open('list.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
        db = firestore.client()
        
        
        err = 0
        succ = 0
        users_ref = db.collection("users")
        for key in data:
            
            user = data[key]
            # Create user with email and password
            user["email"] = makeSchoolEmail(user["studentID"])
            user_password = ADMIN_PASSWORD if user["role"] == ADMIN_ROLE else NORMAL_PASSWORD
            print(user_password)
            
            cred = auth.create_user(email=user["email"], password=user_password)
            
            if (cred == None):
                err +=1
            else:
                uid = cred.uid
                ref = users_ref.document(uid)
                succ += 1
                ref.set(user)
                print(user["representativeID"], ". CREATED ", user["fullName"])
        print("Successfully create {0} accounts".format(succ));
        print("Fail to create {0} accounts".format(err));
    
def csv_to_json():
    make_json('list.csv', 'list.json')
    
csv_to_json()
delete_all_users()
create_account()

