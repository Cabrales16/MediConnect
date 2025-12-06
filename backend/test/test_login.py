# test/test_login.py
from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

# Descarga automática de geckodriver (solo la primera vez)
service = Service(GeckoDriverManager().install())
options = webdriver.FirefoxOptions()
# options.add_argument('--headless')  # quita si quieres ver Firefox

driver = webdriver.Firefox(service=service, options=options)
wait = WebDriverWait(driver, 10)
actions = ActionChains(driver)

try:
    print("1. Abriendo la página...")
    driver.get("http://localhost:5173")
    
    print("2. Redimensionando ventana...")
    driver.set_window_size(896, 824)
    time.sleep(7)

    print("3. Haciendo click en 'Iniciar sesión'...")
    wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Iniciar sesión"))).click()

    print("4. Escribiendo email...")
    email_field = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".flex:nth-child(1) > .flex-1")))
    email_field.send_keys("fgersonsamuel080@gmail.com")

    print("5. Escribiendo contraseña...")
    password_field = driver.find_element(By.CSS_SELECTOR, ".flex:nth-child(2) > .flex-1")
    password_field.send_keys("Samuel080@")

    print("6. Haciendo click en botón de login...")
    driver.find_element(By.CSS_SELECTOR, ".text-white").click()
    time.sleep(7)

    print("7. Haciendo click en 'Ver más'...")
    wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Ver más"))).click()

    print("8. Haciendo click en botón gris...")
    driver.find_element(By.CSS_SELECTOR, ".bg-gray-200").click()

    print("9. Mouse over en el elemento...")
    element = driver.find_element(By.CSS_SELECTOR, ".bg-white > :nth-child(4) > .flex")
    actions.move_to_element(element).perform()
    time.sleep(7)

    print("10. Mouse out del elemento...")
    actions.move_to_element_with_offset(element, 100, 100).perform()

    print("¡INICIO DE SESIÓN COMPLETADO CON ÉXITO!")
    time.sleep(7)

finally:
    driver.quit()
    print("Test terminado - TODO PERFECTO CON FIREFOX")