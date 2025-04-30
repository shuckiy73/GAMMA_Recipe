import os
import requests

# Список изображений {имя_файла: url}
images = {
    "borscht.jpg": "https://www.bing.com/images/search?q=borscht.jpg&FORM=IQFRBA&id=46E4737C4DED3B1D99C7A465E9AC79ACD13931ED",
    "cabbage_pies.jpg": "https://www.bing.com/images/search?q=cabbage_pies.jpg&id=C4C35C3BF3059DC84D8C9F23DD939671EAB4A99A&FORM=IACFIR",
    "okroshka.jpg": "https://www.bing.com/images/search?q=okroshka.jpg&id=8581414417D2507D525148C18C8415F474784E02&FORM=IACFIR",
    "vegetarian_shchi.jpg": "https://www.bing.com/images/search?q=vegetarian_sushi.jpg&id=B139F16A63AA64525554872C766BA6BD3626468F&FORM=IACFIR",
    "cheesecake.jpg": "https://www.bing.com/images/search?q=cheesecake.jpg&FORM=IQFRBA&id=14D1121FC8785ED81CF2B1C67FCDC17BE2B690B4",
    "medovik.jpg": "https://www.bing.com/images/search?q=medovik.jpg&FORM=IQFRBA&id=F0E613D917C13BBB4725A4CA669E4B23EFC0BE40",
    "syrniki.jpg": "https://www.bing.com/images/search?q=syrniki.jpg&FORM=IQFRBA&id=6533AD41AB53E72EB975FCAF032F16EC495D6F1F",
    "raisin_cake.jpg": "https://www.bing.com/images/search?q=raisin_cake.jpg&FORM=IQFRBA&id=83F759A4D10F15CF506BC8A40C802311CE1EC789",
    "khachapuri.jpg": "https://www.bing.com/images/search?q=khachapuri.jpg&FORM=IQFRBA&id=0221408161E965E81A1774A97BD68D174785CF73",
    "cherry_pie.jpg": "https://www.bing.com/images/search?q=cherry_pie.jpg&id=75B7FD90F264623C2548A38738E1F52A9AB2EA7F&FORM=IACFIR",
    "chicken-noodle.jpg": "https://www.bing.com/images/search?q=chicken-noodle.jpg&FORM=IQFRBA&id=6C1B21C1EEFBE347096DB224D4C904E4D1C967FD",
    "shchi.jpg": "https://www.bing.com/images/search?q=shchi.jpg&FORM=IQFRBA&id=EA44451B4CB8EC90F20FEA67A9AFC10D1C3D8EA2"
}

media_path = os.path.join("media", "recipes")
os.makedirs(media_path, exist_ok=True)

for filename, url in images.items():
    try:
        print(f"📥 Загружаем {filename}...")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        with open(os.path.join(media_path, filename), 'wb') as f:
            f.write(response.content)
        print(f"✅ Сохранено: {filename}")
    except Exception as e:
        print(f"❌ Ошибка загрузки {filename}: {e}")
