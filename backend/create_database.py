import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Параметры для подключения к PostgreSQL (root)
host = "localhost"
user = "postgres"
password = "Shu0253&*"  

# Название новой базы
db_name = "recipe_db"

try:
    # Подключение к PostgreSQL (без указания базы)
    connection = psycopg2.connect(
        dbname="postgres", user=user, password=password, host=host
    )
    connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)

    cursor = connection.cursor()

    # Команда на создание БД
    cursor.execute(f"CREATE DATABASE {db_name};")
    print(f"✅ База данных '{db_name}' успешно создана.")

    cursor.close()
    connection.close()

except psycopg2.errors.DuplicateDatabase:
    print(f"⚠️ База данных '{db_name}' уже существует.")
except Exception as e:
    print(f"❌ Ошибка при создании базы: {e}")
