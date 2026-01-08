import random

class AIDetector:
    def __init__(self):
        # Load model here in real implementation
        pass

    def predict(self, face_image_path: str):
        """
        Returns a probability score (0.0 to 1.0) of the face being FAKE.
        0.0 = Real, 1.0 = Fake.
        """
        # Mock logic: Random score for demonstration
        score = random.random()
        return score
