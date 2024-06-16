from db import conn, cursor


class Property_list():
    TABLE_NAME = "property_list"
    
    def __init__(self, name, location, rent, image,  description, housing_unit_type_id):
        self.id = None
        self.name = name
        self.location = location
        self.rent = rent
        self.image = image
        self.description = description
        self.housing_unit_type_id = housing_unit_type_id
        self.created_at = None
        self.housing_unit_type = None
        
    def save(self):
        # Check if the record already exists
        cursor.execute(f"SELECT id FROM {self.TABLE_NAME} WHERE name = ?", (self.name,))
        row = cursor.fetchone()

        if row:
            self.id = row[0]
            print(f"{self.name} already exists with id {self.id}")
        else:
            sql = f"""
                INSERT INTO {self.TABLE_NAME} (name, location, rent, image, housing_unit_type_id, description)
                VALUES (?, ?, ?, ?, ?, ?)
            """
            cursor.execute(sql, (self.name, self.location, self.rent, self.image, self.housing_unit_type_id, self.description))
            conn.commit()
            self.id = cursor.lastrowid
            print(f"{self.name} saved with id {self.id}")
            
            return self
            
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "rent": self.rent,
            "image": self.image,
            "housing_unit_type": self.housing_unit_type,
            "description": self.description,
            "created_at": self.created_at
        }
        
    @classmethod
    def create_table(cls):
        sql = f""" 
            CREATE TABLE IF NOT EXISTS {cls.TABLE_NAME}(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                location VARCHAR NOT NULL,
                rent INTEGER NOT NULL,
                image VARCHAR NOT NULL,
                description TEXT NOT NULL,
                housing_unit_type_id INTEGER NOT NULL REFERENCES housing_unit_type_id(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
            )
        """
        cursor.execute(sql)
        conn.commit()
        print("PropertyList table created successfully")
        
Property_list.create_table()
