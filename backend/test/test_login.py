# test/test_login.py
import time
import pytest
from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

# Ruta LOCAL al geckodriver que descargaste manualmente
GECKO_DRIVER_PATH = r"C:\Drivers\geckodriver.exe"  # <-- AJUSTA ESTA RUTA SI ES NECESARIO

# Ruta al ejecutable de Firefox (ajusta si lo tienes en otra ubicación)
FIREFOX_BINARY_PATH = r"C:\Program Files\Mozilla Firefox\firefox.exe"


@pytest.fixture
def driver():
    options = Options()
    options.binary_location = FIREFOX_BINARY_PATH
    # options.add_argument("-headless")  # si quieres que corra sin abrir ventana

    service = Service(executable_path=GECKO_DRIVER_PATH)
    driver = webdriver.Firefox(service=service, options=options)

    yield driver

    driver.quit()
    print("Driver cerrado correctamente")


def test_login_mediconnect(driver):
    wait = WebDriverWait(driver, 10)
    actions = ActionChains(driver)

    print("1. Abriendo la página")
    driver.get("http://localhost:5173")

    print("2. Redimensionando ventana")
    driver.set_window_size(896, 824)
    time.sleep(3)

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
