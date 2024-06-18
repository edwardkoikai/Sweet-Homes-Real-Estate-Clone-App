from db import conn, cursor

class Reservation:
    TABLE_NAME = "reservations"

    def __init__(self, property_id, user_id):
        self.id = None
        self.property_id = property_id
        self.user_id = user_id
        self.reservation_date = None

    def save(self):
        sql = f"""
            INSERT INTO {self.TABLE_NAME} (property_id, user_id)
            VALUES (?, ?)
        """
        cursor.execute(sql, (self.property_id, self.user_id))
        conn.commit()
        self.id = cursor.lastrowid

    def to_dict(self):
        return {
            "id": self.id,
            "property_id": self.property_id,
            "user_id": self.user_id,
            "reservation_date": self.reservation_date
        }

    @classmethod
    def find_by_user(cls, user_id):
        sql = f"""
            SELECT * FROM {cls.TABLE_NAME}
            WHERE user_id = ?
        """
        rows = cursor.execute(sql, (user_id,)).fetchall()
        return [cls.row_to_instance(row) for row in rows]

    @classmethod
    def row_to_instance(cls, row):
        reservation = cls(row[1], row[2])
        reservation.id = row[0]
        reservation.reservation_date = row[3]
        return reservation

    @classmethod
    def create_table(cls):
        sql = f"""
            CREATE TABLE IF NOT EXISTS {cls.TABLE_NAME} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                property_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (property_id) REFERENCES property_list(id)
            )
        """
        cursor.execute(sql)
        conn.commit()
        print(f"{cls.TABLE_NAME} table created successfully")