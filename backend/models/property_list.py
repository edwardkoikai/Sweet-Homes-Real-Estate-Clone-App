from db import cursor, conn

class Housing_unit_type:
    
    TABLE_NAME = "housing_unit_type"
    def __init__(self, name):
        self.id= None
        self.name = name
        
    def save(self):
        # Check if the record already exists
        cursor.execute(f"SELECT id FROM {self.TABLE_NAME} WHERE name = ?", (self.name,))
        row = cursor.fetchone()

        if row:
            self.id = row[0]
            print(f"{self.name} already exists with id {self.id}")
        else:
            sql = f"""
                INSERT INTO {self.TABLE_NAME} (name)
                VALUES (?)
            """
            cursor.execute(sql, (self.name,))
            conn.commit()
            self.id = cursor.lastrowid
            print(f"{self.name} saved with id {self.id}")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
    
    @classmethod
    def find_all(cls):
        sql = f"""
            SELECT * FROM {cls.TABLE_NAME}
        """
        
        rows = cursor.execute(sql).fetchall()
        
        return [
            cls.row_to_instance(row).to_dict() for row in rows
            
        ]
    
    
    @classmethod
    def row_to_instance(cls, row):
        if row == None:
            return None
        
        housing_unit_type = cls(row[1])
        housing_unit_type.id = row[0]
        
        return housing_unit_type
            
    
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
    

