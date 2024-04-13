import cv2
from pyzbar.pyzbar import decode

def scan_qr_code_from_camera():
    # Open camera
    cap = cv2.VideoCapture(0)

    while True:
        # Read frame from camera
        ret, frame = cap.read()
        if not ret:
            print("Failed to capture frame from camera")
            break
        
        # Convert frame to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect QR codes in the frame
        decoded_objects = decode(gray)
        
        # Display QR code information
        for obj in decoded_objects:
            qr_data = obj.data.decode('utf-8')
            print("QR Code Data:", qr_data)

        # Display the frame
        cv2.imshow('QR Code Scanner', frame)

        # Wait for 'q' key to exit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release camera and close window
    cap.release()
    cv2.destroyAllWindows()

# Scan QR code from camera
scan_qr_code_from_camera()
