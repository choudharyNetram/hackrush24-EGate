import qrcode
from datetime import datetime, timedelta

class Visitor:
    def __init__(self, email, entry_time, exit_time):
        self.email = email
        self.entry_time = entry_time
        self.exit_time = exit_time

    def generate_qr_code(self):
        # Format entry and exit times for QR code data
        qr_data = f"Email: {self.email}\nEntry Time: {self.entry_time}\nExit Time: {self.exit_time}"
        # Generate QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(qr_data)
        qr.make(fit=True)
        qr_img = qr.make_image(fill_color="black", back_color="white")
        qr_img.save(f"{self.email}_qr_code.png")

# Example usage:
visitor_email = "example@example.com"
entry_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
exit_time = (datetime.now() + timedelta(hours=2)).strftime("%Y-%m-%d %H:%M:%S")  # Assuming 2 hours visit duration

visitor = Visitor(visitor_email, entry_time, exit_time)
visitor.generate_qr_code()
import os
os.system(f"start {visitor_email}_qr_code.png")