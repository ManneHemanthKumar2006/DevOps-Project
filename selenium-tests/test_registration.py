from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=options)

try:
    driver.get("http://localhost:3001")

    driver.find_element(By.ID, "name").send_keys("Selenium Test")
    driver.find_element(By.ID, "rollNumber").send_keys("777")
    driver.find_element(By.ID, "email").send_keys("selenium@test.com")
    driver.find_element(By.ID, "phone").send_keys("9876543210")
    driver.find_element(By.ID, "event").send_keys("Hackathon")

    driver.find_element(By.ID, "registrationForm").submit()

    time.sleep(2)

    message = driver.find_element(By.ID, "message").text

    print("Result:", message)

    if "successfully" not in message.lower():
        raise Exception("Registration test failed")

finally:
    driver.quit()