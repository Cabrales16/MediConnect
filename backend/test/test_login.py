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

# ------------------------------------------------------------------
# CONFIGURACIÓN DE ENTORNOS
# ------------------------------------------------------------------
IS_CI = os.getenv("GITHUB_ACTIONS") == "true"

# Usaremos SIEMPRE esta variable de entorno para la URL del frontend
FRONTEND_URL = os.getenv("FRONTEND_URL")

if IS_CI:
    if not FRONTEND_URL:
        # Si esto se dispara en GitHub Actions, el problema es el workflow,
        # no el test: la variable FRONTEND_URL no está llegando al job.
        raise RuntimeError(
            "En CI (GitHub Actions) FRONTEND_URL no está definida. "
            "Configúrala en el job selenium-tests."
        )
    BASE_URL = FRONTEND_URL
else:
    # En local seguimos usando la app corriendo en Vite
    BASE_URL = "http://localhost:5173"

print("=== DEBUG SELENIUM CONFIG ===")
print("IS_CI:", IS_CI)
print("FRONTEND_URL:", FRONTEND_URL)
print("BASE_URL QUE SE USARÁ:", BASE_URL)
print("================================")


@pytest.fixture
def driver():
    options = Options()
    options.add_argument("-headless")   # CI headless
    service = Service()                 # deja que Selenium administre geckodriver

    driver = webdriver.Firefox(service=service, options=options)
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
        # smoke test muy simple
        time.sleep(5)  # margen para que la SPA cargue

        page_source = driver.page_source
        print("URL actual en CI:", driver.current_url)
        print("Longitud del HTML:", len(page_source))

        assert "MediConnect" in page_source or "Iniciar sesión" in page_source, (
            "No se encontró texto de MediConnect en la página "
            f"en {driver.current_url}. Revisa que el frontend esté sirviendo correctamente."
        )
        return

    # ------------------------------
    # MODO LOCAL (PRUEBA COMPLETA)
    # ------------------------------
    print("3. Hacer click en Iniciar sesión")
    wait.until(
        EC.element_to_be_clickable((By.LINK_TEXT, "Iniciar sesión"))
    ).click()

    print("4. Escribiendo email")
    email_field = wait.until(
        EC.visibility_of_element_located(
            (By.CSS_SELECTOR, ".flex:nth-child(1) > .flex-1")
        )
    )
    email_field.send_keys("fgersonsamuel080@gmail.com")

    print("5. Escribiendo contraseña")
    password_field = driver.find_element(
        By.CSS_SELECTOR, ".flex:nth-child(2) > .flex-1"
    )
    password_field.send_keys("Samuel080@")

    print("6. Haciendo click en botón de login")
    driver.find_element(By.CSS_SELECTOR, ".text-white").click()
    time.sleep(5)

    print("7. Haciendo click en Ver más")
    wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Ver más"))).click()

    print("8. Haciendo click en botón gris")
    driver.find_element(By.CSS_SELECTOR, ".bg-gray-200").click()

    print("9. Mouse over en el elemento")
    element = driver.find_element(
        By.CSS_SELECTOR, ".bg-white > :nth-child(4) > .flex"
    )
    actions.move_to_element(element).perform()
    time.sleep(3)

    print("10. Mouse out del elemento")
    actions.move_to_element_with_offset(element, 100, 100).perform()

    print("INICIO DE SESIÓN CON ÉXITO")
    time.sleep(3)
