"""Illustrative baseline using bundled Iris data, not an EyeCode research result.
Install scikit-learn, then run: python resources/baseline.py
"""
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)
# Fit preprocessing on training data only to avoid leakage.
model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=500))
model.fit(X_train, y_train)
predictions = model.predict(X_test)
print(f"Held-out accuracy: {accuracy_score(y_test, predictions):.3f}")
