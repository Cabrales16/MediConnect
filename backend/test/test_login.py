# test/test_login.py
import os
import time
import pytest
from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

# ------------------------------
# Configuración de entorno
# ------------------------------

# Rutas LOCALES (Windows) para tu máquina
GECKO_DRIVER_PATH_LOCAL = r"C:\Drivers\geckodriver.exe"
FIREFOX_BINARY_PATH_LOCAL = r"C:\Program Files\Mozilla Firefox\firefox.exe"

# ¿Estamos corriendo en GitHub Actions?
IS_CI = os.getenv("GITHUB_ACTIONS") == "true"

# URL base de la app (se puede sobreescribir con APP_BASE_URL)
BASE_URL = os.getenv("APP_BASE_URL", "http://localhost:5173")


@pytest.fixture
def driver():
    options = Options()

    if IS_CI:
        # En CI (GitHub Actions, Linux):
        # - Usamos Firefox del sistema (instalado con apt-get)
        # - Usamos geckodriver del PATH (Service() sin ruta)
        # - Ejecutamos en headless
        options.add_argument("-headless")
        service = Service()
    else:
        # En tu PC local (Windows):
        # - Usamos tus rutas concretas a Firefox y geckodriver
        options.binary_location = FIREFOX_BINARY_PATH_LOCAL
        service = Service(executable_path=GECKO_DRIVER_PATH_LOCAL)

    driver = webdriver.Firefox(service=service, options=options)
    driver.implicitly_wait(10)

    yield driver

    driver.quit()
    print("Driver cerrado correctamente")


def test_login_mediconnect(driver):
    wait = WebDriverWait(driver, 10)
    actions = ActionChains(driver)

    print("1. Abriendo la página")
    driver.get(BASE_URL)

    print("2. Redimensionando ventana")
    driver.set_window_size(896, 824)
    time.sleep(3)

    # ------------------------------
    # MODO CI (GitHub Actions)
    # ------------------------------
    if IS_CI:
        # En CI hacemos un smoke test:
        # - La página debe cargar correctamente
        # - El texto "Iniciar sesión" debe aparecer en el HTML
        time.sleep(5)  # pequeño margen para que el frontend renderice

        page_source = driver.page_source
        print("URL actual en CI:", driver.current_url)
        print("Longitud del HTML:", len(page_source))

        assert "Iniciar sesión" in page_source, (
            "No se encontró el texto 'Iniciar sesión' en la página "
            f"en {driver.current_url}. Revisa que el frontend en Railway esté sirviendo correctamente."
        )

        print("Smoke test de CI OK (texto 'Iniciar sesión' encontrado).")
        return

    # ------------------------------
    # MODO LOCAL (flujo completo)
    # ------------------------------

    print("3. Hacer click en Iniciar sesión")
    wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Iniciar sesión"))).click()

    print("4. Escribiendo email")
    email_field = wait.until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, ".flex:nth-child(1) > .flex-1"))
    )
    email_field.send_keys("fgersonsamuel080@gmail.com")

    print("5. Escribiendo contraseña")
    password_field = driver.find_element(By.CSS_SELECTOR, ".flex:nth-child(2) > .flex-1")
    password_field.send_keys("Samuel080@")

    print("6. Haciendo click en botón de login")
    driver.find_element(By.CSS_SELECTOR, ".text-white").click()
    time.sleep(5)

    print("7. Haciendo click en Ver más")
    wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Ver más"))).click()

    print("8. Haciendo click en botón gris")
    driver.find_element(By.CSS_SELECTOR, ".bg-gray-200").click()

    print("9. Mouse over en el elemento")
    element = driver.find_element(By.CSS_SELECTOR, ".bg-white > :nth-child(4) > .flex")
    actions.move_to_element(element).perform()
    time.sleep(3)

    print("10. Mouse out del elemento")
    actions.move_to_element_with_offset(element, 100, 100).perform()

    print("INICIO DE SESIÓN CON ÉXITO")
    time.sleep(3)
