from db import cursor, conn

class Housing_unit_type:
    
    TABLE_NAME = "housing_unit_type"
    def __init__(self, name):
        self.id= None
        self.name = name
        
    def save(self):
        sql = f"""
        INSERT INTO (self.TABLE_NAME) (name)
        VALUES  (?)
        """
        cursor.execute(sql,(self.name,))
        cursor.commit()
        self.id =cursor.lastrowid
        print(f"{self.name} Housing Type saved successfully")
        
    @classmethod
    def create_table(cls):
        sql = f"""
            CREATE TABLE IF NOT EXISTS  {cls.TABLE_NAME} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE
            )
        """
        cursor.execute(sql)
        conn.commit()
        print(f"housing_unit_type created")
        
Housing_unit_type.create_table()
housing_unit_types = ["one-bedroom", "two-bedroom", "3-bedroom", "bungallow", "studio", "OTHER"]

for name in housing_unit_types:
    housing_unit_type = Housing_unit_type(name)
    housing_unit_type.save()
    

