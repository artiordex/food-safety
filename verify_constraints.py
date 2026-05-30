import sqlite3, json

db='foodsafety.db'
conn=sqlite3.connect(db)
cur=conn.cursor()

def show(t):
    print('== TABLE:', t)
    ti = cur.execute(f"PRAGMA table_info('{t}')").fetchall()
    fk = cur.execute(f"PRAGMA foreign_key_list('{t}')").fetchall()
    print('table_info:', json.dumps(ti, ensure_ascii=False))
    print('foreign_keys:', json.dumps(fk, ensure_ascii=False))

for t in ['I2836','I0940']:
    try:
        show(t)
    except Exception as e:
        print('ERROR for', t, e)

conn.close()
