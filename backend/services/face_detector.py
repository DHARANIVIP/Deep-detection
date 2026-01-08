import cv2
import os

class FaceDetector:
    def __init__(self):
        # Load Haar Cascade
        # For this to work, we need the xml file or use cv2's default if available.
        # We will assume a default path or use a fallback.
        self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    def extract_faces(self, image_path: str, output_folder: str):
        """
        Detects faces in an image, crops them, and saves them.
        Returns list of paths to cropped face images.
        """
        if not os.path.exists(output_folder):
            os.makedirs(output_folder)
            
        img = cv2.imread(image_path)
        if img is None:
            return []
            
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = self.face_cascade.detectMultiScale(gray, 1.1, 4)
        
        saved_faces = []
        base_name = os.path.splitext(os.path.basename(image_path))[0]
        
        for i, (x, y, w, h) in enumerate(faces):
            face_img = img[y:y+h, x:x+w]
            face_filename = f"{base_name}_face_{i}.jpg"
            face_path = os.path.join(output_folder, face_filename)
            cv2.imwrite(face_path, face_img)
            saved_faces.append(face_path)
            
        return saved_faces
